# Bloggy

**Type:** a Blog/Social media Application

**Technologies used:** React, Typescript, Node.js, Express, MongoDB + Mongoose, Tailwind, Redux, RTK Query, Cypress, JWT, Docker

**Deploy:** https://bloggy-kirill-cherepanov.netlify.appyarn

**Repository:** https://github.com/KissMyUSSR/bloggy

## What I've built and have learned

- Developed a Social media app that is focused on posting.
- Adopted an exceedingly scalable feature-based architecture for the front-end and a simplified "Clean architecture" on the back-end.
- Designed a highly intuitive and responsive user interface that enables most pleasant user experience.
- Set up a secure authentification/authorization process that was enabled by using dual JWT tokens and email verification.
- Added surface-level end-to-end tests with Cypress.
- Deployed the API on fly.io with Docker.

## My general thoughts

**Please do keep in mind that the time that it took me to create the project is very inflated by the fact that I was learning a lot of things on the go.**

When I started the project I didn't have a full picture of what I was building. The only things I knew for sure were that I wanted a social media app that focused on posts. Therefore, the model is similar to YouTube but with posts instead of videos. The second one was that I wanted a landing page with cool section transitions, the ones that you can see right now. And that's basically it. In retrospect, this landing page doesn't fit the model at all, since all the section types are static by design, and they don't represent the actual content posted on the platform.

The first thing for me was design. While I'm familiar with Figma, I still prefer drawing designs on paper for some reason. It took me two weeks to write and implement the initial design for the front-end. Although I had to make a few adjustments later on, overall it hasn't changed much since then.

Then I started working on the API. Unfortunately I do not recall the whole process, as it was rather straightforward. It took me a while to learn MongoDB, JWT, how to add email verification, and refresh my memories of Express. There is plenty of information on all of that on the internet, so I finished the API in one and a half weeks.

And that's when the refactoring began. I found a very helpful learning source that is [bulletproof react](https://github.com/alan2207/bulletproof-react), fell in love with it and rewrote the entire front-end architecture to be feature-based.

At that moment though, I didn't have any logic on the front-end, only static pages. So I installed Redux for global state management and RTK Query for server interactions. I added logic, as well as a few other things that came to me, such as the Edit page, the Likes feature, and optimistic updates, during the next two weeks.

And here I realized that having clean front-end code and a messy back-end wouldn't do, so I set out to learn about back-end architectures. The one that I initially settled on was "Clean Architecture" by Robert Martin. But no matter how hard I tried to implement it as close to the book as possible, it always led me to overengineer the entire API. So I chose to make a simplified, probably oversimplified, variation of the architecture, which you can see now. Overall it took me around a week.

Somewhere around this time I also decided to add a few tests. Initially I wanted to cover as much as I could, but had to settle on only surface-level E2E tests with Cypress, due to how much time it would've taken otherwise.

At this point, I knew I was mostly satisfied with what I had, so I moved on to deploying the application and fixing bugs. There is nothing to say about fixing bugs other than that it was a headache. Regarding deployment, though, it was a pain on a whole other level, considering that my previous hosting platform of choice, Heroku, abandoned its free tier. So I had to research a lot of platforms, before realizing that I wouldn't be able to do much without knowing Docker. Overall, the whole process took a week.
I also added a notification feature to notify users of errors and whatever else, when needed, and debounced a few forms.
