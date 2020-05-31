const initialState = [{
    name: 'all',
    isActive: true
  },
  {
    name: 'marked',
    isActive: false
  }
]

export default function tabs(state = initialState, action) {
  if (action.type === 'SELECT_TAB') {
    return action.payload

  }

  return state
}