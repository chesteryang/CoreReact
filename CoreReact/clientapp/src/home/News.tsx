import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { IStore, INewsState, INews } from '../common/types'
import { getNews } from '../actions'
import './News.css'

interface IDispatchFromProps{
    getNews: () => void
}

const mapStateToProps = (store: IStore): INewsState => {
    return store.newsState 
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => {
    return {
        getNews: () => getNews(dispatch)
    }
}

class NewsComponent extends React.Component<INewsState & IDispatchFromProps, any>{
    displayName = NewsComponent.name
   
    componentDidMount(){
        this.props.getNews()
    }

    replaceHttp = (url: string) => {
        if(url) {
            url = url.replace('http://', 'https://')
        }
        return url
    }

    render(){
        const { loading, news } = this.props
        const title = <h2 className="topnewsHeader">News</h2> 
        if(!news || loading){
            return(
                <div>
                    {title}
                    <br/><br/><br/>
                    <div className="loading" />              
                    <span className="newsloadingText">News is loading</span>
                </div>
            )
        }
        return (
            <div className="newsBackground">
                {title}
                { !loading && news.length > 0 &&
                    <div>
                        {news.map((article:INews, index:number) => (
                            <div className="newsPanel" key={index}>
                                <a href={article.url} target="_blank">
                                    <div className="newsHeader">
                                        <span className="newsSource">{article.source.name}</span>
                                        <span className="newsDate">{new Date(article.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="newsPanelBackground" style={{backgroundImage: `url(${this.replaceHttp(article.urlToImage)})`}} />
                                    <h4 className="newsTitle">{article.title}</h4>
                                    <p className="newsDescription">{article.description}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

export const News = connect(mapStateToProps, mapDispatchToProps)(NewsComponent)