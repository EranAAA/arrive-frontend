import { httpService } from './http.service'

export const siriService = {
   query
}

async function query(data) {
   try {
      return await httpService.get('trip/siri', data)
   } catch (err) {
      console.log('cant get trips!')
      throw err
   }
}
