import Vue from 'vue'
import moment from 'moment'
Vue.filter('formatDate', (value) => {
  const date = new Date(value)
  return date.toLocaleString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

Vue.filter('simpleDateformate', (value) => {
  return moment(value).format("YYYY-MM-DD")
})

Vue.filter('formateHumanDiff',(value)=>{
    if(value)
    {
  const date = new Date(value)
  return moment(date).fromNow()
    }else{
        return '--'
    }
})

Vue.filter('formatDays',(value)=>{
    if(value)
    {
  const date = new Date(value)
  return moment(date).startOf('days').fromNow()
    }else{
        return '--' 
    }
})