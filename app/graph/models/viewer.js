import { UserType } from './types';
import { UserSchema as User } from './schemas';

export default {
  type: UserType,
  resolve: (parent, args, { session }) => {
    // return User.getById('58616b8d9fd38119f11a0dd6');
    const { userId } = session;
    return userId ? User.getById(userId) : null;
  },
};
