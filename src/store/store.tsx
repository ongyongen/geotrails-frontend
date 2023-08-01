import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../counterSlice'
import geocachesTableSliceReducer from '../pages/GeocachesPage/GeocachesTable/geocachesTableSlice'
import ProfileSliceReducer from '../pages/Profile/ProfileSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    geocachesTable: geocachesTableSliceReducer,
    Profile: ProfileSliceReducer
  },
})

