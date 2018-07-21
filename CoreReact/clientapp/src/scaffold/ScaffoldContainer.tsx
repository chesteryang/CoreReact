import * as React from 'react'
import { Tab, Row, Nav, NavItem, Glyphicon } from 'react-bootstrap'
import {FetchJsonPlaceHolderData} from './FetchJsonPlaceHolderData'

export class ScaffoldContainer extends React.Component {
    render(){
        return (
            <Tab.Container id="scaffoldTabs" defaultActiveKey="first">
            <Row className="clearfix">
                <Nav bsStyle="tabs">
                    <NavItem eventKey="first">
                        <Glyphicon glyph='list' /> Fetch Data
                    </NavItem>
                    <NavItem eventKey="second">
                        <Glyphicon glyph='list' /> Tab 2 
                    </NavItem>
                    <NavItem eventKey="three">
                        <Glyphicon glyph='user' /> Tab 3
                    </NavItem>
            </Nav>
                <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                        <FetchJsonPlaceHolderData />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        Tab 2 content
                    </Tab.Pane>
                    <Tab.Pane eventKey="three">Tab 3 content</Tab.Pane>
                </Tab.Content>
            </Row>
            </Tab.Container>        
        )
    }
}