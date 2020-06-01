import { Dispatch } from "react-redux";
import {
  HOMEPAGE_LOADED,
  GET_NEWS_STARTING,
  GET_NEWS_COMPELED,
} from "../common/actionConstants";

export const homePagedLoaded = (dispatch: Dispatch) => {
  dispatch({
    type: HOMEPAGE_LOADED,
    payload: {
      pageLoaded: true,
    },
  });
};

export const getNews = (dispatch: Dispatch) => {
  dispatch({
    type: GET_NEWS_STARTING,
    payload: {
      loading: true,
      news: [],
    },
  });

  fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=4f9333875c98436787fa163b2604664a"
  )
    .then((res) => res.json())
    .then((json) =>
      dispatch({
        type: GET_NEWS_COMPELED,
        payload: {
          loading: false,
          news: json.articles,
        },
      })
    );
};
