import * as React from 'react'
import { IHomeState, IStore } from '../common/types'
import { Dispatch, connect } from 'react-redux'
import { homePagedLoaded } from '../actions'
import './Home.css'
import AppComponent from './AppComponent'

interface IDispatchFromProps{
    homePageLoaded: () => void
}

const mapStateToProps = (store: IStore): IHomeState => {
    return store.homeState
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => {
    return {
        homePageLoaded: () => homePagedLoaded(dispatch)
    }
}

export class HomeComponent extends React.Component<IHomeState & IDispatchFromProps, any> {
    displayName = HomeComponent.name
  
    componentDidMount(){
        this.props.homePageLoaded()
    }
    
    render() {
        if(!this.props.pageLoaded){
            return (
                <div>
                    <div className="loading" />
                    <span className="newsloadingText">Home page loading</span>
                </div>
            )
        }
        return (
          <AppComponent />
        )
    }
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent)