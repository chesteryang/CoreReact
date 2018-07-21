import * as React from 'react';
import { IEmployee } from '../common/types';
import { Dispatch, connect } from 'react-redux';
import { enterEmployeeNew, enterEmployeeUpdate } from '../actions';
import { SimpleModal } from '../../home/Modal'
import './EmployeeList.css'

interface IState{
    employees: IEmployee[]
    showDeleteModal: boolean
    id: string
}

interface IDispatchFromProps{
    enterNew: () => void
    enterEditing: (id: number) => void
}

interface IApiFromProps{
    getEmployees: (callback: (employees: IEmployee[]) => void) => void
    deleteEmployee: (id: string, callback: (ok: boolean) => void) => void
}

const mapDispatchToProps =  (dispatch: Dispatch): IDispatchFromProps => {
    return {
        enterNew: () => enterEmployeeNew(dispatch),
        enterEditing: (id) => enterEmployeeUpdate(dispatch, id)
    }
}

class EmployeeListComponent extends React.Component<IDispatchFromProps & IApiFromProps, IState>{
    constructor(props: IDispatchFromProps & IApiFromProps){
        super(props)
        this.state = {employees: [], showDeleteModal: false, id: ''}
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleNewClick = this.handleNewClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    componentDidMount(){
        this.getEmployees()
    }

    private getEmployees = () => {
        this.props.getEmployees(this.setEmployees)
    }

    private setEmployees = (employees: IEmployee[]) => {
        this.setState({employees})
    }

    private deleteEmployeeResult = (ok: boolean) => {
        if(ok){
            this.getEmployees()
        }
    }

    handleNewClick(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        this.props.enterNew()
    }

    handleEditClick(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        this.props.enterEditing(Number(e.currentTarget.id))
    }

    handleDeleteClick(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        this.setState({id: e.currentTarget.id, showDeleteModal: true})
    }

    onClose = (btnState: boolean) => {
        this.setState({showDeleteModal: false})
        if(btnState){
            this.props.deleteEmployee(this.state.id, this.deleteEmployeeResult)
        }
    }

    private renderEmployee(e: IEmployee){
        return (
            <tr key={e.id}>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.title}</td>
                <td>{e.birthDate}</td>
                <td>{e.homePhone}</td>
                <td>{e.address}</td>
                <td>{e.city}</td>
                <td>{e.country}</td>
                <td style={{'width': '15%'}}>
                    <div className="btn-group">
                        <button className="btn btn-primary btnEdit" id={e.id.toString()} onClick={this.handleEditClick}>
                            <i className="glyphicon glyphicon-edit" />Edit
                        </button>
                        <button className="btn btn-info btnEdit" id={e.id.toString()} onClick={this.handleDeleteClick}>
                            <i className="glyphicon glyphicon-remove" />Delete
                        </button>
                    </div>
                </td>
            </tr>
        )
    }

    render(){
        const employees = this.state.employees
        return (
            <div>
                <h2 className="topnewsHeader">Employee List</h2>
                <div>
                    <button className="btn btn-primary" onClick={this.handleNewClick}>
                        <i className="glyphicon glyphicon-plus" />Add Employee
                    </button>                    
                </div>
                <br/>
                {employees && employees.length > 0 && (
                    <div className='northwindEmployeeList'>
                    <table className="table table-striped alert-info">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Title</th>
                                <th>Birth Date</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Country</th>
                                <th style={{'width': '15%'}}>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(e => this.renderEmployee(e))}
                        </tbody>
                    </table>
                    </div>
                )}
                <SimpleModal showMe={this.state.showDeleteModal} title="Delete Employee" header="Are you sure" 
                    text="The employee record will be deleted by clicking Delete button"
                    okText="Delete" cancelText="Cancel" onClose={this.onClose} />
            </div>
        )
    }
}

export const EmployeeList = connect(null, mapDispatchToProps)(EmployeeListComponent)