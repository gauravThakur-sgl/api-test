import { configureStore} from '@reduxjs/toolkit'
import fetchReducer from '../features/reducers'


export default configureStore({
    reducer: {
        users: fetchReducer
    }
})
