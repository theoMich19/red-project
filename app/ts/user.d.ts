export interface User {
  id: number;
  pseudo: string;
  email: string;
  email_verified_at: string | null;
  is_admin: number;
  birthday: string;
  created_at: string | null;
  updated_at: string | null;
}
