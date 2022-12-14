import { arriveService } from '../../services/arrive.service.js'
import { routeService } from '../../services/route.service.js'
import { siriService } from '../../services/siri.service.js'
import { utilService } from '../../services/util.service'

export function setArrive(arrive) {
   return (dispatch) => {
      dispatch({ type: 'SET_ARRIVE', arrive })
   }
}

export function loadArrives() {
   try {
      return async (dispatch) => {
         const arrives = await arriveService.query()
         // const stopsTime = await utilService.getStopTimeDemo()
         // arrives.push(stopsTime)
         console.log('Got Arrives')
         dispatch({ type: 'SET_ARRIVES', arrives })
      }
   } catch (err) {
      console.log('cannot load arrives', err)
   }
}

export function loadSiri() {
   try {
      return async (dispatch) => {
         const siri = await siriService.query()
         console.log('Added Siri')
         dispatch({ type: 'SET_SIRI', siri })
         dispatch({ type: 'COUNT_CALLS' })
         dispatch({ type: 'SET_SIRI_LAST_CALLS' })
      }
   } catch (err) {
      console.log('cannot add siri', err)
   }
}

export function loadSavedRoutes() {
   try {
      return async (dispatch) => {
         const routes = await routeService.query()
         console.log('Got Routes')
         dispatch({ type: 'SET_ROUTES', routes })
      }
   } catch (err) {
      console.log('cannot load routes', err)
   }
}

export function saveRoute(route) {
   try {
      return async (dispatch) => {
         const savedRoute = await routeService.save(route)
         console.log('Added Route')
         dispatch({ type: 'UPDATE_ROUTE', route: savedRoute })
         return savedRoute
      }
   } catch (err) {
      console.log('cannot add route', err)
   }
}

export function loadResults(filter) {
   try {
      return async (dispatch) => {

         dispatch({ type: 'SET_RESULTS', results: '' })
         const results = await arriveService.search(filter)
         console.log('Got Results')
         dispatch({ type: 'SET_RESULTS', results })
         return results
      }
   } catch (err) {
      console.log('cannot load results', err)
   }
}

export function setFilter(filter) {
   try {
      return async (dispatch) => {
         dispatch({ type: 'SET_FILTER', filter })
      }
   } catch (err) {
      console.log('cannot set filter', err)
   }
}

export function addArrive(arrive) {
   try {
      return async (dispatch) => {
         const savedArrive = await arriveService.save(arrive)
         console.log('Added Arrive')
         dispatch({ type: 'ADD_ARRIVE', arrive: savedArrive })
         return savedArrive
      }
   } catch (err) {
      console.log('cannot add arrive', err)
   }
}

export function updateArrive(arriveToSave) {
   try {
      return async (dispatch) => {
         const savedArrive = await arriveService.save(arriveToSave)
         dispatch({ type: 'UPDATE_ARRIVE', arrive: savedArrive })
         return savedArrive
      }
   } catch (err) {
      console.log('cannot edit arrive', err)
   }
}

export function filtering(filterBy) {
   return async (dispatch) => {
      try {
         const arrives = await arriveService.query(filterBy)
         dispatch({ type: 'SET_ARRIVES', arrives })
         dispatch({ type: 'FILTER_ARRIVE', filterBy })
      } catch (err) {
         console.log('cannot filter arrives', err)
      }
   }
}

export function removeArrive(arriveId) {
   return async (dispatch) => {
      try {
         await arriveService.remove(arriveId)
         dispatch({ type: 'REMOVE_ARRIVE', arriveId })
         console.log('Deleted Succesfully!')
      } catch (err) {
         console.error('Error:', err)
      }
   }
}

export function setFilterBy(filterBy) {
   return (dispatch) => {
      dispatch({ type: 'SET_FILTER_BY', filterBy })
   }
}

export function setTemplate() {
   return async (dispatch) => {
      try {
         const template = await utilService.getTemplate()
         dispatch({ type: 'SET_TEMPLATE', template })
         console.log('Set Grids Succesfully!')
      } catch (err) {
         console.error('Error:', err)
      }
   }
}