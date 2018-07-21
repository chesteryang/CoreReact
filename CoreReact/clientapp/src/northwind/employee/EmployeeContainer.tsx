import * as React from 'react'
import { IStore } from '../../common/types'
import Employee from './Employee'
import { EmployeeList } from './EmployeeList'
import { connect } from 'react-redux'
import { IEmployeeViewState } from '../common/types'
import { getEmployees, deleteEmployee, saveEmployee } from '../common/api'

interface IStateFromProps{
    employeeViewState: IEmployeeViewState
}

const mapStateToProps = (store: IStore):IStateFromProps => {
    return {employeeViewState: store.northwindStates.employeeViewState}
}

export class EmployeeContainerComponent extends React.Component<IStateFromProps, any> {
    render() {
        const viewState = this.props.employeeViewState
        const showEmployeeEditing = viewState && viewState.type !== 'list'
        if(showEmployeeEditing){
            return (
                <Employee save={saveEmployee} />
            )
        }
        return (
            <EmployeeList getEmployees={getEmployees} deleteEmployee={deleteEmployee} />
        )
    }
}

export const EmployeeContainer = connect(mapStateToProps, null)(EmployeeContainerComponent);