import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { Tab, Row, Nav, NavItem, Glyphicon } from 'react-bootstrap'
import { EmployeeContainer } from './employee/EmployeeContainer'
import './NorthwindContainer.css'
import { CustomerContainer } from './customer/CustomerContainer'
import { OrderTable } from './order/OrderTable';
import { northwindTabChanged } from './actions';

interface IDispatchFromProps{
    tabChanged: (evenKey: string) => void
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => {
    return {
        tabChanged: (evenKey: string) => northwindTabChanged(dispatch, evenKey)
    }
}

export class NorthwindContainerComponent extends React.Component<IDispatchFromProps, any> {
    constructor(props: IDispatchFromProps){
        super(props)
        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(e: any) {
        this.props.tabChanged(e)
    }

    render() {
        return (
            <div className="northwindContainer">
                <h2 style={{'fontFamily': 'Tahoma, Geneva, sans-serif', 'textAlign': 'center'}}>
                    Northwind Store</h2>
                <Tab.Container id="northwindTabs" defaultActiveKey="first">
                <Row className="clearfix">
                    <Nav bsStyle="tabs" onSelect={this.onSelect}>
                        <NavItem eventKey="first">
                            <Glyphicon glyph='user' /> Employees
                        </NavItem>
                        <NavItem eventKey="second">
                            <Glyphicon glyph='user' /> Customers                    
                        </NavItem>
                        <NavItem eventKey="three">
                            <Glyphicon glyph='shopping-cart' /> Orders 
                        </NavItem>
                        <NavItem eventKey="four">
                            <Glyphicon glyph='user' /> Tab 4
                        </NavItem>
                </Nav>
                    <Tab.Content animation>
                        <Tab.Pane eventKey="first">
                            <EmployeeContainer />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <CustomerContainer />
                        </Tab.Pane>
                        <Tab.Pane eventKey="three">
                            <OrderTable />
                        </Tab.Pane>
                        <Tab.Pane eventKey="four">Tab 4 content</Tab.Pane>
                    </Tab.Content>
                </Row>
                </Tab.Container>
            </div>
        );
    }
}

export const NorthwindContainer = connect(null, mapDispatchToProps)(NorthwindContainerComponent)
