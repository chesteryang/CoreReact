import { INorthwindStates } from "../northwind/common/types";
import { IChinookStates } from "../chinook/common/types";

export interface IHomeState{
    pageLoaded: boolean
} 

export interface IStore{
    homeState: IHomeState
    newsState: INewsState
    northwindStates: INorthwindStates
    chinookStates: IChinookStates
}

export interface INewsSource
{
    id: string
    name: string
}

export interface INews{
    source: INewsSource
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: Date
}

export interface INewsState{
    loading: boolean
    news: INews[]
}
