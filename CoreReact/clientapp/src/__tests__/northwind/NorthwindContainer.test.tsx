import * as React from 'react'
import { shallow } from 'enzyme'
import { NorthwindContainerComponent } from '../../northwind/NorthwindContainer'

it('passes snapshot test', () => {
    // Arrange
    // tslint:disable-next-line:no-empty
    const f = () => {}
    // Act
    const target = shallow(<NorthwindContainerComponent tabChanged={f} />)

    // Assert
    expect(target).toMatchSnapshot()
})