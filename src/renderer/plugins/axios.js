import Vue from 'vue'
import axios from 'axios'

// Request interceptor
axios.interceptors.request.use(request => {
    // prepare #todo
    // const token = store.getters['auth/token']
    // if (token) {
    //   request.headers.common['Authorization'] = `Bearer ${token}`
    // }

    const locale = store.getters['lang/locale']
    if (locale) {
      request.headers.common['Accept-Language'] = locale
    }

    // request.headers['X-Socket-Id'] = Echo.socketId()
    // console.log('request', request)

    return request
})

// Response interceptor
axios.interceptors.response.use(response =>
  {
      // console.log('response', status)
      // Loading.hide()
      return response
  },

  error => {
  const { status } = error.response
  const message = error.response.data.message

  if (status >= 500) {
    alert(message)
    // swal.fire({
    //     title: status,
    //     text: message,
    //     reverseButtons: true,
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    // })
  }

  if (status === 401 && store.getters['auth/check']) {
    alert(message)
  }

  return Promise.reject(error)
})

Vue.prototype.$axios = axios
