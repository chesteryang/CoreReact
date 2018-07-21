import * as React from 'react'
import { IChinookStates } from '../common/types'
import { IStore } from '../../common/types'
import { connect, Dispatch } from 'react-redux'
import { employeeLoggedin, employeeLoggedout } from '../actions'

interface IStateFromProps{
    chinookStates: IChinookStates
}

interface IDispatchFromProps{
    loggedIn: (employeeId: number) => void
    loggedOut: () => void
}

const mapStateToProps = (store: IStore): IStateFromProps => {
    return {
        chinookStates: store.chinookStates
    }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => {
    return {
        loggedIn: (employeeId) => employeeLoggedin(dispatch, employeeId),
        loggedOut: () => employeeLoggedout(dispatch)
    }
} 

export class EmployeeViewComponent extends React.Component<IStateFromProps & IDispatchFromProps, {id: string}> {
    constructor(props: IStateFromProps & IDispatchFromProps){
        super(props)
        this.state = {id: '1'}
        this.handleChange = this.handleChange.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    handleChange(event: any) {
        this.setState({id: event.target.value});
    }

    login(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        this.props.loggedIn(Number(this.state.id))
    }

    logout(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        this.props.loggedOut()
    }

    render(){
        const id = this.props.chinookStates.loggedInEmployeeId
        if(id > 0){
            const employee = this.props.chinookStates.employeesState.find(e => e.employeeId === id)!
            return (
                <div>
                    <span>{employee.firstName + ' ' + employee.lastName + ', ' + employee.title + ' '}</span>
                    <button className='btn btn-info' onClick={this.logout}>Logout</button>
                </div>    
            )
        }
        const employees = this.props.chinookStates.employeesState
        return (
            <div>
                {employees && employees.length > 0 && (
                    <form className='form-inline'>
                        <select className='form-control' value={this.state.id} onChange={this.handleChange}>
                            {employees.map(e => (
                                <option key={e.employeeId} value={e.employeeId}>
                                    {e.firstName + ' ' + e.lastName + ' '}
                                </option>
                            ))}
                        </select>
                        <button className='btn btn-primary' onClick={this.login}>Employee Login</button>
                    </form>
                )}
            </div>
        )
    }
}

export const EmployeeView = connect(mapStateToProps,mapDispatchToProps)(EmployeeViewComponent)