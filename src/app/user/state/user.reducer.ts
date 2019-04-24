import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromRoot from "../../state/app.state";
import {UserActionTypes} from "./user.actions";


export interface UserState {
  maskUserName: boolean;
}

export interface State extends fromRoot.State {
  user: UserState;
}

const initialState: UserState = { maskUserName: false};
const getUserFeatureState = createFeatureSelector<UserState>('userLogin');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state: any) => state.reducer.maskUserName
);

export function reducer(state = initialState, action): any {
  switch(action.type){
    case UserActionTypes.MaskUserName:
      return{
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}

