import { httpService } from './http.service'

export const siriService = {
   query
}

async function query(data) {
   try {
      const siri = await httpService.get('trip/siri', data)
      return siri
   } catch (err) {
      console.log('cant get siri!', err)
      throw err
   }
}
// .Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit
