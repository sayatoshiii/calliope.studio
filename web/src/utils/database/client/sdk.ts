import { Client, Account } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://fra.cloud.appwrite.io/v1').setProject('68b9b27d0013513c79d8');

export const account = new Account(client);
export { ID } from 'appwrite';
