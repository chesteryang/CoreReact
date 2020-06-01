import { Dispatch } from 'react-redux'
import { 
    HOMEPAGE_LOADED,     
    GET_NEWS_STARTING,
    GET_NEWS_COMPELED } from '../common/actionConstants'

export const homePagedLoaded = (dispatch: Dispatch) => {
    dispatch({
        type: HOMEPAGE_LOADED,
        payload: {
            pageLoaded: true
        }
    })
}

export const getNews = (dispatch : Dispatch) => {
    dispatch({
        type: GET_NEWS_STARTING,
        payload: {
            loading: true,
            news: []
        }
    })

    fetch('/api/SampleData/News')
    .then(res => res.json())
    .then(json => dispatch({
        type: GET_NEWS_COMPELED,
        payload: {
            loading: false,
            news: json.articles
        }
    }))
}

