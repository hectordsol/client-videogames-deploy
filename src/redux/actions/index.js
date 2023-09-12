import axios from 'axios';
//const URL_vieja = "https://hds-videogame-app.herokuapp.com";
//const URL = "https://api-videogame-deploy-production.up.railway.app";
const URL = "https://apivideogames-bm8s.onrender.com";


export const SEARCH_VIDEOGAMES = 'SEARCH_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const SORT_TYPE = 'SORT_TYPE';
export const SORT_BY = 'SORT_BY';
export const FILTER_STORE = 'FILTER_STORE';
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const LOADING_VIDEOGAMES = 'LOADING_VIDEOGAMES';

export function loadingVideogames(payload) {
    return { type: LOADING_VIDEOGAMES, payload: payload };
}
export function changePage(payload) {
    return { type: CHANGE_PAGE, payload: payload };
}

  export function searchVideogames(name) {
    return async (dispatch) =>{
    try{
        const videogames = await axios.get(`${URL}/api/videogames?name=${name}`);
        return dispatch({ type: SEARCH_VIDEOGAMES, payload: videogames.data , loading: false, submit: name});
    } catch(error){
        return dispatch({ type: SEARCH_VIDEOGAMES, payload: [] , loading: false, submit: "Not Found"});
        }
    }
};
export function getVideogameDetail(id) {
  return async (dispatch) => {
    try{
        const videogameDetail = await axios.get(`${URL}/api/videogame/${id}`);
        return dispatch({type: GET_VIDEOGAME_DETAIL, payload: videogameDetail.data });
        }
    catch(error){
        console.log(error.response)
        return dispatch({type: GET_VIDEOGAME_DETAIL, payload: {} });
    }
  }
};
export const clearDetail = () => {
    return {
      type: GET_VIDEOGAME_DETAIL,
      payload: [],
    };
};
export function getGenres() {
    return async function (dispatch) {
        axios.get(`${URL}/api/genres`)
        .then(genres => {
            dispatch({
                type: GET_GENRES,
                payload: genres.data 
            })
        })
    }
};
export function getPlatforms() {
    return async function (dispatch) {
        axios.get(`${URL}/api/platforms`)
        .then(platforms => {
            dispatch({
                type: GET_PLATFORMS,
                payload: platforms.data 
            })
        })
    }
};
export function showStore(payload) { //All - API - DB
    return {
        type: FILTER_STORE,
        payload: payload 
    }
};
export function sortBy(payload) { //unsorted - name - rating
    return {
        type: SORT_BY,
        payload: payload 
    }
};
export function sortType(payload) { //ascending or descending
    return {
        type: SORT_TYPE,
        payload: payload 
    };
};
export function filterByGenres(genre) {
    return {
        type: FILTER_BY_GENRES,
        payload: genre 
    }
};
export function createVideogame (payload) { //Post a new videogame
    return async (dispatch) => {
        try{
    const response = await axios.post(`${URL}/api/videogames`, payload);
            return   dispatch({ type: CREATE_VIDEOGAME, payload: response})
    }   
    catch(error) {console.log(error)}
    };
};
