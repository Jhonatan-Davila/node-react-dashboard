import { Reducer } from 'redux';
import { UserActions, UserActionTypes } from '../Actions/UserActions';
import { SidebarActionTypes, SidebarActions } from '../Actions/SidebarActions';

const allLinksMock: any[] = [ {name: "Home", defaultIndex: 0, address: '/'},
{name: "Posts", defaultIndex: 1, address: '/posts'},
{name: "Chronos",defaultIndex: 3, address: 'http://iasrvpt02/'},
{name: "Odin", defaultIndex: 4, address: 'https://odin.virgo.atlantico.net.br/#/'},
{name: "ALOC", defaultIndex: 5, address: 'http://atlantis/intranet/aloc'},
{name: "Treinamentos", defaultIndex: 6, address: 'http://atlantis/intranet/treinamentos'},
{name: "Spartas", defaultIndex: 7, address: 'https://spartas.atlantico.com.br/plugins/servlet/desk/portal/1'},
{name: "Jira", defaultIndex: 8, address: 'https://jira.atlantico.com.br/secure/Dashboard.jspa'}]

export interface ISidebar {
    //auth: boolean;
    anchorEl: null | HTMLElement;
    anchorLinkEl: null | HTMLElement;
    AppLinks: any[];
    menuLinks: any[];
    isDragging: boolean;
    user: any,
    drawerOpen: any;
}

export interface ISidebarState {
  anchorEl: null | HTMLElement;
  anchorLinkEl: null | HTMLElement;
  AppLinks: any[];
  menuLinks: any[];
  isDragging: boolean;
  user: any,
  drawerOpen: any;
}

// Define the initial state
const initialSidebarState: ISidebarState = {
    //auth: true,
    anchorEl: null,
    anchorLinkEl: null,
    menuLinks: [],
    isDragging: false,
    AppLinks: allLinksMock,
    user: null,
    drawerOpen: false
};

export const sidebarReducer: Reducer<ISidebarState, SidebarActions | UserActions> = (
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