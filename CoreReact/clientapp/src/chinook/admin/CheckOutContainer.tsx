import * as React from 'react'
import { IChinookStates, ITrack, IOrder } from '../common/types'
import { IStore } from '../../common/types'
import { changeView, loadInvoices, clearShoppingCart, loadSaleRecords } from '../actions'
import { Dispatch, connect } from 'react-redux'
import * as _ from 'lodash'
import './CheckOutContainer.css'

interface IStateFromProps{
    chinookStates: IChinookStates
}

const mapStateToProps = (store: IStore): IStateFromProps => {
    return {
        chinookStates: store.chinookStates
    }
}

interface IDispatchFromProps{
    gotoStore: () => void
    gotoReport: () => void
    loadInvoices: () => void
    loadSaleRecords: () => void
    clearShoppingCart: () => void
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => {
    return {
        gotoStore: () => changeView(dispatch, 'store'),
        gotoReport: () => changeView(dispatch, 'report'),
        loadInvoices: () => loadInvoices(dispatch),
        loadSaleRecords: () => loadSaleRecords(dispatch),
        clearShoppingCart: () => clearShoppingCart(dispatch)
    }
}

class CheckOutContainerComponent extends React.Component<IStateFromProps & IDispatchFromProps, {}> {
    render(){
        const c = this.getCustomer()
        const e = this.getEmployee()
        const ts = this.getFlattenedTracks()
        const totalPrice = _.reduce(ts, (sum: number, track: ITrack) => sum + Number(track.unitPrice), 0)
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Order Summary</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1">
                        <h4>Customer</h4>
                    </div>
                    <div className="col-sm-5">
                        {c && (
                            <div>
                                <p>Name: {c.firstName + ' ' + c.lastName}</p>
                                <p>Address: {c.address}</p>
                            </div>
                        )}                    
                    </div>
                    <div className="col-sm-1">
                        <h4>Employee</h4>
                    </div>
                    <div className="col-sm-5">
                        {e && (
                            <div>
                                <p>Title: {e.title}</p>
                                <p>Name: {e.firstName + ' ' + e.lastName}</p>
                            </div>
                        )}                    
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <hr />
                        <h4>Order Details (Total Price: ${totalPrice.toFixed(2)})</h4>
                        {ts && (
                            <div className='orderDetails'>
                               <table className='table table-striped'>
                                   <thead>
                                       <tr>
                                           <th>Id</th>
                                           <th>Name</th>
                                           <th>Composer</th>
                                           <th>Price</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                    {ts.map(t => (
                                        <tr key={t.trackId}>
                                            <td>{t.trackId}</td>
                                            <td>{t.name}</td>
                                            <td>{t.composer}</td>
                                            <td>{t.unitPrice}</td>
                                        </tr>

                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <button className='btn btn-default' onClick={this.gotoStore}>Go Back to Store</button>                
                        <button className='btn btn-success' onClick={this.submitOrder}>Submit Order</button>                
                    </div>
                </div>
            </div>
        )
    }

    gotoStore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        this.props.gotoStore()
    }

    submitOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const ts = this.getFlattenedTracks()
        const totalPrice = _.reduce(ts, (sum: number, track: ITrack) => sum + Number(track.unitPrice), 0)
        const body: IOrder = {
            employeeId: this.props.chinookStates.loggedInEmployeeId,
            customerId: this.props.chinookStates.selectedCustomerId,
            totalPrice,
            trackIds: ts.map(t => t.trackId)
        }
        fetch('/api/ChinookInvoices/PostOrder', {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'content-type':'application/json'
            }
        }).then(res => {
            if(res.ok){
                this.props.loadInvoices()
                this.props.loadSaleRecords()
                this.props.clearShoppingCart()
                this.props.gotoReport()
            }
        })
    }

    getCustomer = () => {
        const id = this.props.chinookStates.selectedCustomerId
        return this.props.chinookStates.customersState.find(c => c.customerId === id)
    }

    getEmployee = () => {
        const id = this.props.chinookStates.loggedInEmployeeId
        return this.props.chinookStates.employeesState.find(e => e.employeeId === id)
    }

    getFlattenedTracks = () => {
        const state = this.props.chinookStates
        const trackIds = state.shoppingCart.trackIds
        const albumIds = state.shoppingCart.albumIds;
        return state.tracksState.filter(t => _.includes(albumIds, t.albumId) || _.includes(trackIds, t.trackId))
    }
}

export const CheckOutContainer = connect(mapStateToProps, mapDispatchToProps)(CheckOutContainerComponent)