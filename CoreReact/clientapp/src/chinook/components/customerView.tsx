import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { IChinookStates } from '../common/types'
import { IStore } from '../../common/types'
import { selectCustomer } from '../actions'

interface IStateFromProps{
    chinookStates: IChinookStates
}

const mapStateToProps = (store: IStore): IStateFromProps => {
    return {
        chinookStates: store.chinookStates
    }
}

interface IDispatchFromProps{
    selectCustomer: (employeeId: number) => void
}

const mapDispatchToProps = (dispatch: Dispatch):IDispatchFromProps => {
    return {
        selectCustomer: (employeeId) => selectCustomer(dispatch, employeeId)
    }
}

class CustomerViewComponent extends React.Component<IStateFromProps & IDispatchFromProps, {id: string}> {
    constructor(props: IStateFromProps & IDispatchFromProps){
        super(props)
        const selectedCustomerId = this.props.chinookStates.selectedCustomerId.toString()
        this.state = {id: selectedCustomerId}
    }

    handleChange = (event: any) => {
        const id = event.target.value
        this.setState({id})
        this.props.selectCustomer(Number(id))
    }

    render(){
        const customers = this.props.chinookStates.customersState
        return (
            <div>
                {customers && customers.length > 0 && (
                    <form className='form-inline'>
                    <span>Select Customer: </span> 
                    <select className='form-control' value={this.state.id} onChange={this.handleChange}>
                        <option key={0} value={'0'}> ------ </option>
                        {customers.map(c => (
                            <option key={c.customerId} value={c.customerId}>
                                {c.firstName + ' ' + c.lastName}
                            </option>
                        ))}
                    </select>
                </form>                    
                )}
            </div>
        )
    }
}

export const CustomerView = connect(mapStateToProps, mapDispatchToProps)(CustomerViewComponent)