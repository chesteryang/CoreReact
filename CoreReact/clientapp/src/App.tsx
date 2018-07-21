import * as React from 'react'
import { Route } from 'react-router'
import {Provider } from 'react-redux'
import store from './store'
import { Layout } from './home/Layout'
import { Home } from './home/Home'
import { News } from './home/News'
import { NorthwindContainer } from './northwind/NorthwindContainer'
import { ChinookContainer } from './chinook/ChinookContainer'
import { AdminContainer } from './chinook/admin/AdminContainer'
import { EmployeeContainer } from './chinook/employee/EmployeeContainer'
import { ScaffoldContainer } from './scaffold/ScaffoldContainer'
import './App.css'


class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Layout>
          <Route exact path='/' component={Home} />          
          <Route path='/news' component={News} />
          <Route path='/northwind' component={NorthwindContainer} />
          <Route exact path='/chinook' component={ChinookContainer} />
          <Route path='/chinook/admin' component={AdminContainer} />
          <Route path='/chinook/employee' component={EmployeeContainer} />
          <Route path='/scaffold' component={ScaffoldContainer} />
        </Layout>
      </Provider>
    );
  }
}

export default App
