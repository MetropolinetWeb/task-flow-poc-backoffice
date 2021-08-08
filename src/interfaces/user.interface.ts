export interface User {
    id: string;
    name: string;
    role: string;
    system: {
      name: string;
      type: string;
    }
    createdAt: string;
    updatedAt: string;
  }