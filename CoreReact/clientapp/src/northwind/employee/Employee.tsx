import * as React from 'react'
import { IStore } from '../../common/types'
import { IEmployeeViewState, IEmployee, IEmployeeApi} from '../common/types'
import { Dispatch, connect } from 'react-redux'
import { outofEmployeeEditing, employeeLoaded } from '../actions'
import { reduxForm, Field, Form, SubmissionError, InjectedFormProps } from 'redux-form'

interface IStateFromProps{
    viewState: IEmployeeViewState
    initialValues?: IEmployee
}

interface IApiFromProps{
    save: (item: IEmployeeApi) => Promise<Response>
}
// both mapStateToProps and mapDispatchToProps can take the second augument - TOwnProps
const mapStateToProps = (store: IStore, api: IApiFromProps): IStateFromProps => {
    return { 
        viewState: store.northwindStates.employeeViewState,
        initialValues: store.northwindStates.employeeViewState.employee
     }
}

interface IDispatchFromProps{
    outofEditing: () => void
    loadEmployee: (id: number) => void
}

interface IFormData extends InjectedFormProps<IEmployee>{
    
}

const mapDispatchToProps =  (dispatch: Dispatch): IDispatchFromProps => {
    return {
        outofEditing: () => outofEmployeeEditing(dispatch),
        loadEmployee: (id: number) => employeeLoaded(dispatch, id),
    }
}

class EmployeeComponent extends 
    React.Component<IStateFromProps & IDispatchFromProps & IApiFromProps & IFormData ,  any>{
    constructor(props: IStateFromProps & IDispatchFromProps & IApiFromProps & IFormData ){
        super(props)
        this.state = {serverError: ''}
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    componentDidMount(){
        const viewState = this.props.viewState
        if(viewState.type === 'edit' && !viewState.employee){
            this.props.loadEmployee(viewState.id)
        }
    }

    handleSave(json: IEmployee){
        const viewState = this.props.viewState
        if(viewState.type === 'new'){
            return this.save({url: '/api/NorthwindEmployees/', method: 'POST', data: json })
        }
        if(viewState.type === 'edit'){
            return this.save({url: '/api/NorthwindEmployees/'+ viewState.id, method: 'PUT', data: json})
        }
        return
    }

    private save = (item: IEmployeeApi) => {
        return this.props.save(item)
            .then(res =>{
                if(!res.ok){
                    return res.text()
                }
                this.props.outofEditing()
                return ''
            })
            .then(text => {
                if(text){
                    throw new SubmissionError(JSON.parse(text))
                }
            })
            .catch(error => {
                console.log(error)
                throw error
            })    
    }

    // class property, no bind is required.
    handleCancel = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.props.outofEditing()
    }

    render(){
        return (
            <div>
                <h2 className="topnewsHeader">Employee</h2>
                <div className="container alert-info employee-form" style={{borderRadius:"10px"}}>
                    <br />
                    <Form className="form-horizontal" onSubmit={this.props.handleSubmit(this.handleSave)}>
                        {this.renderFormField({name:'firstName', title:'First Name'})}
                        {this.renderFormField({name:'lastName', title:'Last Name'})}
                        {this.renderFormField({name:'title', title:'Title'})}
                        {this.renderFormField({name:'titleOfCourtesy', title:'Title Of Courtesy'})}
                        {this.renderFormField({name:'birthDate', title:'Birth Date'})}
                        {this.renderFormField({name:'hireDate', title:'Hire Date'})}
                        {this.renderFormField({name:'address', title:'Address'})}
                        {this.renderFormField({name:'city', title:'City'})}
                        {this.renderFormField({name:'region', title:'Region'})}
                        {this.renderFormField({name:'postalCode', title:'Postal Code'})}
                        {this.renderFormField({name:'country', title:'Country'})}
                        {this.renderFormField({name:'homePhone', title:'Home Phone'})}
                        {this.renderFormField({name:'notes', title:'Notes'})}
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <button type="submit" className="btn btn-success" disabled={this.props.invalid}>
                                <i className="glyphicon glyphicon-save" />Save
                            </button>                      
                            <button className="btn btn-primary" onClick={this.handleCancel}>
                                <i className="glyphicon glyphicon-remove-sign" />Cancel
                            </button> 
                        </div>
                        <div className="col-md-9"><br />
                            {this.state.serverError && (
                                <p className="text-danger">{'Server Errors: ' + this.state.serverError}</p>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        )
    }

    renderFormField(item: {name: string, title: string}) {
        return (
            <Field name={item.name}
                component={this.renderField}
                type="text"
                placeholder={item.title} /> 
        )
    }

    renderField = (field: any) => {
        const hasError = !!field.meta.error && !!field.meta.touched;
        const errorClass = hasError? 'invalidInput':'validInput'
        return (
            <div className="form-group" key={field.input.name}>
                <div className="col-md-2">
                    <label className="control-label" htmlFor={field.input.name}>{field.placeholder}</label>
                </div>
                <div className="col-md-8">
                    <input {...field.input} type={field.type} 
                        placeholder={field.placeholder} 
                        className={errorClass + ' form-control'} />
                    {hasError && <span className="text-danger">{field.meta.error}</span>}
                </div>
            </div>
        ) 
    }
}

const validate = (values: any):any => {
    const errors: any = {}
    const {firstName, lastName} = values
    if(!firstName){
        errors.firstName = 'Required, client side validation'
    }

    if(!lastName) {
        errors.lastName = 'Required, client side validtion'
    }

    return errors
}

const Employee = reduxForm(
    { form: 'employee',
      validate,
      
})(EmployeeComponent as any)

export default connect(mapStateToProps, mapDispatchToProps)(Employee)