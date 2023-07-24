import qs from 'qs';
import axios from 'axios';

// 配置默认请求路径
let baseURL;
if (process.env.NODE_ENV === 'development') {
  // 开发、测试环境
  baseURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
  // 正式环境
  baseURL = 'http://localhost:3000';
}
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 创建axios实例
const Axios = axios.create({
  baseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});

// 请求方法
const request = async function (url: string, config?: any, method?: string) {
  return await new Promise((resolve, reject) => {
    if (method === 'get') {
      const { params } = { ...(config as { params: object }) };
      Axios.get(url, params)
        .then(
          (res: { data: any }) => {
            resolve(res.data);
          },
          (err: any) => {
            reject(err);
            console.log('网络繁忙,请稍后再试!');
          }
        )
        .catch((err: any) => {
          reject(err);
          console.log('网络繁忙,请稍后再试!');
        });
    } else if (method === 'post') {
      Axios.post(url, config)
        .then(
          (res: { data: any }) => {
            resolve(res.data);
          },
          (err: any) => {
            reject(err);
            console.log('网络繁忙,请稍后再试!');
          }
        )
        .catch((err: any) => {
          reject(err);
          console.log('网络繁忙,请稍后再试!');
        });
    }
  });
};

const http = {
  post: async (url: string, params: object) => {
    const p = qs.stringify(params);
    return await request(url, p, 'post');
  },
  get: async (url: string, params: object) => {
    return await request(url, { params }, 'get');
  },
};
export default http;
