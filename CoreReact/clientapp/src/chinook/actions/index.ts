import { Dispatch } from 'react-redux'
import { EMPLOYEES_LOADED, 
    ALBUMS_LOADED, 
    GENRES_LOADED, 
    ARTISTS_LOADED,
    TRACKS_LOADED,
    CUSTOMERS_LOADED,
    ADD_TRACK,
    ADD_ALBUM,
    EMPLOYEE_LOGGED_IN,
    EMPLOYEE_LOGGED_OUT,
    CUSTOMER_SELECTED,
    INVOICES_LOADED,
    CHANGE_VIEW,
    CLEAR_SHOPPINGCART,
    SALERECORD_LOADED} from '../common/constants'
import { ChinookView } from '../common/types'

export const loadModels = (d: Dispatch) => {
    loadEmployees(d)
    loadAlbums(d)
    loadGenres(d)
    loadArtists(d)
    loadTracks(d)
    loadCustomers(d)
    loadInvoices(d)
    loadSaleRecords(d)
}

export const loadEmployees = (d: Dispatch) => load('/api/ChinookEmployees', EMPLOYEES_LOADED, d)
export const loadAlbums = (d: Dispatch) => load('/api/ChinookAlbums', ALBUMS_LOADED, d)
export const loadGenres = (d: Dispatch) => load('/api/ChinookGenres', GENRES_LOADED, d)
export const loadArtists = (d: Dispatch) => load('/api/ChinookArtists', ARTISTS_LOADED, d)
export const loadTracks = (d: Dispatch) => load('/api/ChinookTracks', TRACKS_LOADED, d)
export const loadCustomers = (d: Dispatch) => load('/api/ChinookCustomers', CUSTOMERS_LOADED, d)
export const loadInvoices = (d: Dispatch) => load('/api/ChinookInvoices/Latest', INVOICES_LOADED, d)
export const loadSaleRecords = (d: Dispatch) => load('/api/ChinookSaleRecords', SALERECORD_LOADED, d)


export const addTrack = (dispatch: Dispatch, trackId: number) => {
    dispatch({
        type: ADD_TRACK,
        payload: trackId
    })
}

export const addAlbum = (dispatch: Dispatch, albumId: number) => {
    dispatch({
        type: ADD_ALBUM,
        payload: albumId
    })
}

export const clearShoppingCart = (dispatch: Dispatch) => {
    dispatch({
        type: CLEAR_SHOPPINGCART,
        payload: 0
    })
}

export const employeeLoggedin = (dispatch: Dispatch, employeeId: number) => {
    dispatch({
        type: EMPLOYEE_LOGGED_IN,
        payload: employeeId
    })
}

export const employeeLoggedout = (dispatch: Dispatch) => {
    dispatch({
        type: EMPLOYEE_LOGGED_OUT,
        payload: 0
    })
}

export const selectCustomer = (dispatch: Dispatch, customerId: number) => {
    dispatch({
        type: CUSTOMER_SELECTED,
        payload: customerId
    })
}

export const changeView = (dispatch: Dispatch, view: ChinookView) => {
    dispatch({
        type: CHANGE_VIEW,
        payload: view
    })
} 

const load = (url: string, type: string, d: Dispatch) => {
    fetch(url)
    .then(res => res.json())
    .then(json => d({
        type,
        payload: json
    }))    
}

