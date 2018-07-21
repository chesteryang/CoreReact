import { combineReducers } from "redux"
import { 
    northwindTabReduer, 
    employeeViewReducer, 
    customerViewReducer, 
    orderViewReducer, 
    orderDetailReducer} from "../reducers"
import { INorthwindStates } from "../common/types"

export const northwindReducers = combineReducers<INorthwindStates>({
    northwindTabState: northwindTabReduer,
    employeeViewState: employeeViewReducer,
    customerViewState: customerViewReducer,
    orderViewState: orderViewReducer,
    orderDetailState: orderDetailReducer
})