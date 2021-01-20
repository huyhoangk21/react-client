import {
  ReactElement,
  useReducer,
  useEffect,
  ReactNode,
  createContext,
  Dispatch,
} from 'react';
import axios from '../api/axios';
import UserSummaryResponse from '../interfaces/UserSummaryResponse';

interface AuthState {
  authenticated: boolean;
  userId: string;
  username: string;
  imageUrl: string;
}

interface AuthAction {
  type: AuthActionTypes;
  payload: AuthState | null;
}

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

const INITIAL_STATE: AuthState = {
  authenticated: false,
  userId: '',
  username: '',
  imageUrl: '',
};

export const AuthStateContext = createContext<AuthState>({} as AuthState);
export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(
  {} as Dispatch<AuthAction>
);

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionTypes.LOGIN:
      return { ...state, ...payload };
    case AuthActionTypes.LOGOUT:
      localStorage.removeItem('token');
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let fetch = true;
    if (token) {
      const fetchMe = async (): Promise<void> => {
        try {
          const { data }: { data: UserSummaryResponse } = await axios.get(
            '/auth/me',
            {
              headers: {
                Authorization: token,
              },
            }
          );
          dispatch({
            type: AuthActionTypes.LOGIN,
            payload: {
              authenticated: true,
              ...data,
              // 'https://secure.gravatar.com/avatar/?s=190&d=mm&r=g',
            },
          });
        } catch (error) {
          dispatch({ type: AuthActionTypes.LOGOUT, payload: null });
        }
      };
      if (fetch) fetchMe();
    }
    return () => {
      fetch = false;
    };
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
