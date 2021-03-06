export interface User {
  id: number;
  email: string;
  name: string;
  gender: string;
  status: 'active' | 'inactive';
}
