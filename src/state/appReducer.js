const initializeState = {
    city: [
        {
            userCity: '',
            city: 'telaviv',
            WeatherText: '',
            WeatherIcon: '',
            Temperature: ''
        }
    ],
    forecast: [
        {}
    ],
    favorites: []
};

const appReducer = (state = initializeState, action) => {
    switch (action.type) {
        case "GET_CITY":
            debugger;
            let newState = {
                ...state
            };
            (newState.city = action.data);
            (newState.forecast = state.forecast);
            (newState.favorites = state.favorites);
            return newState;
        case "ADD_FAVELIST":
            let newFaveArr = [...state.favorites];
            newFaveArr.push(action.data);
            newState = {
                city: {
                    ...state.city
                },
                favorites: newFaveArr
            };
            return newState;
        case "GET_FAVELIST": newState = {
                ...state
            };
            (newState.favorites = action.data)return newState;
        default:
            return state;
    }
};

export default appReducer;
