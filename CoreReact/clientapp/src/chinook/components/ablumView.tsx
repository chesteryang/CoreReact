import * as React from 'react'
import { IChinookStates } from '../common/types'
import { IStore } from '../../common/types'
import { connect, Dispatch } from 'react-redux'
import { addAlbum, addTrack } from '../actions'

interface ISelectedAlbum{
    albumId: number
    onAdd: () => void
}

const mapStateToProps = (store: IStore): IChinookStates => {
    return store.chinookStates
}
interface IDispatchFromProps{
    addTrack: (id: number) => void
    addAlbum: (id: number) => void
}

const mapDispatchToProps =  (dispatch: Dispatch): IDispatchFromProps => {
    return {
        addTrack: (id) => addTrack(dispatch, id),
        addAlbum: (id) => addAlbum(dispatch, id)    
    }
}
class AlbumViewComponent extends React.Component<IChinookStates & IDispatchFromProps & ISelectedAlbum, any> {
    render(){
        const albumId = Number(this.props.albumId)
        if(albumId <= 0) {
            return <div />
        }
        const album = this.props.albumsState.find(a => a.albumId === albumId)
        if(!album){
            return <div />
        }
        const artists = this.props.artistsState.filter(a => a.artistId === album.artistId)
        const tracks = this.props.tracksState.filter(t => t.albumId === albumId)
        return (
            <div>
                <h3>{album.title}</h3>
                {artists.map(a =>(
                    <h5 key={a.artistId}>Artist: {a.name}</h5>
                ))}
                <br/>
                <table className='table table-striped'>
                    <thead className='alert-info'>
                        <tr>
                            <th>Name</th>
                            <th>Composer</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>
                                <button className='btn btn-success' 
                                    id={albumId.toString()} 
                                    onClick={this.onAlbumOrder}>
                                    <i className="glyphicon glyphicon-shopping-cart" />Order All
                                </button> 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {tracks.map(t => (
                        <tr key={t.trackId}>
                            <td>{t.name}</td>
                            <td>{t.composer}</td>
                            <td>{this.getGenre(t.genreId)}</td>
                            <td>{t.unitPrice}</td>
                            <td>
                                <button className='btn btn-default' 
                                    id={t.trackId.toString()} 
                                    onClick={this.onOrder}>
                                    <i className="glyphicon glyphicon-shopping-cart" />Order
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>           
            </div>
        )
    }

    getGenre = (id: number) => {
        const genre = this.props.genresState.find(g => g.genreId === id)
        return genre ? genre.name: ''
    }

    onOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.addTrack(Number(e.currentTarget.id))
        this.props.onAdd()
    }

    onAlbumOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        this.props.addAlbum(Number(e.currentTarget.id))
        this.props.onAdd()
    }
}

export const AlbumView = connect(mapStateToProps, mapDispatchToProps)(AlbumViewComponent)