import {
  generatePrivateData,
  generatePosts,
  generatePost,
} from '../../src/test/data-generators';

// Basically, the findByRole is broken for dynamically added elements
// https://github.com/testing-library/cypress-testing-library/issues/205
// So, although it's a struggle, I don't use it

describe('smoke tests', () => {
  const user = generatePrivateData();
  const { password: _password, ...protectedUser } = user;
  const { email: _email, ...publicUser } = protectedUser;
  const posts = [
    generatePost({
      authorName: user.username,
      title: 'Cool title',
      text: 'Cool text',
      description: 'Cool description',
    }),
    ...generatePosts({ authorName: user.username }),
  ];
  const updatedPost = {
    title: 'Updated cool title',
    text: 'Updated cool text',
    description: 'Updated cool description',
  };
  const newPost = {
    title: 'New cool title',
    text: 'New cool text',
    description: 'New cool description',
  };

  before(() => {
    // mswjs was a better option after all
    cy.intercept('POST', '/api/auth/login', { user: protectedUser });
    cy.intercept('GET', '/api/users/*', (req) => {
      req.reply({ user: publicUser, posts });
    });
    cy.intercept('PUT', '/api/posts/like/*', { success: true });
    cy.intercept('GET', '/api/posts/*', (req) => {
      req.reply({
        post: posts[0],
        author: user,
        otherPosts: posts.slice(1, 5),
      });
    });
    cy.intercept('PATCH', '/api/posts/*', (req) => {
      Object.assign(posts[0], updatedPost);
      req.reply({
        success: true,
        post: posts[0],
      });
    });
    cy.intercept('POST', '/api/posts/', (req) => {
      posts.unshift(generatePost({ ...newPost, authorName: user.username }));
      req.reply({ success: true, post: posts[posts.length - 1] });
    });
    cy.intercept('GET', '/api/search?*', (req) => {
      const queriedPosts = posts.filter((post) => post.title === req.query.q);
      req.reply({
        total: posts.length,
        values: queriedPosts.slice(0, 10),
        type: 'posts',
      });
    });
  });

  it('should handle normal app flow', () => {
    cy.visit('http://localhost:3000');

    cy.findByTestId('topbar-user-menu').click();
    cy.findByRole('button', { name: /Log in/i }).click();

    cy.findByPlaceholderText(/^email$/i).type(user.email);
    cy.findByPlaceholderText(/^password$/i).type(user.password);
    cy.findByRole('button', { name: /^Log in$/i }).click();

    cy.findByTestId('topbar-user-menu').click();
    cy.contains(/^My blog$/i)
      .click()
      .wait(100);

    cy.findByTestId('blog-total-likes').invoke('text').as('prevBlogTotalLikes');
    cy.findAllByTestId('like-button')
      .first()
      .then(($btn) => {
        const prevLikes = parseInt($btn.text());
        const prevIsLiked = $btn.attr('data-isliked') === 'true' ? 1 : -1;

        cy.log(`${prevIsLiked}`);
        cy.log(`${prevLikes}`);
        cy.log(`${prevLikes - Number(prevIsLiked)}`);

        cy.wrap($btn)
          .click()
          .then(function ($btn) {
            const isLiked = $btn.attr('data-isliked') === 'true' ? 1 : -1;
            const likes = parseInt($btn.text());

            expect(isLiked).to.not.be.eq(prevIsLiked);
            expect(likes).to.be.eq(prevLikes - prevIsLiked);

            cy.log(this.prevBlogTotalLikes);

            cy.findByTestId('blog-total-likes')
              .invoke('text')
              .should(
                'eq',
                `${parseInt(this.prevBlogTotalLikes) - prevIsLiked}`
              );
          });
      });

    cy.contains(posts[0].title).click();

    cy.contains(/^Edit post$/i)
      .click({ force: true })
      .wait(100);

    cy.contains(posts[0].title).clear().type(updatedPost.title);
    cy.get('.CodeMirror-scroll')
      .type('{ctrl+A}{backspace}')
      .type(updatedPost.text);
    cy.contains(posts[0].description).clear().type(updatedPost.description);

    cy.contains(/^Preview result$/i).click();
    cy.contains(/^Submit post$/i)
      .click()
      .wait(100)
      .then(() => {
        // This .should() is required to keep track of the actual posts
        cy.contains(posts[0].title);
        cy.contains(posts[0].text);
        cy.get('p:visible').contains(posts[0].description);
      });

    cy.get('[data-testid="create-top-nav-link"]:visible').click().wait(100);
    cy.contains(/^Enter your title here$/i)
      .clear()
      .type(newPost.title);
    cy.get('.CodeMirror-scroll').type('{ctrl+A}{backspace}').type(newPost.text);
    cy.findByPlaceholderText('Enter the description of the post')
      .clear()
      .type(newPost.description);

    cy.contains(/^Preview result$/i).click();
    cy.contains(/^Submit post$/i)
      .click()
      .wait(100)
      .then(() => {
        // This .should() is required to keep track of the actual posts
        cy.contains(posts[0].title);
        cy.contains(posts[0].text);
        cy.get('p:visible').contains(posts[0].description);
      });

    cy.findByTestId('search-top-button').click();
    cy.get('[placeholder="Search articles"]:visible').then(($search) => {
      cy.wrap($search).type(posts[0].title).type('{enter}');
      cy.get('*:not(input)').contains(posts[0].title).should('exist');
    });

    cy.findByPlaceholderText('Search')
      .clear()
      .type('@#$%^&*() This should not be found {enter}');
    cy.findByText('It looks like your query did not match anything').should(
      'exist'
    );
  });
});
