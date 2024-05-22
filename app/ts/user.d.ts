export interface User {
  id: number;
  pseudo: string;
  email: string;
  email_verified_at: string | null;
  is_admin: number;
  birthday: string;
  created_at: string;
  updated_at: string;
  friend_code: string;
}
