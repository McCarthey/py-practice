export const REQUEST_START = 'REQUEST_START'
export const REQUEST_DONE = 'REQUEST_DONE'
export const SELECT_CHANGE = 'SELECT_CHANGE'
export const INVALIDATE = 'INVALIDATE'

export const selectChange = option => ({
  type: SELECT_CHANGE,
  data: option 
})