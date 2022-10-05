import Post from '../models/Post';
import User from '../models/User';

export type SearchParams = {
  q: string;
  search: 'categories' | 'title' | 'both';
  sort: 'popular' | 'new';
  time: 'week' | 'month' | 'year' | 'all';
  page: number;
};
type SearchQuery = any; // I'm too lazy to write a huge type for this thing. Maybe later...

class SearchDb {
  protected DEFAULT_PARAMS: SearchParams = {
    q: '',
    search: 'both',
    sort: 'new',
    time: 'all',
    page: 1,
  };
  protected POSTS_PER_PAGE = 10;

  protected params: SearchParams;

  constructor(requestParams: Partial<SearchParams>) {
    this.params = { ...this.DEFAULT_PARAMS, ...requestParams };
  }

  public getQuery(): SearchQuery {
    return {
      ...this.getSearchQuery(this.params.search, this.params.q),
      ...this.getTimeQuery(this.params.time),
    };
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
    // CHECK WHAT HAPPENS WHEN params.q === ''
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
  constructor(requestParams: Partial<SearchParams>) {
    super(requestParams);
  }

  public getPosts() {
    if (this.params.page <= 0) throw Error('Incorrect page');

    const query: SearchQuery = this.getQuery();

    return Post.find(query)
      .sort(this.getSortQuery(this.params.sort))
      .skip((this.params.page - 1) * this.POSTS_PER_PAGE)
      .limit(this.params.page * this.POSTS_PER_PAGE);
  }
}

export class SearchBlogs extends SearchDb {
  constructor(requestParams: Partial<SearchParams>) {
    super(requestParams);
  }

  public getBlogs() {
    if (this.params.page <= 0) throw Error('Incorrect page');

    const query: SearchQuery = this.getQuery();

    return User.find(query)
      .sort(this.getSortQuery(this.params.sort))
      .skip((this.params.page - 1) * this.POSTS_PER_PAGE)
      .limit(this.params.page * this.POSTS_PER_PAGE);
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
  // currently since I don't have many posts, I won't need pagination
  // and I'm a bit reluctant to be implementing infinite scroll right now

  // const POSTS_PER_PAGE = 10;

  return Post.find({ authorName: username }).sort({ createdAt: 1 });
  // .skip((page - 1) * POSTS_PER_PAGE)
  // .limit(page * POSTS_PER_PAGE);
}
