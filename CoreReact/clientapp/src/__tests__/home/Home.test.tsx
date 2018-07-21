import * as React from 'react'
import { mount } from 'enzyme'
import store from '../../store'
import { Home } from '../../home/Home'
import { Provider } from 'react-redux'

jest.mock('../../actions')

it('mounts okay', () => {
    // Arrange
    const storeInstance = store
    
    // Act
    const target = mount(
        <Provider store={storeInstance}>
            <Home />
        </Provider>
    )

    // Assert
    expect(target).toMatchSnapshot()
})