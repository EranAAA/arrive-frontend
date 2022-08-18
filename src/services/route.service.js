import { storageService } from './storage.service'

const KEY = 'route'

export const routeService = {
   query,
   getById,
   save,
   remove,
   getEmptyRoute
}

async function query(filter) {
   try {
      return await storageService.query(KEY, filter)
   } catch (err) {
      console.log('cant get routes!')
      throw err
   }
}

async function getById(routeId) {
   try {
      const route = await storageService.get(KEY, routeId)
      return route
   } catch (err) {
      console.log('cant get route by id!')
      throw err
   }
}

async function getEmptyRoute() {
   try {
      const route = await storageService.emptyRoute()
      return route
   } catch (err) {
      console.log('cant get empty route!')
      throw err
   }
}

async function remove(routeId) {
   try {
      return await storageService.remove(KEY, routeId)
   } catch (err) {
      console.log('cant delete route')
      throw err
   }
}

async function save(route) {
   try {
      if (route._id) {
         return await storageService.put(KEY, route)
      } else {
         return await storageService.post(KEY, route)
      }
   } catch (err) {
      console.log('cant save route')
      throw err
   }
}

