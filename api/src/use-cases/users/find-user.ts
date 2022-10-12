import User from 'models/User';

type FindUserProps = {
  username?: string;
  id?: string;
};

export const findUser = async (userData: FindUserProps) => {
  const user = await User.findOne(userData);
  if (!user) return { status: 500, err: 'Author of the post was not found' };
  return user;
};
