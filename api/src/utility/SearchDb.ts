import Post from '../models/Post';

const searchParams_ = {
  type: ['posts', 'blogs'],
  search: ['categories', 'title', 'both'],
  sort: ['popular', 'new', 'best match'],
  time: ['week', 'month', 'year', 'all'],
  page: Number,
};

const newQueryUrl =
  'http://localhost:5000/api/posts?q=post&type=posts&search=categories&sort=new&time=all&authorName=test';
const oldQueryUrl =
  'http://localhost:5000/api/posts?category=Science&username=KissMe';

export type SearchParams = {
  q: string;
  type: string; // 2 functions
  search: string; // $text
  sort: string; // .sort, score
  time: string; // $gt, $lt, $gte, $lte
  page: number; // .limit and .skip
};

type SearchQuery = any;

const POSTS_PER_PAGE = 10;

const DEFAULT_PARAMS: SearchParams = {
  q: '',
  type: 'posts',
  search: 'both',
  sort: 'new',
  time: 'all',
  page: 1,
};

export default async function searchDb(requestParams: Partial<SearchParams>) {
  const params: SearchParams = Object.assign(DEFAULT_PARAMS, requestParams);

  // .type
  if (params.type === 'posts') return searchPosts(params);
  return searchBlogs(params);
}

async function searchPosts(params: SearchParams) {
  // let query: SearchQuery = {};

  // .search
  const query: SearchQuery = {
    ...getSearchQuery(params.search, params.q),
    ...getSortQuery(params.sort),
  };

  // .sort
  if (params.sort === 'new') {
    query.$sort = { createdAt: 1 };
  }
  if (params.sort === 'popular') {
    query.$sort = { likes: 1 };
  }
}

const getSortQuery = (sort: string) => {
  if (sort === 'new') return { createdAt: 1 };
  if (sort === 'popular') return { likes: 1 };
  else throw Error('Incorrect "Sort by" value');
};

const getSearchQuery = (search: string, query: string) => {
  // CHECK WHAT HAPPENS WHEN params.q === ''

  const searchSwitch = {
    title: getTitleQuery(query),
    categories: getCategoriesQuery(query),
    both: { $or: [getTitleQuery(query), getCategoriesQuery(query)] },
  };

  if (!(search in searchSwitch)) throw Error('Incorrect "Search by" value');
  return searchSwitch[search as keyof typeof searchSwitch];
};

const getTitleQuery = (query: string) => ({
  $title: {
    $search: query,
    $caseSensitive: false,
  },
});

const getCategoriesQuery = (query: string) => ({
  categories: {
    $in: query.toLowerCase().split(' '),
  },
});

async function searchBlogs(params: SearchParams) {}

export async function searchBlogPosts() {}
