export interface User {
    id: string;
    name: string;
    role: string;
    system: {
      name: string;
      type: string;
    }
    created_at: string;
    updated_at: string;
  }