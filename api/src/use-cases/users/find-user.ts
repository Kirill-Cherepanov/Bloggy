import User from 'models/User';
import { AccessLevelType, formatUser } from 'use-cases/lib';

type FindUserProps = {
  username?: string;
  id?: string;
};

export const findUser = async (
  userData: FindUserProps,
  accessLevel?: AccessLevelType
) => {
  return formatUser(await User.findOne(userData), accessLevel);
};
