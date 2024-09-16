export const usersApi = {
  getUsers: () => fetch('/').then<{ name: string, age: number; }[]>(res => res.json())
};