export interface Friend {
  id: number;
  user: {
    id: number;
    pseudo: string;
    friend_code: string;
    created_at: string;
    updated_at: string;
  };
}
