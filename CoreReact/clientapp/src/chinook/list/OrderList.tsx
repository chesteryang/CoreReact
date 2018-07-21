import * as React from 'react'
import { IChinookStates, ITrack } from '../common/types'
import { IStore } from '../../common/types'
import { Dispatch, connect } from 'react-redux'
import { changeView } from '../actions'
import './OrderList.css'
interface IState{
    selectedInvoiceId: number
}
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
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => {
    return {
        gotoStore: () => changeView(dispatch, 'store'),
    }
}

class OrderListComponent extends React.Component<IStateFromProps & IDispatchFromProps, IState> {
    constructor(props: IStateFromProps & IDispatchFromProps){
        super(props)
        this.state = {selectedInvoiceId: 0}
    }

    render(){
        return (
            <div>
                {this.state.selectedInvoiceId === 0 && this.renderOrderList()}
                {this.state.selectedInvoiceId > 0 && this.renderTrackList()}
            </div>
        )
    }

    renderOrderList = () => {
        const orders = this.props.chinookStates.invoicesState
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>Order List</h2>
                    </div>
                    <div className="col-sm-6">
                        {this.props.chinookStates.viewState !== 'store' && (
                            <button className='btn btn-info' onClick={this.handleGoBackStore}>Go Back Store</button>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {orders && orders.length > 0 && (
                            <div className="invoiceList">
                                <table className='table table-striped'>
                                    <thead>
                                    <tr>
                                        <th style={{'width': '6%'}}>Id</th>
                                        <th style={{'width': '15%'}}>Customer</th>
                                        <th style={{'width': '15%'}}>Date</th>
                                        <th style={{'width': '8%'}}>Price</th>
                                        <th>Billing Address</th>
                                        <th>Sales Person</th>
                                        <th>Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(o => (
                                            <tr key={o.invoiceId}>
                                                <td style={{'width': '6%'}}>{o.invoiceId}</td>
                                                <td style={{'width': '15%'}}>{this.getCustomerName(o.customerId)}</td>
                                                <td style={{'width': '15%'}}>{o.invoiceDate}</td>
                                                <td style={{'width': '8%'}}>{o.total}</td>
                                                <td>{o.billingAddress + ', ' + o.billingCity + ', ' + o.billingCountry}</td>
                                                <td>{this.getEmployeeName(o.invoiceId)}</td>
                                                <td>
                                                    <button className='btn btn-info' onClick={this.handelClick} 
                                                        id={o.invoiceId.toString()}>
                                                        Order Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    renderTrackList = () => {
        const invoice = this.props.chinookStates.invoicesState.find(i => i.invoiceId === this.state.selectedInvoiceId)
        if(!invoice){
            return (
                <div/>
            )
        }
        const items = invoice.invoiceItems
        if(!items || items.length === 0){
            return (
                <div/>
            )
        }
        const tracks = items.map(i => this.getTrack(i.trackId))
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <h4>Order {this.state.selectedInvoiceId}'s Detail</h4>
                    </div>
                    <div className="col-sm-6">
                        <button className='btn btn-info' onClick={this.handleGoBack}>Go Back</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        {tracks && tracks.length > 0 && (
                            <div className="trackList">
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Composer</th>
                                            <th>Album</th>
                                            <th>Genre</th>
                                            <th>Unit Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tracks.map(t => (
                                            <tr key={t.trackId}>
                                                <td>{t.name}</td>
                                                <td>{t.composer}</td>
                                                <td>{this.getAlbumTitle(t.albumId)}</td>
                                                <td>{this.getGenreName(t.genreId)}</td>
                                                <td>{t.unitPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    getCustomerName = (customerId: number) => {
        const customer = this.props.chinookStates.customersState.find(c => c.customerId === customerId)
        return customer ? customer.firstName + ' ' + customer.lastName: customerId
    }

    getEmployeeName = (invoiceId: number) => {
        const saleRecord = this.props.chinookStates.saleRecordsState.find(s => s.invoiceId === invoiceId)
        if(saleRecord){
            const employee = this.props.chinookStates.employeesState.find(e => e.employeeId === saleRecord.employeeId)!
            return employee.firstName + ' ' + employee.lastName
        }
        return 'unknown'
    }

    getTrack = (trackId: number): ITrack => {
        return this.props.chinookStates.tracksState.find(t => t.trackId === trackId)!
    }

    getAlbumTitle = (albumId: number): string => {
        const album = this.props.chinookStates.albumsState.find(a => a.albumId === albumId)
        return album? album.title: ''
    }

    getGenreName = (genreId: number): string => {
        const genre = this.props.chinookStates.genresState.find(g => g.genreId === genreId)
        return genre? genre.name: ''
    }

    handelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        this.setState({selectedInvoiceId: Number(e.currentTarget.id)})    
    }

    handleGoBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        this.setState({selectedInvoiceId: 0})
    }

    handleGoBackStore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        this.props.gotoStore()
    }
}

export const OrderList = connect(mapStateToProps, mapDispatchToProps)(OrderListComponent)