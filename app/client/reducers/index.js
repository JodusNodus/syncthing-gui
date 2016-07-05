import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { connected, myID, devices, folders, power, preferences } from '../../main/reducers.js'
import { folderFiles } from './fs'
import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  routing,
  connected,
  myID,
  devices,
  folders,
  power,
  preferences,
  form,
  folderFiles,
})

export default rootReducer
