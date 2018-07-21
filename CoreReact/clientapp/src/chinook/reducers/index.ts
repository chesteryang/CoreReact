import { Reducer } from 'redux'
import * as _ from 'lodash'
import { IEmployee, IAlbum, IGenre, IArtist, ITrack, ICustomer, IShoppingCart, IInvoice, ChinookView, ISaleRecord } from '../common/types'
import { EMPLOYEES_LOADED, 
    ALBUMS_LOADED, 
    GENRES_LOADED, 
    ARTISTS_LOADED, 
    TRACKS_LOADED,
    CUSTOMERS_LOADED,
    ADD_TRACK,
    ADD_ALBUM,
    REMOVE_TRACK,
    REMOVE_ALBUM,
    EMPLOYEE_LOGGED_IN,
    EMPLOYEE_LOGGED_OUT,
    CUSTOMER_SELECTED,
    INVOICES_LOADED,
    CHANGE_VIEW,
    CLEAR_SHOPPINGCART,
    SALERECORD_LOADED} from '../common/constants'

const initEmployeesState: IEmployee[] = []

export const employeesReducer: Reducer<IEmployee[]> = 
    (state = initEmployeesState, action: {type: string, payload: IEmployee[]}) => {
        switch(action.type){
            case EMPLOYEES_LOADED:
                return action.payload;
            default:
                return state;
        }
    }

const initAlbumsState: IAlbum[] = []

export const albumsReducer: Reducer<IAlbum[]> = 
    (state = initAlbumsState, action: {type: string, payload: IAlbum[]}) => {
        switch(action.type){
            case ALBUMS_LOADED:
                return action.payload;
            default:
                return state;
        }
    }

const initGenresState: IGenre[] = []
export const genresReducer: Reducer<IGenre[]> = 
    (state = initGenresState, action: {type: string, payload: IGenre[]}) => {
        switch(action.type){
            case GENRES_LOADED:
                return action.payload;
            default:
                return state;
        }
    }

const initArtistsState: IArtist[] = []
export const artistsReducer: Reducer<IArtist[]> = 
    (state = initArtistsState, action: {type: string, payload: IArtist[]}) => {
        switch(action.type){
            case ARTISTS_LOADED:
                return action.payload;
            default:
                return state;
        }
    }

const initTracksState: ITrack[] = []
export const tracksReducer: Reducer<ITrack[]> = 
    (state = initTracksState, action: {type: string, payload: ITrack[]}) => {
        switch(action.type){
            case TRACKS_LOADED:
                return action.payload;
            default:
                return state;
        }
    }

const initCustomersState: ICustomer[] = []
export const customersReducer: Reducer<ICustomer[]> = 
    (state = initCustomersState, action: {type: string, payload: ICustomer[]}) => {
        switch(action.type){
            case CUSTOMERS_LOADED:
                return action.payload;
            default:
                return state;
        }
    }

const initShoppingCartState: IShoppingCart = {
    trackIds: [],
    albumIds: []
}

export const shoppingCartReducer: Reducer<IShoppingCart> =
    (state = initShoppingCartState, action: {type: string, payload: number}) => {
        switch(action.type){
            case ADD_TRACK:
                state.trackIds = _.union(state.trackIds, [action.payload])
                return state
            case ADD_ALBUM:
                state.albumIds = _.union(state.albumIds, [action.payload])
                return state
            case REMOVE_TRACK:
                state.trackIds = _.filter(state.trackIds, (t) => t !== action.payload)
                return state
            case REMOVE_ALBUM:
                state.albumIds = _.filter(state.albumIds, (a) => a !== action.payload)
                return state
            case CLEAR_SHOPPINGCART:
                state.trackIds = []
                state.albumIds = []
                return state
            default:
                return state
        }
    }

export const loggedInEmployeeReducer: Reducer<number> =
    (state = 0, action: {type: string, payload: number}) => {
        switch(action.type){
            case EMPLOYEE_LOGGED_IN:
                return action.payload
            case EMPLOYEE_LOGGED_OUT:
                return action.payload
            default:
                return state
        }
    }

export const customerSelectedReducer: Reducer<number> =
    (state = 0, action: {type: string, payload: number}) => {
        switch(action.type){
            case CUSTOMER_SELECTED:
                return action.payload
            default:
                return state
        }
    }

const initInvoiceState: IInvoice[] = []

export const invoiceReducer: Reducer<IInvoice[]> = 
    (state = initInvoiceState, action: {type: string, payload: IInvoice[]}) => {
        switch(action.type){
            case INVOICES_LOADED:
                return action.payload
            default:
                return state
        }
    }

export const chinookViewReducer: Reducer<ChinookView> =
    (state = 'store', action: {type: string, payload: ChinookView}) => {
        switch(action.type){
            case CHANGE_VIEW:
                return action.payload
            default:
                return state
        }
    }

const initSaleRecordsState: ISaleRecord[] = []

export const saleRecordsReducer: Reducer<ISaleRecord[]> =
    (state = initSaleRecordsState, action: {type: string, payload: ISaleRecord[]}) => {
        switch(action.type){
            case SALERECORD_LOADED:
                return action.payload
            default:
                return state
        }
    }