import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser, IUserState } from '../reducers/UserReducer';
import { SidebarActionTypes } from './SidebarActions';
import config from '../config.json';

export enum UserActionTypes {
  GET = 'GET',
}

export interface IUserGetAction {
  type: UserActionTypes.GET;
  user: IUser;
  menuLinks: any[];
}

export type UserActions = IUserGetAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getUser: ActionCreator<ThunkAction<Promise<any>, IUserState, null, IUserGetAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
        const response = await fetch(config.intranet_api_domain + '/api/user/user');
        let result = await response.json();
        debugger;
        dispatch({
          user: result.response,
          type: UserActionTypes.GET
        })
        dispatch({
          user: result.response,
          links: result.response.appLinks.sort((itemA, itemB) => itemA.assignedIndex - itemB.assignedIndex),
          type: SidebarActionTypes.ORDER_LINK
        })
    } catch (err) {
      console.error(err);
    }
  };
};
