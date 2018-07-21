import * as React from 'react'
import { shallow } from 'enzyme'
import { EmployeeContainerComponent } from '../../../northwind/employee/EmployeeContainer'
import { IEmployeeViewState } from '../../../northwind/common/types';

it('passes snapshot tests with list view', () => {
    // Arrange
    const state = {type: 'list'} as IEmployeeViewState

    // Act
    const target = shallow(<EmployeeContainerComponent employeeViewState={state} />)

    // Assert
    expect(target).toMatchSnapshot()
})

it('passes snapshot tests with new view', () => {
    // Arrange
    const state = {type: 'new'} as IEmployeeViewState

    // Act
    const target = shallow(<EmployeeContainerComponent employeeViewState={state} />)

    // Assert
    expect(target).toMatchSnapshot()
})