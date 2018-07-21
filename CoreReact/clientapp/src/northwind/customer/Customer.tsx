import * as React from 'react'
import { ICustomer } from '../common/types'
import { Dispatch, connect } from 'react-redux'
import { outofCustomerEditing } from '../actions'
import { IStore } from '../../common/types'

interface IStateFromProps{
    id: string
}

const mapStateToProps = (store: IStore): IStateFromProps => {
    return {id: store.northwindStates.customerViewState.id }
}

interface IDispatchFromProps{
    outofEditing: () => void
}

const mapDispatchToProps =  (dispatch: Dispatch): IDispatchFromProps => {
    return {
        outofEditing: () => outofCustomerEditing(dispatch)
    }
}

class CustomerComponet extends React.Component<IStateFromProps & IDispatchFromProps, ICustomer> {
    constructor(props: IStateFromProps & IDispatchFromProps){
        super(props)
        this.state = {id: ''} as ICustomer
        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleInvalid = this.handleInvalid.bind(this)
    }

    componentDidMount(){
        this.fetchCustomer(this.props.id)
    }

    handleSave(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        fetch('/api/NorthwindCustomers/'+ this.state.id, {
            body: JSON.stringify(this.state),
            method: 'PUT',
            headers: {
                'content-type':'application/json'
            }
        })
        .then(res =>{
            if(res.ok){
                this.props.outofEditing()
            }
        }).catch(error => console.log(error))
    }

    // class property, no bind is required.
    handleCancel = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.props.outofEditing()
    }

    handleChange(event: React.FormEvent<HTMLInputElement>){
        this.setErrorMessage(event)
        this.setState({[event.currentTarget.name]: event.currentTarget.value} as ICustomer | any);
    }

    handleInvalid(event: React.FormEvent<HTMLInputElement>){
        this.setErrorMessage(event)
    }

    private setErrorMessage(event: React.FormEvent<HTMLInputElement>){
        let msg = event.currentTarget.value? '': event.currentTarget.getAttribute('data-msg')!
        let span = event.currentTarget.nextSibling! as HTMLSpanElement;
        span.innerHTML = msg
        event.currentTarget.setCustomValidity(msg)
    }

    fetchCustomer(id: string){
        if(!id) {
            return
        }
        fetch('/api/NorthwindCustomers/' + id)
        .then(res => res.json())
        .then(json => this.setState(json as ICustomer))
    }

    renderFormItem(item: {customer: ICustomer, idStr: string, title: string, msg: string}){
        return (
            <div className="form-group">
                <div className="col-md-2">
                    <label htmlFor={item.idStr} className="control-label">{item.title}</label>
                </div>
                <div className="col-md-6">
                    <input className="form-control" 
                        name={item.idStr}
                        type="text" 
                        onInvalid={this.handleInvalid}
                        value={item.customer[item.idStr]? item.customer[item.idStr]: ''} 
                        onChange={this.handleChange}
                        placeholder={item.title}
                        data-msg={item.msg}
                        required />
                    <span className="text-danger" id={item.idStr}>
                        {item.customer[item.idStr]? '': item.msg}
                    </span>
                </div>
            </div>           
        )
    }

    render(){
        const c = this.state
        return (
            <div>
                <h2 className="topnewsHeader">Customer Update</h2>
                {c.id &&
                <div className="row alert-info customer-form" style={{borderRadius:"10px"}}>
                    <br/>
                    <form className="form-horizontal" onSubmit={this.handleSave}>
                        {this.renderFormItem({customer:c, idStr: "companyName", title: 'Company Name', msg: 'Please enter company name'})}
                        {this.renderFormItem({customer:c, idStr: "contactName", title: 'Contact Name', msg: 'Please enter contact name'})}
                        {this.renderFormItem({customer:c, idStr: "contactTitle", title: 'Contact Title', msg: 'Please enter contact title'})}
                        {this.renderFormItem({customer:c, idStr: "address", title: 'Address', msg: 'Please enter address'})}
                        {this.renderFormItem({customer:c, idStr: "city", title: 'City', msg: 'Please enter city'})}
                        {this.renderFormItem({customer:c, idStr: "region", title: 'Region', msg: 'Please enter region'})}
                        {this.renderFormItem({customer:c, idStr: "postalCode", title: 'Postal Code', msg: 'Please enter postal code'})}
                        {this.renderFormItem({customer:c, idStr: "country", title: 'Country', msg: 'Please enter country'})}
                        {this.renderFormItem({customer:c, idStr: "phone", title: 'Phone', msg: 'Please enter phone number'})}
                        {this.renderFormItem({customer:c, idStr: "fax", title: 'Fax', msg: 'Please enter fax number'})}
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-success">
                                <i className="glyphicon glyphicon-save" />Save
                            </button>                      
                            <button className="btn btn-primary" onClick={this.handleCancel}>
                                <i className="glyphicon glyphicon-remove-sign" />Cancel
                            </button> 
                        </div>
                        <div className="col-md-9"><br/></div>                    
                    </form>
                </div>
                }
            </div>
        )
    }
}

export const Customer = connect(mapStateToProps, mapDispatchToProps)(CustomerComponet)