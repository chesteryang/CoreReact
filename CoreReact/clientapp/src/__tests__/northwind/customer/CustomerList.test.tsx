import * as React from 'react'
import { mount } from 'enzyme'
import store from '../../../store'
import { Provider } from 'react-redux'
import { CustomerList } from '../../../northwind/customer/CustomerList'

const customers = [
    {
      "id": "ALFKI",
      "companyName": "Alfreds Futterkiste",
      "contactName": "Maria Anders",
      "contactTitle": "Sales Representative",
      "address": "Obere Str. 57",
      "city": "Berlin",
      "region": "Western Europe",
      "postalCode": "12209",
      "country": "Germany",
      "phone": "030-0074321",
      "fax": "030-0076545"
    }]

// tslint:disable-next-line:no-string-literal
global['fetch'] = require('jest-fetch-mock')

it('passes snapshot test', () => {
    // Arrange
    const storeInstance = store
    // tslint:disable-next-line:no-string-literal
    global['fetch'].mockResponseOnce(JSON.stringify(customers))

    // Act
    const target = mount(
        <Provider store={storeInstance}>
            <CustomerList />
        </Provider>
    )

    // Assert
    expect(target).toMatchSnapshot()
})