import { Reducer } from 'redux';
import { UserActions, UserActionTypes } from '../Actions/UserActions';
import { SidebarActionTypes, SidebarActions } from '../Actions/SidebarActions';

export interface IPost {
    //auth: boolean;
    title: string;
    date: Date;
    content: string;
    link: string;
    id?: string;
    image?: string;
}

export interface IPostState {
    title: string;
    date: Date;
    content: string;
    link: string;
    id?: string;
    image?: string;
}

// Define the initial state
const initialSidebarState: IPostState = {
    //auth: true,
    title: null,
    date: null,
    content: null,
    link: null,
    id: null,
    image: null,
};

export const sidebarReducer: Reducer<IPostState, SidebarActions | UserActions> = (
  state = initialSidebarState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.GET: {
      return { ...state, user: action.user };
    }
    case SidebarActionTypes.OPEN_DRAWER: {
      return { ...state, drawerOpen: action.drawerOpen }
    }
    case SidebarActionTypes.ORDER_LINK: {
      return { ...state, menuLinks: action.links }
    }
    case SidebarActionTypes.ADD_LINK: {
      return { ...state, menuLinks: action.links }
    }
    case SidebarActionTypes.REMOVE_LINK: {
      return {...state, menuLinks: action.links }
    }
    default:
      return state;
  }
};