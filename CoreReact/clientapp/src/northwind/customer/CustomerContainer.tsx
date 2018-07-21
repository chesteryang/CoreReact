import * as React from 'react'
import { IStore } from '../../common/types'
import { Customer } from './Customer'
import { CustomerList } from './CustomerList'
import { connect } from 'react-redux'
import { ICustomerViewState } from '../common/types'

interface IStateFromProps{
    customerViewState: ICustomerViewState
}
const mapStateToProps = (store: IStore):IStateFromProps => {
    return { customerViewState: store.northwindStates.customerViewState }
}

export class CustomerComponent extends React.Component<IStateFromProps, any> {
    render(){
        const viewState = this.props.customerViewState
        const showCustomerEditing = viewState && viewState.id
        if(showCustomerEditing){
            return (
                <Customer />
            )
        }
        return (
            <CustomerList />
        )
    }
}

export const CustomerContainer = connect(mapStateToProps, null)(CustomerComponent)