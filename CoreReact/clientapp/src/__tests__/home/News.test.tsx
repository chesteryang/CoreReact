import * as React from 'react'
import { mount } from 'enzyme'
import store from '../../store'
import { News } from '../../home/News'
import { Provider } from 'react-redux'
import { getNews } from '../../actions'
import { GET_NEWS_COMPELED } from '../../common/actionConstants'

const testNewFeeds = [ {
    "source": {
        "id": "the-washington-post",
        "name": "The Washington Post"
    },
    "author": null,
    "title": "UN human rights chief calls Trump administration's policy on migrant children 'unconscionable'",
    "description": "Criticism comes as U.S. officials contemplate pulling out of U.N. rights panel over perceived anti-Israel bias.",
    "url": "https://www.washingtonpost.com/world/national-security/un-human-rights-chief-calls-trump-administrations-policy-on-migrant-children-unconscionable/2018/06/18/5b833b5a-7306-11e8-b4b7-308400242c2e_story.html",
    "urlToImage": "https://www.washingtonpost.com/resizer/Nh5mXbxU_k5FgmaoO5Yd5QanPiI=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/PZ6JYTDTBII6RNFXGCCAAJBMFY.jpg",
    "publishedAt": "2018-06-18T15:36:09Z"
    }
]

jest.mock('../../actions')

it('mounts with empty news feed', () => {
    // Arrange
    const storeInstance = store

    // Act
    const target = mount(
        <Provider store={storeInstance}>
            <News />
        </Provider>
    )
    const targetState = storeInstance.getState().newsState

    // Assert
    expect(target).toMatchSnapshot()
    expect(targetState.loading).toEqual(true)
    expect(targetState.news.length).toEqual(0)
    expect(getNews).toHaveBeenCalled()
})

it('mounts with news feed', () => {
    // Arrange, dispatch a fixed news feed.
    const storeInstance = store
    const newsPayload = {
        loading: false,
        news: testNewFeeds
    }
    storeInstance.dispatch({
        type: GET_NEWS_COMPELED,
        payload: newsPayload
    })
    
    // Act
    const target = mount(
        <Provider store={storeInstance}>
            <News />
        </Provider>
    )
    const targetState = storeInstance.getState().newsState

    // Assert
    expect(target).toMatchSnapshot() 
    expect(targetState).toBe(newsPayload)
    expect(getNews).toHaveBeenCalled() 
})