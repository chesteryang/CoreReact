import { INorthwindTabState, IEmployeeViewState, ICustomerViewState, IOrderViewState, IOrderDetail } from "../common/types";
import { Reducer } from "redux";
import { NORTHWIND_TAB_CHANGED, ENTER_EMPLOYEE_EDITING, OUTOF_EMPLOYEE_EDITING, EMPLOYEE_LOADED, ENTER_CUSTOMER_EDITING, OUTOF_CUSTOMER_EDITING, ORDER_LOAD_STARTED, ORDER_LOAD_COMPELED, ORDERDETAILS_LOAD_COMPELED } from "../common/actionConstants";

const initialNorthwindTabState: INorthwindTabState = {
    eventKey: 'first'
}

export const northwindTabReduer: Reducer<INorthwindTabState> =
    (state = initialNorthwindTabState, action: {type: string, payload: INorthwindTabState}) =>{
        switch(action.type){
            case NORTHWIND_TAB_CHANGED:
                return action.payload
            default:
                return state
        }
    }

const initialEmployeeViewState: IEmployeeViewState = {
    type: 'list',
    id: -1
}

export const employeeViewReducer: Reducer<IEmployeeViewState> = 
    (state = initialEmployeeViewState, action: {type: string, payload: IEmployeeViewState}) => {
        switch(action.type){
            case ENTER_EMPLOYEE_EDITING:
                return action.payload
            case OUTOF_EMPLOYEE_EDITING:
                return action.payload
            case EMPLOYEE_LOADED:
                return action.payload
            default:
                return state
        }
    }

const initialCustomerViewState: ICustomerViewState = {
    id: ''
}

export const customerViewReducer: Reducer<ICustomerViewState> = 
    (state = initialCustomerViewState, action: {type: string, payload: string}) => {
        switch(action.type){
            case ENTER_CUSTOMER_EDITING:
                return {id: action.payload}
            case OUTOF_CUSTOMER_EDITING:
                return {id: ''}
            default:
                return state
        }        
    }

const initialOrderViewState: IOrderViewState = {
    loading: true,
    orders: []
}

export const orderViewReducer: Reducer<IOrderViewState> =
    (state = initialOrderViewState, action: {type: string, payload: IOrderViewState}) => {
        switch(action.type){
            case ORDER_LOAD_STARTED:
                return action.payload
            case ORDER_LOAD_COMPELED:
                return action.payload
            default:
                return state
        }
    }

const initialOrderDetailState: IOrderDetail[] = []

export const orderDetailReducer: Reducer<IOrderDetail[]> =
    (state = initialOrderDetailState, action: {type: string, payload: IOrderDetail[]}) => {
        switch(action.type){
            case ORDERDETAILS_LOAD_COMPELED:
                return action.payload
            default:
                return state
        }        
    }