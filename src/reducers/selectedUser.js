const initialState = false

export default function selectedUser(state = initialState, action){
  
    if(action.type === 'SELECT_USER'){
      return action.payload
    }
    return state
  }