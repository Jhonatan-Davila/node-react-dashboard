import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser, IUserState } from '../reducers/UserReducer';
import { ISidebarState } from '../reducers/SidebarReducer';

export enum PostActionTypes {
  OPEN_DETAIL = 'OPEN_DETAIL',
  CLOSE_DETAIL = 'CLOSE_DETAIL'
}

export interface IOpenDetailAction {
  type: PostActionTypes.OPEN_DETAIL;
  title: string;
  date: Date;
  content: string;
  link: string;
  id?: string;
  image?: string;
}


export type SidebarActions = IOpenDetailAction;

/* <Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const addLinks: ActionCreator<ThunkAction<Promise<any>, ISidebarState, null, IOpenDetailAction>> =
 (links: any[]) => async (dispatch: Dispatch) => 
    dispatch({type: PostActionTypes.OPEN_DETAIL, links: links})
  
