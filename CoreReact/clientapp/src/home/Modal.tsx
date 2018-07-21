import * as React from 'react'
import {Modal, Button} from 'react-bootstrap'

export interface IModalDesriptor{
    showMe: boolean
    title: string
    header: string
    text: string
    cancelText: string
    okText: string
    onClose: (state: boolean) => void
}

export class SimpleModal extends React.Component<IModalDesriptor, any> {
    constructor(props: IModalDesriptor) {
      super(props); 
      this.handleCancel = this.handleCancel.bind(this);
      this.handleOk = this.handleOk.bind(this);
    }
  
    handleCancel() {
      this.props.onClose(false)
    }
  
    handleOk() {
      this.props.onClose(true)
    }
  
    render() { 
      return (
        <div>
          <Modal show={this.props.showMe} onHide={this.handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{this.props.header}</h4>
              <p>{this.props.text}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCancel}>{this.props.cancelText}</Button>
              <Button bsStyle="info" onClick={this.handleOk}>{this.props.okText}</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }