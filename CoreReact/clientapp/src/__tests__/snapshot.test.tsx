import * as React from 'react'
import Snapshot from '../home/snapshot'
import { shallow, mount } from 'enzyme'

it('passed snapshot test using enzyme shallow', () => {
    const component = shallow(<Snapshot />)
    expect(component).toMatchSnapshot()
})

it('passed snapshot test using enzyme mount', () => {
    const component = mount(<Snapshot />)
    expect(component).toMatchSnapshot()
})