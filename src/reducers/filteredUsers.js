const initialState = ''

export default function filterUserList(state = initialState, action){
    if(action.type === 'FILTER_USERS'){
      return action.payload
    } 
    return state
  }