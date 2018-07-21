import * as React from 'react'
import { ICustomer } from '../common/types'
import { Dispatch, connect } from 'react-redux'
import { enterCustomerEditing } from '../actions'
import './CustomerList.css'

interface IState{
    customers: ICustomer[]
}
interface IDispatchFromProps{
    enterEditing: (id: string) => void
}

const mapDispatchToProps =  (dispatch: Dispatch): IDispatchFromProps => {
    return {
        enterEditing: (id) => enterCustomerEditing(dispatch,id)
    }
}

class Customers extends React.Component<IDispatchFromProps, IState> {
    constructor(props: IDispatchFromProps){
        super(props)
        this.state = {customers: []}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        this.props.enterEditing(e.currentTarget.id)
    }

    componentDidMount(){
        this.fetchCustomers()
    }

    fetchCustomers(){
        fetch('/api/NorthwindCustomers')
            .then(res => res.json())
            .then(json => {
                this.setState({customers: json})
            })
    }

    renderTable(customers: ICustomer[]){
        return (
            <table className="table table-striped alert-info">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Contact Name</th>
                        <th>Contact Title</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Region</th>
                        <th>Postal Code</th>
                        <th>Country</th>
                        <th>Phone</th>
                        <th>Fax</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                {customers.map(c =>
                    <tr key={c.id}>
                        <td>{c.companyName}</td>
                        <td>{c.contactName}</td>
                        <td>{c.contactTitle}</td>
                        <td>{c.address}</td>
                        <td>{c.city}</td>
                        <td>{c.region}</td>
                        <td>{c.postalCode}</td>
                        <td>{c.country}</td>
                        <td>{c.phone}</td>
                        <td>{c.fax}</td>
                        <td>
                            <button className="btn btn-primary btnEdit" id={c.id} onClick={this.handleClick}>
                                <i className="glyphicon glyphicon-edit" />Edit
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>            
        )
    }

    render(){
        return (
            <div>
                <h2 className="topnewsHeader">Customer List</h2>
                <br />
                {this.state.customers.length  > 0 && 
                    <div className='northwindCustomerList'>
                        {this.renderTable(this.state.customers)}    
                    </div>
                }
            </div>
        )
    }
}

export const CustomerList = connect(null, mapDispatchToProps)(Customers)