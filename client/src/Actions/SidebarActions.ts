import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser, IUserState } from '../reducers/UserReducer';
import { ISidebarState } from '../reducers/SidebarReducer';

export enum SidebarActionTypes {
  UPDATE_LINKS = 'UPDATE_LINKS',
  REMOVE_LINK = 'REMOVE_LINK',
  ADD_LINK = 'ADD_LINK',
  OPEN_DRAWER = 'OPEN_DRAWER',
  ORDER_LINK = 'ORDER_LINK',
}

export interface IUpdateLinkAction {
  type: SidebarActionTypes.UPDATE_LINKS;
  user: IUser;
  links: any;
}

export interface IRemoveLinkAction {
    type: SidebarActionTypes.REMOVE_LINK;
    links: any[];
  }

export interface IOpenDrawerAction {
  type: SidebarActionTypes.OPEN_DRAWER;
  drawerOpen: boolean;
}

export interface IOrderLinksAction {
  type: SidebarActionTypes.ORDER_LINK;
  links: any[];
}

export interface IAddLinkAction {
  type: SidebarActionTypes.ADD_LINK;
  links: any[];
}

export type SidebarActions = IUpdateLinkAction | IRemoveLinkAction | IOpenDrawerAction | IOrderLinksAction | IAddLinkAction | IRemoveLinkAction;

/* <Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const openDrawer: ActionCreator<ThunkAction<Promise<any>, ISidebarState, null, IOpenDrawerAction>>
= (drawerOpen: boolean = false) => async (dispatch: Dispatch) => 
    {dispatch({ type: SidebarActionTypes.OPEN_DRAWER, drawerOpen: !drawerOpen})}


export const addLinks: ActionCreator<ThunkAction<Promise<any>, ISidebarState, null, IAddLinkAction>> =
 (links: any[]) => async (dispatch: Dispatch) => 
    dispatch({type: SidebarActionTypes.ADD_LINK, links: links})

export const orderLinks: ActionCreator<ThunkAction<Promise<any>, ISidebarState, null, IOrderLinksAction>>
= (links: any[]) =>  async (dispatch: Dispatch) => 
    dispatch({type: SidebarActionTypes.ORDER_LINK, links: links})

export const removeLinks: ActionCreator<ThunkAction<Promise<any>, ISidebarState, null, IRemoveLinkAction>>
= ( links: any[]) => async (dispatch: Dispatch) => 
    dispatch({type: SidebarActionTypes.REMOVE_LINK, links: links})
  

