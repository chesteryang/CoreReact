import * as React from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import { NavMenu } from './NavMenu'

export class Layout extends React.Component {
  displayName = Layout.name

  render() {
    return (
      <Grid fluid>
        <Row>
        <Col sm={12}>
            <NavMenu />
          </Col>
        </Row>
        <Row>
          <Col className="content" sm={12}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}