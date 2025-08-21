export type SignupFormField = 'userName' | 'email' | 'password' | 'confirmPassword';

export type LoginFormField = 'email' | 'password';

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
