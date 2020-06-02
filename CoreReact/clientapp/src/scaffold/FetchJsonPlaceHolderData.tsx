import * as React from 'react';
import * as JSONPretty from 'react-json-pretty';
import './FetchJsonPlaceHolderData.css'

interface IPost{
    userId: number,
    id: number,
    title: string,
    body: string
}

interface IState{
    loaded: boolean,
    posts: IPost[]
}

const initialState: IState = {
    loaded: false,
    posts: []
}

const url = '/api/SampleData/Posts';

export class FetchJsonPlaceHolderData extends React.Component<any, IState>{
    constructor(props: any){
        super(props);
        this.state = initialState;
        this.getData = this.getData.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    getData() {
        fetch(url)
            .then(response => response.json())
            .then(json => this.setState({ loaded: true, posts: json }));
    }

    clearData(){
        this.setState(initialState);
    }

    private renderTable = (posts: IPost[]) => {
        return (
            <div className="json-place-data">
            <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>User Id</th>
                <th>Title</th>
                <th>Post</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post =>
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        );
    }
    
    render(){
        return(
            <div>
                <h4>Json Place Holder Posts (Url: {url})</h4>
                <button disabled={this.state.loaded} className={'btn btn-primary'} onClick={this.getData}>Get Posts Data</button>            
                <button disabled={!this.state.loaded} className={'btn btn-info'} onClick={this.clearData}>Clear Data</button> 
                {this.state.loaded &&
                    <div>
                        {this.renderTable(this.state.posts)}
                        <JSONPretty className="alert alert-info json-pretty" id="json-pretty" json={this.state.posts} />
                    </div>
                }
            </div>        
        );
    }
}