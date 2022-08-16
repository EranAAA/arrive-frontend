const initialState = {
   stops: [],
   routs: [],
   stopsTime: []
}

export function arriveReducer(state = initialState, action) {
   var newState = state
   // var arrives

   switch (action.type) {
      case 'SET_ARRIVES':
         const stops = action.arrives[0]
         const routs = action.arrives[1]
         const stopsTime = action.arrives[2][0]
         newState = { ...state, stops, routs, stopsTime }
         break

      default:
   }
   // For debug:
   window.arriveState = newState
   return newState

}
