import Post from '../models/Post';
import User from '../models/User';

// const searchParams_ = {
//   type: ['posts', 'blogs'],
//   search: ['categories', 'title', 'both'],
//   sort: ['popular', 'new', 'best match'],
//   time: ['week', 'month', 'year', 'all'],
//   page: Number,
// };

// const oldQueryUrl =
//   'http://localhost:5000/api/posts?category=Science&username=KissMe';
// const newQueryUrl =
//   'http://localhost:5000/api/posts?q=post&type=posts&search=categories&sort=new&time=all&authorName=test';

export type SearchParams = {
  q: string;
  type: string; // 2 functions
  search: string; // $text
  sort: string; // .sort, score
  time: string; // $gt, $lt, $gte, $lte
  page: number; // .limit and .skip
};

type SearchQuery = any;

export class SearchDb {
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

  protected getSortQuery(sort: string) {
    if (sort === 'new') return { createdAt: 1 };
    if (sort === 'popular') return { likes: 1 };
    else throw Error('Incorrect "Sort by" value');
  }

  protected getSearchQuery(search: string, query: string) {
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

  protected getTitleQuery(query: string) {
    return {
      $title: {
        $search: query,
        $caseSensitive: false,
      },
    };
  }

  protected getCategoriesQuery(query: string) {
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
    const query: SearchQuery = {
      ...this.getSearchQuery(this.params.search, this.params.q),
      ...this.getSortQuery(this.params.sort),
    };
  }
}

export class SearchBlogs extends SearchDb {
  constructor(requestParams: Partial<SearchParams>) {
    super(requestParams);
  }
}

export async function searchBlogPosts() {}
