import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000,
  });

  // 2.添加请求拦截器
  instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config;
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 3.添加响应拦截器
  instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response.data;
  }, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  // 4.发送真实的网络请求: 该函数返回的是一个promise，其他函数在使用时可以直接.then
  return instance(config)

}