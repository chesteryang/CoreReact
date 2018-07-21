import * as React from 'react'
import { shallow } from 'enzyme'
import { CustomerComponent } from '../../../northwind/customer/CustomerContainer'
import { ICustomerViewState } from '../../../northwind/common/types';

it('passes snapshot test with empty id', () => {
    // Arrange
    const state: ICustomerViewState = { id: '' }

    // Act
    const target = shallow(<CustomerComponent customerViewState={state} />)

    // Assert
    expect(target).toMatchSnapshot()
})

it('passes snapshot test with an id', () => {
    // Arrange
    const state: ICustomerViewState = { id: '1' }

    // Act
    const target = shallow(<CustomerComponent customerViewState={state} />)

    // Assert
    expect(target).toMatchSnapshot()
})