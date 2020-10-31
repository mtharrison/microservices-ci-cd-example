import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'


const configureStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk, createLogger()),
        )
    )

    return store
}

export default configureStore
