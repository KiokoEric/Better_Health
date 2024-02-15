import { createContext, useContext, useState, useReducer } from "react";

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext)

    if (context === undefined) {
        throw new Error('App context must be within App context provider. ')
    }
    return context
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true, user: action.payload };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null };
        case 'ADD_FAVORITE':
            return {
                ...state,
                user: { ...state.user, favorites: [...state.user.favorites, action.payload] },
            };
        default:
            return state;
    }
};


const AppContextProvider = ({children}) => {

    const[Favourites, setFavourites]= useState([])

    const [authState, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
    });

    const Login = (user) => {
        dispatch({ type: 'LOGIN', payload: user });
    };

    const Logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const AddToFavourites = (Item) => {
        const OldFavourites = [...Favourites]
        const NewFavourites = OldFavourites.concat(Item);
        setFavourites(NewFavourites)
    }

    const RemoveFromFavourites = (name) => {
        const OldFavourites = [...Favourites]
        const NewFavourites = OldFavourites.filter((Exercise) => Exercise.name !== name)
        setFavourites(NewFavourites)
    }

    return (
        <AppContext.Provider value={{...authState, Login, Logout, Favourites, AddToFavourites, RemoveFromFavourites}} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

