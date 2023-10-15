import api from "../config/api";

export const createUserAccount = (partnerId:number, data: any) => {
  return api.post(`/partner/${partnerId}/createUser`, data);
};

