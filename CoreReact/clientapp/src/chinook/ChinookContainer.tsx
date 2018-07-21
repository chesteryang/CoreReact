import * as React from 'react'
import { Tab, Row, Nav, NavItem, Glyphicon } from 'react-bootstrap'
import { AlbumContainer } from './list/AlbumContainer'
import { CheckOutContainer } from './admin/CheckOutContainer'
import { ChinookView } from './common/types'
import { IStore } from '../common/types'
import { connect } from 'react-redux'
import { OrderList } from './list/OrderList'
import './ChinookContainer.css'

interface IStateFromProps{
    chinookView: ChinookView
}

const mapStateToProps = (store: IStore): IStateFromProps => {
    return {
        chinookView: store.chinookStates.viewState
    }
}
class ChinookContainerComponent extends React.Component<IStateFromProps, {}> {
    render(){
        const view = this.props.chinookView
        return (
            <div className="chinookContainer">
                <h2 style={{'fontFamily': 'Tahoma, Geneva, sans-serif', 'textAlign': 'center'}}>
                    Chinook Music Store</h2>
                {view === 'store' && this.renderStoreView()}
                {view === 'checkout' && this.renderCheckoutView()}
                {view === 'report' && this.renderInvoiceView()}
            </div>
        )
    }

    renderStoreView = () => {
        return (
            <Tab.Container id="chinookTabs" defaultActiveKey="first">
            <Row className="clearfix">
                <Nav bsStyle="tabs">
                    <NavItem eventKey="first">
                        <Glyphicon glyph='shopping-cart' /> Store
                    </NavItem>
                    <NavItem eventKey="second">
                        <Glyphicon glyph='list' /> Orders 
                    </NavItem>
                    <NavItem eventKey="three">
                        <Glyphicon glyph='user' /> Tab 3
                    </NavItem>
            </Nav>
                <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                        <AlbumContainer />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        <OrderList />
                    </Tab.Pane>
                    <Tab.Pane eventKey="three">Tab 3 content</Tab.Pane>
                </Tab.Content>
            </Row>
            </Tab.Container>
        )
    }

    renderCheckoutView = () => {
        return (
            <div>
                <CheckOutContainer />
            </div>
        )
    }

    renderInvoiceView = () => {
        return (
            <div>
                <OrderList />
            </div>
        )
    }
}

export const ChinookContainer = connect(mapStateToProps, null)(ChinookContainerComponent)