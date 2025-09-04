import type { Models } from 'appwrite';
import { account, ID } from './sdk';

export let user: Models.User | undefined = await account.get().catch(() => undefined);

export const accountLogin = async (email: string, password: string) => {
  // i recognise the linter has made a decision that this method is deprecated,
  // but given that it's in the docs, i have elected to ignore it
  await account.createEmailPasswordSession(email, password);
  user = await account.get();
};

export const accountCreate = async (
  email: string,
  password: string,
  userId: string = ID.unique()
) => {
  await account.create({ userId, email, password });
  await accountLogin(email, password);
};

export const accountLogout = async () => {
  await account.deleteSession('current');
  user = undefined;
};
