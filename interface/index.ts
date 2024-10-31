export interface User {
  id: string;
  email: string;
  balance: string;
}

export interface OperationRequest {
  from: string;
  to: string;
  amount: string;
}

export interface OperationResponse {
    id: string;
    from: string;
    to: string;
    amount: string;
    operateAt: Date;
  }

export interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export interface UserState {
  user: User | null;
  users: User[] | null;
  setUser: () => Promise<boolean>;
  getAllUsers: () => Promise<void>;
}

export interface OperationState {
  operations: OperationResponse[] | null;
  findAllOperations: (id: string) => Promise<void>;
  createOperation: (data: OperationRequest) => Promise<boolean>;
}
