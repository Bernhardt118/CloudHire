import { stat } from "fs";

const initState = {
    token: sessionStorage.getItem("token"),
    user: sessionStorage.getItem("user"),
    hasfilter: false,
    username : sessionStorage.getItem("username"),
    data_is_set: sessionStorage.getItem("data_is_set")
}

const rootReducer = (state = initState, action) => {
    //console.log(action);
    if (action.type === 'SET_DATA') {
        return {
            token: action.token,
            user: action.user,
            hasfilter: state.hasfilter,
            username : action.username,
            data_is_set: state.data_is_set
        }
    }

    if (action.type === 'SET_HAS_FILTER') {
        //console.log(action);
        return {
            token: state.token,
            user: state.user,
            hasfilter: action.hasfilter,
            username : state.username,
            data_is_set: state.data_is_set
        }
    }

    if (action.type === 'CLEAR_TOKEN') {
        return {
            token: "",
            user: state.user,
            hasfilter: state.hasfilter,
            username : state.username,
            data_is_set: state.data_is_set
        }
    }

    if (action.type === 'DATA_IS_SET') {
        return {
            token: state.token,
            user: state.user,
            hasfilter: state.hasfilter,
            username : state.username,
            data_is_set: action.date_is_set
        }
    }

    // if (action.type === 'SET_USER') {
    //     return {
    //         token: state.token,
    //         user: action.user
    //     }
    // }
    return state;
}

export default rootReducer;

//sessionStorage.getItem("token")