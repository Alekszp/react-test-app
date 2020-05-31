const initialState = false

export default function loading(state = initialState, action){
    if(action.type === 'LOADING'){
      return action.payload

    } 
    return state
  }