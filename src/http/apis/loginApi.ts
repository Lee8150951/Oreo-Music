import http from '../http';
import type ResponseType from '../../types/res';

// Get login qr code
const getLoginCode = async () => {
  const timestamp = Date.now();
  const qrKeyRes = (await http.get(`/login/qr/key?timestamp=${timestamp}`)) as ResponseType;
  const key = qrKeyRes.data.unikey as string;
  const res = (await http.get(`/login/qr/create?key=${key}&qrimg=true&timestamp=${timestamp}`)) as ResponseType;
  return res.data.qrimg;
};

export default {
  getLoginCode,
};
