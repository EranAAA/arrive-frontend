import { httpService } from './http.service'

export const arriveService = {
   query,
   search,
   getById,
   save,
   remove,
   getEmptyArrive
}

async function query(filterBy = {}) {
   try {
      return await httpService.get('trip/', filterBy)
   } catch (err) {
      console.log('cant get trips!')
      throw err
   }
}

async function search(filterBy = {}) {
   try {
      return await httpService.get('trip/search', filterBy)
   } catch (err) {
      console.log('cant get search!')
      throw err
   }
}

async function getById(tripId) {
   try {
      return await httpService.get(`trip/${tripId}`)
   } catch (err) {
      console.log('cant get trip by id!')
      throw err
   }
}

async function remove(tripId) {
   try {
      return await httpService.delete(`trip/${tripId}`)
   } catch (err) {
      console.log('cant delete trip')
      throw err
   }
}

async function save(trip) {
   try {
      if (trip.trip_id) {
         return await httpService.put(`trip/${trip.trip_id}`, trip)
      } else {
         return await httpService.post(`trip/`, trip)
      }
   } catch (err) {
      console.log('cant save trip')
      throw err
   }
}

async function getEmptyArrive() {
   try {
      const trip = _createArrive('')
      return trip
   } catch (err) {
      console.log('cant get empty trip!')
      throw err
   }
}

function _createArrive(_id, name) {
   return { name }
}
