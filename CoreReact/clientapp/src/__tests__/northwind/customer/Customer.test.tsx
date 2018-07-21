import * as React from 'react'
import { mount } from 'enzyme'
import store from '../../../store'
import { Provider } from 'react-redux'
import { Customer } from '../../../northwind/customer/Customer'
import { enterCustomerEditing } from '../../../northwind/actions';
import { sleep } from '../../utils'

const customers = {
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
    }

// tslint:disable-next-line:no-string-literal
global['fetch'] = require('jest-fetch-mock')
// tslint:disable-next-line:no-string-literal
global['fetch'].mockResponse(JSON.stringify(customers))

it('passes snapshot test', () => {
    // Arrange
    const storeInstance = store
    enterCustomerEditing(store.dispatch, 'ALFKI')

    // Act
    const target = mount(
        <Provider store={storeInstance}>
            <Customer />
        </Provider>
    )
    
    // Assert
    expect(target).toMatchSnapshot()
})

it('populates customers', async () => {
    const storeInstance = store
    enterCustomerEditing(store.dispatch, 'ALFKI')

    // Act
    const target = mount(
        <Provider store={storeInstance}>
            <Customer />
        </Provider>
    )
    await sleep(10)
    target.update()

    // Assert
    expect(target.find('input[name="companyName"]').length).toEqual(1)
    expect(target.find('input[name="contactName"]').length).toEqual(1)
    expect(target.find('input[name="contactTitle"]').length).toEqual(1)
    expect(target.find('input[name="address"]').length).toEqual(1)
    expect(target.find('input[name="city"]').length).toEqual(1)
    expect(target.find('input[name="region"]').length).toEqual(1)
    expect(target.find('input[name="postalCode"]').length).toEqual(1)
    expect(target.find('input[name="country"]').length).toEqual(1)
    expect(target.find('input[name="phone"]').length).toEqual(1)
    expect(target.find('input[name="fax"]').length).toEqual(1)
    expect(target.find('button').length).toEqual(2)
})

it('is out of editing when cancel button is clicked', async () => {
    // Arrange
    const storeInstance = store
    enterCustomerEditing(store.dispatch, 'ALFKI')

    // Act
    const target = mount(
        <Provider store={storeInstance}>
            <Customer />
        </Provider>
    )
    await sleep(10)
    target.update()
    target.find('button.btn-primary').simulate('click')
    const targetState = storeInstance.getState().northwindStates.customerViewState.id
    
    // Assert
    expect(targetState).toEqual('')
})