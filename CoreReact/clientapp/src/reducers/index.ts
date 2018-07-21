import { Reducer } from 'redux'
import { IHomeState, INewsState } from '../common/types'
import { 
    HOMEPAGE_LOADED,
    GET_NEWS_STARTING,
    GET_NEWS_COMPELED} from '../common/actionConstants'

const initialHomeState: IHomeState = {
    pageLoaded: false
}

export const homeReducer: Reducer<IHomeState> = (state = initialHomeState, action: {type: string, payload: IHomeState}) => {
    switch(action.type) {
        case HOMEPAGE_LOADED:
            return action.payload
        default:
            return state
    }
}

const initialNewsState: INewsState = {
    loading: true,
    news: []
}

export const newsReducer: Reducer<INewsState> = (state = initialNewsState, action: {type: string, payload: INewsState}) => {
    switch(action.type){
        case GET_NEWS_STARTING:
            return action.payload
        case GET_NEWS_COMPELED:
            return action.payload;
        default:
            return state
    }
}

