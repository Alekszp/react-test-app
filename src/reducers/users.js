const initialState = []

export default function userList(state = initialState, action){
    if(action.type === 'MARK_USER'){
      return action.payload

    } else if (action.type === 'GET_USERS'){
        return [
            ...state,
            ...action.payload
        ]
    } 

    return state
  }