export type AuthType = {
  nickName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

export type TypeRole = 'admin' | 'user' | undefined;
