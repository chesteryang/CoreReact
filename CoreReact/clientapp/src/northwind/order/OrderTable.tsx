import * as React from 'react'
import { getOrders, getOrderDetails } from '../actions'
import { IOrderViewState, IOrder, IOrderDetail } from '../common/types'
import { Dispatch, connect } from 'react-redux'
import ReactTable, { RowInfo } from 'react-table'
import { IStore } from '../../common/types'
import 'react-table/react-table.css'

interface IStateFromProps{
    orderViewState: IOrderViewState
    orderDetailState: IOrderDetail[]
}

const mapStateToProps = (store: IStore): IStateFromProps => {
    return {
        orderViewState: store.northwindStates.orderViewState,
        orderDetailState: store.northwindStates.orderDetailState
    }
}

interface IDispatchFromProps {
    loadOrders: () => void
    loadOrderDetails: () => void
}

const mapDispatchFromProps = (dispatch: Dispatch): IDispatchFromProps => {
    return {
        loadOrders: () => getOrders(dispatch),
        loadOrderDetails: () => getOrderDetails(dispatch)
    }
} 

class OrdersComponent extends React.Component<IStateFromProps & IDispatchFromProps, any> {
    constructor(props: IStateFromProps & IDispatchFromProps){
        super(props)
    }

    componentDidMount(){
        this.props.loadOrders()
        this.props.loadOrderDetails()
    }
    
    render(){
        const { loading, orders } = this.props.orderViewState
        const title = <h2 className="topnewsHeader">Orders</h2> 
        if(loading){
            return (
                <div>
                    {title}
                    <br/><br/><br/>
                    <div className="loading" />              
                    <span className="newsloadingText">Orders are loading</span>
                </div>
            )
        }
        return (
            <div>
                {title}
                <ReactTable className='-striped -highlight'
                    columns={this.getColumns()} data={orders} 
                    SubComponent={this.getSubTable} defaultPageSize={10}/>
            </div>
        )
    }

    getColumns = () => {
        const orderHeader = () => (
            <span className="glyphicon glyphicon-star" 
                style={{color: '#0000ff', fontSize: '1.4em'}}> Order</span>
        )
        const dateWidth = 90
        return [
            { 
                Header: orderHeader, foldable: true, columns: [
                    { Header: 'Id', accessor: 'id', width: 60},
                    { Header: 'Date', accessor: 'orderDate', width: dateWidth},
                    { Header: 'Required Date', accessor: 'requiredDate', width: dateWidth}
                ]
            }, {
                Header: 'Customer', foldable: true, columns: [
                    { Header: 'Id', accessor: 'customerId', width: 60},
                    { Header: 'Name', accessor: 'customer.companyName'},
                    { Header: 'Contact', accessor: 'customer.contactName'},
                ]
            }, {
                Header: 'Shipping', foldable: true, columns: [
                    { Header: 'Shipped Date', accessor: 'shippedDate', width: dateWidth},
                    { Header: 'Freight', accessor: 'freight', width: 60},
                    { Header: 'Name', accessor: 'shipName'},
                    { Header: 'Address', accessor: 'shipAddress'},
                    { Header: 'City', accessor: 'shipCity'},
                    { Header: 'Country', accessor: 'shipCountry'}
                ]
            }
        ]
    }

    getSubTable = (row: RowInfo) => {
        const order = row.row as IOrder
        const orderDetails = this.props.orderDetailState.filter(detail => detail.orderId === order.id)
        let total = 0
        orderDetails.forEach(o => total += Number(o.unitPrice) * o.quantity)
        return (
            <div style={{border: '2px solid blue', padding: '8px'}}>
                <h4>Order Detail (total: ${total.toFixed(2)})</h4>
                <ReactTable columns={this.getSubColumns()} data={orderDetails}
                    showPagination={false} minRows={0} />
            </div>
        )
    }

    getSubColumns = () => {
        return [
            { Header: 'Id', accessor: 'product.id', width: 100},
            { Header: 'Product Name', accessor: 'product.productName'},
            { Header: 'Supplier', accessor: 'product.supplier.companyName'},
            { Header: 'Contact', accessor: 'product.supplier.contactName'},
            { Header: 'Unit Price', accessor: 'unitPrice', width: 100},
            { Header: 'Quantity', accessor: 'quantity', width: 100},
            { Header: 'Discount', accessor: 'discount', width: 100}
        ]
    }
}

export const OrderTable = connect(mapStateToProps, mapDispatchFromProps)(OrdersComponent)

/*
                    { Header: 'Region', accessor: 'shipRegion'},
                    { Header: 'Postal Code', accessor: 'shipPostalCode'},
*/