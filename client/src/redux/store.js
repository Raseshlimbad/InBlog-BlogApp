import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

// redux-persist to store data from states to local storage/browser
const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    //inition/basic run
    // reducer: {
    //     user: userReducer,
    // },
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)