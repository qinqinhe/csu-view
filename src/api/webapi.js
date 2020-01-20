import { local, code, address } from '@/config/wildcard'
import { Message } from 'element-ui'
import store from '@/store'

const webapi = ({
  url = '',
  method = 'POST',
  baseURL = address,
  headers = {},
  async = true,
  data = {}
}) => {
  store.dispatch('loadingChange', true)
  return new Promise((resolve, reject) => {
    
    let http, params = '', address = baseURL + url, err, _this = this

    
    headers = {
      Authorization: localStorage.getItem(local.TOKEN) ? 'Bearer ' + localStorage.getItem(local.TOKEN) : 'Basic Y2xpZW50OjEyMzQ1Ng==',
      ContentType: headers.ContentType || 'application/x-www-form-urlencoded'
    }
    
    method = method.toUpperCase()
    
    for (let i in data) {
      if (data[i] === null || typeof data[i] === 'string' && data[i].length === 0) {
        delete data[i]
      } else if (typeof data[i] === 'string') {
        data[i] = data[i].replace(/\%/g, '%25')
        data[i] = data[i].replace(/\#/g, '%23')
        data[i] = data[i].replace(/\&/g, '%2B')
        data[i] = data[i].replace(/\/\//g, '%2F')
        data[i] = data[i].replace(/\=/g, '%3D')
        data[i] = data[i].replace(/\?/g, '%3F')
      }

    }
    const userInformation = JSON.parse(localStorage.getItem(local.USER))
    
    if (userInformation) {
      data.userInfoId = userInformation.userId
      data.operatorId = userInformation.userId
      data.operatorName = userInformation.name
    }

    
    if (window.XMLHttpRequest) {
      http = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      http = new ActiveXObject('Microsoft.XMLHTTP')
    }
    switch (true) {
      case method === 'POST' && headers.ContentType === 'application/json':
        params = data
        break
      case method === 'POST' && headers.ContentType === 'application/x-www-form-urlencoded':
        for (let i in data) {
          params += (params && '&') + `${i}=${data[i]}`
        }
        break
      case method === 'GET':
        address += '?'
        for (let i in data) {
          address += `${i}=${data[i]}&`
        }
        address.substr(0, address.length - 1)
        break
    }
    http.open(method, address, async)
    http.setRequestHeader('Content-Type', headers.ContentType)
    http.setRequestHeader('Authorization', headers.Authorization)
    http.send(params)
    http.onreadystatechange = function () {
      if (http.status === 200 && http.readyState === 4) {
        const dataJson = typeof http.responseText === 'object' ? http.responseText : JSON.parse(http.responseText)
        const { resultCode, data, resultMessage } = dataJson
        if (resultCode === code.CODE_UNAUTHENTICATION ||
          resultCode === code.CODE_INVALIDTOKEN ||
          resultCode === code.CODE_ACCESSDENIED ||
          resultCode === code.CODE_AUTHENTICATIONFAIL) {
          Message({
            message: `${resultMessage}，4秒后自动跳转到登录页`,
            type: 'warning'
          })
          
          setTimeout(()=>{
              
              window.location.href = window.location.origin + '/#/Login'
          },4000)
        }
        if (resultCode !== code.CODE_SUCCESS) {
          Message({
            message: resultMessage,
            type: 'warning'
          })
        }
        resolve(dataJson)
      }
      if (http.readyState === 4) {
        store.dispatch('loadingChange', false)
      }
    }
  }).then(res => {
      
      return res
    })
    .catch(err => {
      
      return err
    })
}
export default webapi
