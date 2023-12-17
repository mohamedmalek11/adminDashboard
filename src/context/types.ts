export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  emailAddress: string;
  password: string;
};

export type UserDataType = {
  userData: object;
  id: string;
  roles: object;
  emailAddress: string;
  firstName: string;
  lastName: string;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  user: UserDataType | null;
  setLoading: (value: boolean) => void;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
};
