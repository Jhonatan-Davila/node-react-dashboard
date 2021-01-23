import { Reducer } from 'redux';
import { UserActions, UserActionTypes } from '../Actions/UserActions';

// Define the Character type
export interface IUser {
  name: string;
  id: number;
  email: string;
  password: string;
  appLinks: any[];
}

// Define the Character State
export interface IUserState {
  readonly user: IUser;
  readonly menuLinks: any[];
}

// Define the initial state
const initialUserState: IUserState = {
  user: null,
  menuLinks: [],
};

export const userReducer: Reducer<IUserState, UserActions> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.GET: {
      return {
        ...state,
        user: action.user,
        menuLinks: action.menuLinks,
      };
    }
    default:
      return state;
  }
};