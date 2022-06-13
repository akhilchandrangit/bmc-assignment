import type { User } from "./user";

export interface AddUserFormError {
  name?: string;
  email?: string;
  gender?: string;
  status?: string;
}

export interface AddUserFormValue {
  name: string | null;
  email: string | null;
  gender: string | null;
  status: User['status'] | null;
}
