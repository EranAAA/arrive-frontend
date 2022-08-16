import { utilService } from './util.service'

export const storageService = {
   query,
   get,
   post,
   put,
   remove,
}

async function query(entityType, filter) {
   var entities = await _load(entityType) || []
   // if (!entities || !entities.length) {
   //    entities = _createDefaultCards()
   //    _save(entityType, entities)
   // }

   const regex = new RegExp(filter, 'i')
   return entities.filter(entity => regex.test(entity.name))
}

async function get(entityType, entityId) {
   const entities = await query(entityType)
   const entity = entities.find(entity => entity._id === entityId)
   return entity
}

async function post(entityType, newEntity) {
   const entities = await query(entityType)
   newEntity._id = utilService.makeId()
   entities.push(newEntity)
   _save(entityType, entities)
   return newEntity
}

async function put(entityType, updatedEntity) {
   const entities = await query(entityType)
   const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
   entities.splice(idx, 1, updatedEntity)
   _save(entityType, entities)
   return updatedEntity
}

async function remove(entityType, entityId) {
   const entities = await query(entityType)
   const idx = entities.findIndex(entity => entity._id === entityId)
   entities.splice(idx, 1)
   _save(entityType, entities)
}

function _save(entityType, entities) {
   localStorage.setItem(entityType, JSON.stringify(entities))
}

async function _load(entityType) {
   return await JSON.parse(localStorage.getItem(entityType))
}




