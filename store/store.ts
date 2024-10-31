import { create } from 'zustand';
import Cookies from "js-cookie";
import { api } from '@/api/api';
import { AuthState, User, UserState, OperationRequest, OperationResponse, OperationState } from '@/interface';

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  
  login: async (email: string, password: string) => {
    try {
      const response = await api.post<User>('/auth/login', { email, password }, {
        withCredentials: true
      });
      if (response.status === 200) {
        Cookies.set("authenticated", "true");
        set({ isAuthenticated: true });
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
    return false;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout", {
        withCredentials: true,
      });
      Cookies.remove("authenticated");
      set({ isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export const useUserStore = create<UserState>((set) => ({
    user: null,
    users: null,

    setUser: async () => {
      if (Cookies.get("authenticated")) {
        const response = await api.get<User>('/user/profile', {
          withCredentials: true
        });
        set({ user: response.data });
        return true;
      } else  {
        return false;
      }
    },
    
    getAllUsers: async  () => {
      if (Cookies.get("authenticated")) {
        const response = await api.get<User[]>('/user/resolvers', {
          withCredentials: true
        });
        set({ users: response.data});
      }
    }
}))

export const useOperationStore = create<OperationState>((set) => ({
  operations: null,
  findAllOperations: async (id: string) => {
    try {
      const response = await api.get<OperationResponse[]>(`/operation?userId=${id}`, {
        withCredentials: true,
      });
      set({operations: response.data})
    } catch (error) {
      alert('Ошибка при переводе')
    }
  },
  createOperation: async (data: OperationRequest) => {
    try {
      const response = await api.post<OperationRequest>('/operation', data, {
        withCredentials: true,
      });
      console.log('перевод прошел')
      return true;
    } catch (error) {
      console.log('перевод не прошел')
      return false;
    }
  } 
}))

export default useAuthStore;