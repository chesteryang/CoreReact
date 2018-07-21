import { createStore, combineReducers, applyMiddleware, Middleware} from 'redux'
// import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { composeWithDevTools } from 'redux-devtools-extension'
import { homeReducer, newsReducer} from '../reducers'
import { northwindReducers } from '../northwind/store'
import { IStore } from '../common/types'
import { chinookReducers } from '../chinook/store';
import { loadModels } from '../chinook/actions';

// const middlewares: Middleware[]  = [thunk];
const middlewares: Middleware[]  = []

const reducers = combineReducers<IStore>({
    homeState: homeReducer,
    newsState: newsReducer,
    form: formReducer,
    northwindStates: northwindReducers,
    chinookStates: chinookReducers
})

const store = createStore<IStore>(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
)

loadModels(store.dispatch)

export default store