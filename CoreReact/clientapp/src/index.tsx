import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string
const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement
)
registerServiceWorker()
