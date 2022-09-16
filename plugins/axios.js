export default function ({ $axios, redirect,$swal }) {
    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
    })
  
    $axios.onError(error => {
        const message = error.response ? error.response.data.message : error.message
        const status = error.response ? error.response.status : error.status       
        switch (status) {
                    
            case 403:
                 $swal("error",message,"error")
                    redirect("/dashboard")
             break;
            default:
                break;
        }
       
      })
    }