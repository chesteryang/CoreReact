import { Dispatch } from "react-redux";
import { NORTHWIND_TAB_CHANGED, ENTER_EMPLOYEE_EDITING, EMPLOYEE_LOADED, OUTOF_EMPLOYEE_EDITING, ENTER_CUSTOMER_EDITING, OUTOF_CUSTOMER_EDITING, ORDER_LOAD_STARTED, ORDER_LOAD_COMPELED, ORDERDETAILS_LOAD_COMPELED } from "../common/actionConstants";
import { IEmployeeViewState, IOrderViewState } from "../common/types";

export const northwindTabChanged = (dispatch: Dispatch, eventKey: string) => {
    dispatch({
        type: NORTHWIND_TAB_CHANGED,
        payload: {
            eventKey
        }
    })
}

export const enterEmployeeNew = (dispatch: Dispatch) => {
    dispatch({
        type: ENTER_EMPLOYEE_EDITING,
        payload:{
            type:'new',
            id: -1
        } as IEmployeeViewState
    })
}

export const enterEmployeeUpdate = (dispatch: Dispatch, id: number) => {
    dispatch({
        type: ENTER_EMPLOYEE_EDITING,
        payload:{
            type:'edit',
            id
        } as IEmployeeViewState
    })
}

export const employeeLoaded = (dispatch: Dispatch, id: number) => {
    if(id <= 0) { return }
    fetch('/api/NorthwindEmployees/' + id)
    .then(res => res.json())
    .then(json => dispatch({
        type: EMPLOYEE_LOADED,
        payload: {
            type: 'edit',
            id,
            employee: json
        } as IEmployeeViewState
    }))
}

export const outofEmployeeEditing = (dispatch: Dispatch) => {
    dispatch({
        type: OUTOF_EMPLOYEE_EDITING,
        payload: {
            type: 'list',
            id: -1
        }
    })
}

export const enterCustomerEditing = (dispatch: Dispatch, id: string) => {
    dispatch({
       type: ENTER_CUSTOMER_EDITING,
       payload: id
   })  
}

export const outofCustomerEditing = (dispatch: Dispatch) => {
   dispatch({
       type: OUTOF_CUSTOMER_EDITING,
       payload: ''
   })       
}

export const getOrders = (dispatch: Dispatch) => {
    dispatch({
        type: ORDER_LOAD_STARTED,
        payload: {
            loading: true,
            orders: []
        } as IOrderViewState
    })

    fetch('/api/NorthwindOrders')
    .then(res => res.json())
    .then(json => dispatch({
        type: ORDER_LOAD_COMPELED,
        payload: {
            loading: false,
            orders: json
        } as IOrderViewState
    }))
}

export const getOrderDetails = (dispatch: Dispatch) => {
    fetch('/api/NorthwindOrderDetails')
    .then(res => res.json())
    .then(json => dispatch({
        type: ORDERDETAILS_LOAD_COMPELED,
        payload: json
    }))
}
