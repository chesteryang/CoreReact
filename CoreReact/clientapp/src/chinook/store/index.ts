import { combineReducers } from "redux"
import { employeesReducer, 
    albumsReducer, 
    artistsReducer,
    genresReducer,
    tracksReducer,
    customersReducer,
    shoppingCartReducer,
    loggedInEmployeeReducer,
    customerSelectedReducer, 
    invoiceReducer,
    chinookViewReducer,
    saleRecordsReducer} from "../reducers"
import { IChinookStates } from "../common/types"

export const chinookReducers = combineReducers<IChinookStates>({
    employeesState: employeesReducer,
    albumsState: albumsReducer,
    artistsState: artistsReducer,
    genresState: genresReducer,
    tracksState: tracksReducer,
    customersState: customersReducer,
    invoicesState: invoiceReducer,
    saleRecordsState: saleRecordsReducer,
    shoppingCart: shoppingCartReducer,
    loggedInEmployeeId: loggedInEmployeeReducer,
    selectedCustomerId: customerSelectedReducer,
    viewState: chinookViewReducer
})

