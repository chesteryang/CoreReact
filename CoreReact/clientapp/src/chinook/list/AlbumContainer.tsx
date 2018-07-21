import * as React from 'react'
import { IStore } from '../../common/types'
import { IAlbum, IChinookStates } from '../common/types'
import { connect, Dispatch } from 'react-redux'
import { AlbumView } from '../components/ablumView'
import './AlbumContainer.css'
import { ShoppingCart } from '../components/shoppingcart'
import { EmployeeView } from '../components/employeeView'
import { CustomerView } from '../components/customerView'
import { changeView } from '../actions';

interface IState{
    albumId: number
}
interface IStateFromProps{
    albums: IAlbum[]
    chinookStates: IChinookStates
}

const mapStateToProps = (store: IStore): IStateFromProps => {
    return {
        albums: store.chinookStates.albumsState,
        chinookStates: store.chinookStates
    }
}

interface IDispatchFromProps{
    checkout: () => void
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => {
    return {
        checkout: () => changeView(dispatch, 'checkout')
    }
}
class AlbumContainerComponent extends React.Component<IStateFromProps & IDispatchFromProps, IState> {
    constructor(props: IStateFromProps & IDispatchFromProps) {
        super(props);
        this.state = {albumId: 1};
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this)
    }
    
    handleChange(event: any) {
        event.preventDefault();
        this.setState({albumId: event.target.id});
    }

    handleAdd(){
        this.setState({albumId: this.state.albumId})
        // this.forceUpdate()
    }

    render(){
        const { albums, chinookStates } = this.props
        return (
            <div className='container-fluid'>
                <div className="row firstRow">
                    <div className="col-sm-4">
                        <EmployeeView />
                    </div>
                    <div className='col-sm-4'>
                        <CustomerView />
                    </div>
                    <div className="col-sm-4">
                        <ShoppingCart chinookStates={chinookStates} 
                            checkout={this.props.checkout}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-3 listPanel'>
                        <div className='list-group'>
                            <h4>Albums</h4>
                            {albums.map(a => 
                                <button className='list-group-item' 
                                    key={a.albumId} 
                                    onClick={this.handleChange} 
                                    id={a.albumId.toString()}>{a.title}</button>
                            )}
                        </div>
                    </div>
                    <div className='col-sm-9'>
                        <AlbumView albumId={this.state.albumId} onAdd={this.handleAdd} />
                    </div>
                </div>
            </div>
        )
    }
}

export const AlbumContainer = connect(mapStateToProps, mapDispatchToProps)(AlbumContainerComponent)