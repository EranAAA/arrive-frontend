const initialState = {
   stops: [],
   routs: [],
   results: [],
   routes: [],
   siri: [],
   siriLastCall: '',
   filter: {},
   count: 0
}

export function arriveReducer(state = initialState, action) {
   var newState = state
   // var arrives

   switch (action.type) {
      case 'SET_ARRIVES':
         const stops = action.arrives[0]
         const routs = action.arrives[1]
         // const stopsTime = action.arrives[2]
         newState = { ...state, stops, routs, /*stopsTime*/ }
         break

      case 'SET_RESULTS':
         newState = { ...state, results: action.results }
         break

      case 'SET_FILTER':
         newState = { ...state, filter: action.filter }
         break

      case 'SET_ROUTES':
         newState = { ...state, routes: action.routes }
         break

      case 'UPDATE_ROUTE':
         newState = { ...state, routes: [...state.routes, action.route] }
         break

      case 'SET_SIRI':
         newState = { ...state, siri: action.siri }
         break

      case 'COUNT_CALLS':
         newState = { ...state, count: state.count + 1 }
         break

      case 'SET_SIRI_LAST_CALLS':
         newState = { ...state, siriLastCall: Date.now() }
         break

      default:
   }
   // For debug:
   window.arriveState = newState
   return newState

}
