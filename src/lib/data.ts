import Cookies from "js-cookie";

export type User = {
  userId: number;
  username: string;
  email?: string;
};

type Auth = {
  user: User;
  token: string;
};

const authKey = "um.auth";

export function saveAuth(user: User, token: string): void {
  const auth: Auth = { user, token };
  Cookies.set(authKey, JSON.stringify(auth), { expires: 7 });
  Cookies.set("token", token, { expires: 7 });
}

export function removeAuth(): void {
  Cookies.remove(authKey);
  Cookies.remove("token");
}

export function readUser(): User | undefined {
  const auth = Cookies.get(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).user;
}

export function readToken(): string | undefined {
  const auth = Cookies.get(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).token;
}
