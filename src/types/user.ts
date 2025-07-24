export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoggeedInUser {
  email: string;
  password: string;
}

export interface UserResponse {
  message: string;
  data: User;
}

export interface Password {
  newPassword: string;
  confirmPassword: string;
}
