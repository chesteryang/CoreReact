import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '../../home/AppComponent'
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('passed snapshot testing', () => {
  expect(mount(<App />)).toMatchSnapshot()
})