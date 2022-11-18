import { 
    //  GET_VIDEOGAMES ,
     SEARCH_VIDEOGAMES ,
     GET_VIDEOGAME_DETAIL,
     GET_GENRES,
     GET_PLATFORMS,
     SORT_TYPE,
     SORT_BY ,
     FILTER_STORE,
     FILTER_BY_GENRES ,
     CREATE_VIDEOGAME ,
     CHANGE_PAGE ,
     LOADING_VIDEOGAMES, 
     } 
from "../actions";

function Sort(arr,by,type){//by=name,rating, type=asc,des
    if(type==="asc"){ return SortAsc(arr,by)}
    else 
       if(type==="des"){ return SortDes(arr,by) }
}
function SortAsc(arr, orderBy) {//orderBy=name, rating
    return arr.sort(function (a, b) {
        if (orderBy==="name")
            {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            }
        else
            {
                if (a[orderBy] > b[orderBy]) return 1; 
                if (a[orderBy] < b[orderBy]) return -1;
                return 0;
             }
    });
};
function SortDes(arr, orderBy) {//orderBy=name, rating
    return arr.sort(function (a, b) {
        if (orderBy==="name")
        {
            if (a.name.toLowerCase() < b.name.toLowerCase()) 
            { return 1;  }
            if (a.name.toLowerCase() > b.name.toLowerCase()) 
            { return -1;  }
            return 0;
        }
    else
        {
        if (a[orderBy] < b[orderBy]) { return 1;  }
        if (a[orderBy] > b[orderBy]) { return -1;}
        return 0;
        }
    });
};

// REDUCER -----------------------------------------------------------------------------------
const initialState = {
    videogames: [],
    videogamesToShow: [],
    currentPage:1,
    videogamesForPage:15,
    videogameDetail: {},
    genres: [],
    platforms: [],
    show: {source:'all',by:'unsorted',orderType:'asc',filter:'none'},
    loading: false,
    submit:'',
};

export default function reducer(state = initialState, action) {
    let filtered;
    switch (action.type) {
    case SEARCH_VIDEOGAMES: 
        return {
            ...state,
            videogames: action.payload,
            videogamesToShow: action.payload,
            loading: action.loading,
            submit: action.submit,
        };
    case  CREATE_VIDEOGAME: {
            return {
                ...state,
            }
        }
    case GET_VIDEOGAME_DETAIL: 
            return {
                ...state,
                videogameDetail: action.payload,
            };
    case  GET_GENRES: 
            return {
                ...state,
                genres: action.payload,
            };
    case  GET_PLATFORMS: 
            return {
                ...state,
                platforms: action.payload,
            };
            case CHANGE_PAGE: 
            return {
                ...state,
                currentPage: action.payload,
            };    
        case LOADING_VIDEOGAMES: 
            return {
                ...state,
                loading: action.payload,
            };
        case  FILTER_STORE: 
        filtered = state.videogames;
        console.log("store ",state.show);
        filtered = action.payload === "all"    //all,api,db
        ? filtered : filtered.filter((videogame) => videogame.source===action.payload);
        filtered = state.show.filter ==='none'
        ?filtered: filtered.filter((videogame)=> videogame.genres.includes(state.show.filter));
        filtered = state.show.by ==='unsorted'  //unsorted,name,rating
        ?filtered: Sort(filtered, state.show.by, state.show.orderType);
            return {
                ...state,
                videogamesToShow: filtered, loading: false,
                show: {...state.show, source: action.payload} //all, api, db
            };
        
    case SORT_TYPE:  //Asc, desc
        filtered = state.videogames;
        console.log("type ",state.show);
        filtered = state.show.source === "all"  //all, api, db
        ? filtered : filtered.filter((videogame) => videogame.source===state.show.source);
        filtered = state.show.filter ==='none'
        ? filtered: filtered.filter((videogame)=> videogame.genres.includes(state.show.filter));
        filtered = Sort(filtered, state.show.by, action.payload);
            return {
                ...state,
                videogamesToShow: filtered, loading: false,
                show: {...state.show, orderType: action.payload}
            };      
            
    case SORT_BY:  //unsorted or name or rating
        filtered = state.videogames;
        console.log("by ",state.show,"payload ",action.payload);
        filtered = state.show.source === "all"  //all, api, db
        ? filtered : filtered.filter((videogame) => videogame.source===state.show.source);
        filtered = state.show.filter ==='none'
        ?filtered : filtered.filter((videogame)=> videogame.genres.includes(state.show.filter));
        filtered = action.payload==='unsorted'
        ?filtered : Sort(filtered, action.payload, state.show.orderType);
            return {
                ...state,
                videogamesToShow: filtered, loading: false,
                show: {...state.show, by: action.payload}
            };
    
    case  FILTER_BY_GENRES : 
        filtered = state.videogames;
        console.log("generes ",state.show);
        filtered = state.show.source === "all"  //all, api, db
        ? filtered : filtered.filter((videogame) => videogame.source===state.show.source);
        filtered = action.payload ==='none'
        ?filtered : filtered.filter((videogame)=> videogame.genres.includes(action.payload));
        filtered=state.show.by==='unsorted'
        ?filtered : Sort(filtered, state.show.by, state.show.orderType);
            return {
                ...state,
                videogamesToShow: filtered, loading: false,
                show: {...state.show, filter: action.payload}
            };  
    
    default: return {...state};
    }
}