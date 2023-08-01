import qs from 'qs';
import axios from 'axios';
import utils from '../util/utils';
import ENV from './env';

// Configure default request pat
let baseURL;
if (process.env.NODE_ENV === 'development') {
  // development
  baseURL = ENV.development.host;
} else if (process.env.NODE_ENV === 'production') {
  // production
  baseURL = ENV.production.host;
}
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// Create an Axios
const Axios = axios.create({
  baseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});

// Configure visit with cookies
Axios.interceptors.request.use((config) => {
  const tk = utils.storage.get('om_tk');
  if (tk !== null && config.method === 'get') {
    config.params = {
      ...config.params,
      cookie: tk,
    };
  }
  return config;
});

// Configure Unified Response Interceptor
Axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    const special = [200, 800, 801, 802, 803];
    if (!special.includes(data.code) && data.code !== undefined) {
      throw new Error('Network Error');
    }
    return response;
  },
  (error) => {
    console.log(error);
  }
);

// Request
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
  get: async (url: string, params?: object) => {
    return await request(url, { params }, 'get');
  },
};
export default http;
