import Post from '../models/Post';
import User from '../models/User';

// const searchParams_ = {
//   type: ['posts', 'blogs'],
//   search: ['categories', 'title', 'both'],
//   sort: ['popular', 'new'],
//   time: ['week', 'month', 'year', 'all'],
//   page: Number,
// };

// const oldQueryUrl =
//   'http://localhost:5000/api/posts?category=Science&username=KissMe';
// const newQueryUrl =
//   'http://localhost:5000/api/posts?q=post&type=posts&search=categories&sort=new&time=all&authorName=test';

export type SearchParams = {
  q: string;
  type: string; // 2 classes
  search: string; // $text
  sort: string; // .sort, score
  time: string; // $gt, $lt, $gte, $lte
  page: number; // .limit and .skip
};
type SearchQuery = any;

class SearchDb {
  protected DEFAULT_PARAMS: SearchParams = {
    q: '',
    type: 'posts',
    search: 'both',
    sort: 'new',
    time: 'all',
    page: 1,
  };
  protected POSTS_PER_PAGE = 10;

  protected params: SearchParams;

  constructor(requestParams: Partial<SearchParams>) {
    this.params = Object.assign(this.DEFAULT_PARAMS, requestParams);
  }

  public getQuery(): SearchQuery {
    return {
      ...this.getSearchQuery(this.params.search, this.params.q),
      ...this.getSortQuery(this.params.sort),
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
    return {
      categories: {
        $in: query.toLowerCase().split(' '),
      },
    };
  }
}

export class SearchPosts extends SearchDb {
  constructor(requestParams: Partial<SearchParams>) {
    super(requestParams);
  }

  public getPosts() {
    const query: SearchQuery = this.getQuery();

    if (this.params.page <= 0) throw Error('Incorrect page');

    return Post.find(query)
      .skip((this.params.page - 1) * this.POSTS_PER_PAGE)
      .limit(this.params.page * this.POSTS_PER_PAGE);
  }
}

export class SearchBlogs extends SearchDb {
  constructor(requestParams: Partial<SearchParams>) {
    super(requestParams);
  }

  public getBlogs() {
    const query: SearchQuery = this.getQuery();

    if (this.params.page <= 0) throw Error('Incorrect page');

    return User.find(query)
      .skip((this.params.page - 1) * this.POSTS_PER_PAGE)
      .limit(this.params.page * this.POSTS_PER_PAGE);
  }

  protected getSortQuery(sort: string) {
    return { blog: super.getSortQuery(sort) };
  }

  protected getTimeQuery(time: string) {
    return { blog: super.getTimeQuery(time) };
  }

  protected getCategoriesQuery(query: string) {
    return { blog: super.getCategoriesQuery(query) };
  }
}

export async function searchBlogPosts() {}
