import { SELECT_CHANGE } from '../actions'

const selectChange = (state = 'Batman', action) => {
  switch (action.type) {
    case SELECT_CHANGE:
      return action.data
    default: 
      return state
  }
}