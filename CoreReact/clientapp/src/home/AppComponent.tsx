import * as React from 'react'
import './AppComponent.css'

class AppComponent extends React.Component {
  public render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to Asp.net Core React</h1>
        </header>
        <div>
          <br />
          <p className="App-intro">To build with</p>
          <ul>
            <li><a href="https://get.asp.net/">ASP.NET Core</a> and <a href="https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx">C#</a> for cross-platform server-side code</li>
            <li><a href="https://facebook.github.io/react/">React</a> for client-side code</li>
            <li><a href="https://visualstudio.microsoft.com/">Visual Studio</a> 2017 and Code for IDE support</li>
            <li><a href="https://redux.js.org/">Redux</a> for client-side state container</li>
            <li><a href="http://typescriptlang.org/">Typescript</a> for client-side code types</li>
            <li><a href="http://getbootstrap.com/">Bootstrap</a> for layout and styling</li>
            <li><a href="https://docs.microsoft.com/en-us/ef/core/">Entity Framework Core</a> for database support</li>
            <li><a href="https://redux-form.com/7.4.0/">Redux Form</a> for form support. Form function include html 5 built-in validation, redux form server and client validations. Server validation uses Asp.net mvc data annotation validation</li>
            <li><a href="https://react-table.js.org/">React Table</a> for list support</li>
            <li><a href="https://xunit.github.io/">xunit</a> for server side unit testing with debugging support</li>
            <li><a href="https://facebook.github.io/jest/">Jest</a> and <a href="https://github.com/airbnb/enzyme">enzyme</a> for client side unit testing with debugging support</li>
            <li><a href="/swagger" target="_blank">My Api doc</a> for server api access powered by <a href="https://swagger.io/">Swagger</a></li>
            <li>
              <a href="https://github.com/chesteryang/CoreReact">Source code</a>  on Github <img width={22} src="https://avatars2.githubusercontent.com/u/7731284?v=4" alt="avatar"/>
            </li>
          </ul>          
        </div>
      </div>
    )
  }


}

export default AppComponent;
