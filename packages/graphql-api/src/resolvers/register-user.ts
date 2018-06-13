import { AccountsServer } from '@accounts/server';
import { IResolverContext } from '../types/graphql';
import { AccountsPassword } from '@accounts/password';
// tslint:disable-next-line:no-submodule-imports
import { PasswordCreateUserType } from '@accounts/password/lib/types';

export const registerPassword = (accountsServer: AccountsServer) => async (
  _,
  args: GQL.IRegisterOnMutationArguments,
  ctx: IResolverContext
) => {
  const { user } = args;

  const password = accountsServer.getServices().password as AccountsPassword;

  if (!(typeof password.createUser === 'function')) {
    throw new Error('Register user with password is not supported.');
  }

  const userId = await password.createUser(user as PasswordCreateUserType);

  return userId;
};