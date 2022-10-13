import Post from 'models/Post';
import User from 'models/User';

import { FilterQuery, Condition } from 'mongoose';

export type SearchParams = {
  q: string;
  search: 'categories' | 'title' | 'both';
  sort: 'popular' | 'new';
  time: 'week' | 'month' | 'year' | 'all';
  page: number;
  author?: string;
};

// I don't want to write the whole type for this thing
type SearchQuery = FilterQuery<{ [selector: string]: Condition<string> }>;

class SearchDb {
  protected DEFAULT_PARAMS: SearchParams = {
    q: '',
    search: 'both',
    sort: 'new',
    time: 'all',
    page: 1,
  };

  protected params: SearchParams;

  constructor(requestParams: Partial<SearchParams>) {
    this.params = { ...this.DEFAULT_PARAMS, ...requestParams };
  }

  public getQuery(): SearchQuery {
    return {
      ...this.getSearchQuery(this.params.search, this.params.q),
      ...this.getTimeQuery(this.params.time),
      ...this.getAuthorQuery(this.params.author),
    };
  }

  protected getAuthorQuery(author?: string): SearchQuery {
    if (!author) return {};
    return { authorName: author };
  }

  protected getSortQuery(sort: string): SearchQuery {
    const sortSwitch = {
      new: { createdAt: 1 },
      popular: { likes: 1 },
    };

    if (!(sort in sortSwitch)) throw Error('Incorrect "Sort by" value');
    return sortSwitch[sort as keyof typeof sortSwitch];
  }

  protected getSearchQuery(search: string, query: string): SearchQuery {
    if (!query) return {};

    const searchSwitch = {
      title: this.getTitleQuery(query),
      categories: this.getCategoriesQuery(query),
      both: {
        $or: [this.getTitleQuery(query), this.getCategoriesQuery(query)],
      },
    };

    if (!(search in searchSwitch)) throw Error('Incorrect "Search by" value');
    return searchSwitch[search as keyof typeof searchSwitch];
  }

  protected getTimeQuery(time: string): SearchQuery {
    const DAY = 1000 * 60 * 60 * 24;
    const TIMINGS = {
      week: DAY * 7,
      month: DAY * 31,
      year: DAY * 365,
    };
    const getTime = () => {
      return new Date(
        Date.now() - TIMINGS[time as keyof typeof TIMINGS]
      ).toISOString();
    };

    if (time in TIMINGS) {
      return {
        createdAt: {
          $gte: getTime(),
        },
      };
    }
    if (time === 'all') return {};

    throw Error('Incorrect timeframe');
  }

  protected getTitleQuery(query: string): SearchQuery {
    return {
      $text: {
        $search: query,
        $caseSensitive: false,
      },
    };
  }

  protected getCategoriesQuery(query: string): SearchQuery {
    // keyword search with quotes to preserve phrases
    const categories = (query.match(/\w+|"[^"]+"/g) || []).map((category) =>
      RegExp(`^${category.replaceAll('"', '')}$`, 'i')
    );

    return {
      categories: {
        $in: categories,
      },
    };
  }
}

export class SearchPosts extends SearchDb {
  protected POSTS_PER_PAGE = 10;

  constructor(requestParams: Partial<SearchParams>) {
    super(requestParams);
  }

  public async getPosts() {
    if (this.params.page <= 0) throw Error('Incorrect page');

    const query: SearchQuery = this.getQuery();

    const allPosts = await Post.find(query).sort(
      this.getSortQuery(this.params.sort)
    );

    const posts = allPosts.slice(
      (this.params.page - 1) * this.POSTS_PER_PAGE,
      this.params.page * this.POSTS_PER_PAGE
    );

    return { posts, total: allPosts.length };
  }
}

// would need to rewrite it a bit
export class SearchBlogs extends SearchDb {
  protected BLOGS_PER_PAGE = 10;

  constructor(requestParams: Partial<SearchParams>) {
    super(requestParams);
  }

  public async getBlogs() {
    if (this.params.page <= 0) throw Error('Incorrect page');

    const query: SearchQuery = this.getQuery();

    const allBlogs = await User.find(query).sort(
      this.getSortQuery(this.params.sort)
    );

    const blogs = allBlogs.slice(
      (this.params.page - 1) * this.BLOGS_PER_PAGE,
      this.params.page * this.BLOGS_PER_PAGE
    );

    return { blogs, total: allBlogs.length };
  }

  protected getSortQuery(sort: string) {
    return { 'blog.categories': super.getSortQuery(sort).categories };
  }

  protected getTimeQuery(time: string) {
    const timeQuery = super.getTimeQuery(time);
    return Object.keys(timeQuery).length
      ? { 'blog.createdAt': timeQuery.createdAt }
      : {};
  }

  protected getCategoriesQuery(query: string) {
    return { 'blog.categories': super.getCategoriesQuery(query).categories };
  }
}

export async function searchBlogPosts(username: string, page: number) {
  // Currently since I don't have many posts, I won't need pagination
  // And I'm a bit reluctant to be implementing infinite scroll on the client right now

  // const POSTS_PER_PAGE = 10;

  return Post.find({ authorName: username }).sort({ createdAt: 1 });
  // .skip((page - 1) * POSTS_PER_PAGE)
  // .limit(page * POSTS_PER_PAGE);
}
