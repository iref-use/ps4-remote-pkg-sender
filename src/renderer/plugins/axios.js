import Vue from 'vue'
import axios from 'axios'
import JSON5 from 'json5'

// Request interceptor
axios.interceptors.request.use(request => {

    // force to disable preflight requests
    // request.headers.post['method'] = 'POST'
    // request.headers.post['content-type'] = 'application/x-www-form-urlencoded';
    // request.headers.common['content-type'] = 'application/x-www-form-urlencoded';

    return request
})

// Response interceptor
axios.interceptors.response.use(response =>
  {
      // console.log('response', response)

      // parse json5
      if(typeof response.data == 'string' && response.data.includes('0x')){
        response.data = JSON5.parse(response.data)
        return response
      }

      // Loading.hide()
      return response
  },

  // on error
  e => {
    const { status, message } = e
    // console.log("Axios Error", e, status, message)

    if(message == 'Network Error'){
        console.log("Error in Response (interceptor)", message)
        // return Promise.reject(new Error("Network Error. Playstation not available"))
        // return new Promise( () => {})

        return Promise.reject({
            response: { message: 'Playstation not available'},
            status: 4444,
        })
    }

    if(message.includes('timeout of') !== false){
        return Promise.reject({
            response: { message: 'Timeout on Request' },
            status: 4408,
        })
    }


    // if (status >= 500) {
    //   alert(message)
    //   // #todo show error dialog
    // }

    return Promise.reject(e)
})

Vue.prototype.$axios = axios

export default axios
