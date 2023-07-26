"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("./env"));
// Configure default request pat
let baseURL;
if (process.env.NODE_ENV === 'development') {
    // development
    baseURL = env_1.default.development.host;
}
else if (process.env.NODE_ENV === 'production') {
    // production
    baseURL = env_1.default.production.host;
}
axios_1.default.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// Create an Axios
const Axios = axios_1.default.create({
    baseURL,
    headers: {
        post: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    },
});
// Configure Unified Response Interceptor
Axios.interceptors.response.use((response) => {
    const { data } = response;
    if (data.code !== 200) {
        throw new Error('Network Error');
    }
    return response;
}, (error) => {
    console.log(error);
});
// Request
const request = function (url, config, method) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            if (method === 'get') {
                const { params } = Object.assign({}, config);
                Axios.get(url, params)
                    .then((res) => {
                    resolve(res.data);
                }, (err) => {
                    reject(err);
                    console.log('网络繁忙,请稍后再试!');
                })
                    .catch((err) => {
                    reject(err);
                    console.log('网络繁忙,请稍后再试!');
                });
            }
            else if (method === 'post') {
                Axios.post(url, config)
                    .then((res) => {
                    resolve(res.data);
                }, (err) => {
                    reject(err);
                    console.log('网络繁忙,请稍后再试!');
                })
                    .catch((err) => {
                    reject(err);
                    console.log('网络繁忙,请稍后再试!');
                });
            }
        });
    });
};
const http = {
    post: (url, params) => __awaiter(void 0, void 0, void 0, function* () {
        const p = qs_1.default.stringify(params);
        return yield request(url, p, 'post');
    }),
    get: (url, params) => __awaiter(void 0, void 0, void 0, function* () {
        return yield request(url, { params }, 'get');
    }),
};
exports.default = http;
//# sourceMappingURL=http.js.map