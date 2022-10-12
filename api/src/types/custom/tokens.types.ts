export type AccessTokenData = {
  id: string;
  username: string;
  email: string;
};

export type UserTokenData =
  | { isLoggedIn: true; data: AccessTokenData }
  | { isLoggedIn: false; err: { message: string; statusCode: number } };
