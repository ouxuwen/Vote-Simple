import axios from "axios";
// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   return response;
// }, function (error) {
//   console.log(error.response)
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

function axiosHandler(url, params, method, resolve, reject, vm) {
  let loading;
  if (vm) {
    loading = vm.$loading({
      lock: true,
      background: 'rgba(0, 0, 0, 0)'
    });
  }
  axios
    .request({
      url: url,
      method: method,
      data: params,
      headers: {
        "Content-Type": "Application/json",
        "token": localStorage['token']
      }
    }).then(res => {
      if (loading) loading.close();
      
     
        if (res.data.code == -1 && vm) {
          vm.$message.error(res.data.message);
          reject(res)
        }
        if (res.data.code == 1) {
          resolve(res.data)
        }
      
    }).catch(err => {
      if (loading) loading.close();
      let res = err.response;
      if (res.status == 401) {
        if (vm) {
          vm.$message.error("Login Expired");
          vm.$router.push("/Login");
          localStorage.clear();
        }
        reject(res)
      } else if (res.status == 403) {
        if (vm) {
          vm.$message.error("Insufficient authority");
        }
        reject(res)
      }else{
        vm.$message.error("Server Error");
        reject(res)
      }
     
     
    
    })
}
export const get = (url, params, vm) => {
  return new Promise((resolve, reject) => {
    axiosHandler(url, params, 'get', resolve, reject, vm)
  })
}

export const post = (url, params, vm) => {
  return new Promise((resolve, reject) => {
    axiosHandler(url, params, 'post', resolve, reject, vm)
  })
}

export const deletes = (url, params, vm) => {
  return new Promise((resolve, reject) => {
    axiosHandler(url, params, 'delete', resolve, reject, vm)
  })
}

export const patch = (url, params, vm) => {
  return new Promise((resolve, reject) => {
    axiosHandler(url, params, 'patch', resolve, reject, vm)
  })
}



