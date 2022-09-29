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
    storeType: 'all',
    sortBy: 'unsorted',
    sortType: 'asc',
    loading: false,
    submit:'',
};

export default function reducer(state = initialState, action) {
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
    case  FILTER_STORE: {
        const withoutFilter = [ ...state.videogames];
        const filtered = action.payload === "all"
        ? withoutFilter
        : withoutFilter.filter((videogame) => videogame.source===action.payload);
        console.log("sort by ",state.sortBy);
        console.log("sort type ",state.sortType);
            return {
                ...state,
                videogamesToShow: filtered,
                storeType: action.payload
            };
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
    case SORT_TYPE:  //Asc, desc
        var videogamesSortedType = [...state.videogamesToShow];
            videogamesSortedType = Sort(videogamesSortedType, state.sortBy, action.payload);
            return {
                ...state,
                videogamesToShow: videogamesSortedType,
                sortType: action.payload
            };          
    case SORT_BY:  //name or rating
        const videogames = [ ...state.videogamesToShow];
        const sortedBy = action.payload === "unsorted" 
            ? videogames
            :Sort(videogames, action.payload, state.sortType);
            return {
                ...state,
                videogamesToShow: sortedBy,
                sortBy: action.payload
            };
    case  FILTER_BY_GENRES : {
        const withoutFilter = state.videogames;
        const filtered =
          action.payload === "all"
            ? withoutFilter
            : withoutFilter.filter((videogame) => videogame.genres.includes(action.payload));
        return {
          ...state,
          videogamesToShow: filtered,
        };  
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
     default: return {...state};
    }
}