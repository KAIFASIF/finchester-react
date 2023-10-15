import api from "../config/api";

export const getDetailsByLoanId = (loanId: string | undefined) => {
  return api.get(`/user/loan/${loanId}`);
};

export const fetchPartnerConfig = (partnerId: number) => {
  return api.get(`/user/partnerConfig/${partnerId}`);
};

export const fetchProfileDetailsByMobile = (mobileNumber: number) => {
  return api.get(`/user/searchProfile/${mobileNumber}`);
};

export const postProfileDetails = (
  partnerId: number,
  userId: number,
  updatedData: any
) => {
  return api.post(`/user/save-profile/${partnerId}/${userId}`, updatedData);
};

export const postLoanDetails = (
  partnerId: number,
  userId: number,
  profileId: number,
  updatedData: any
) => {
  return api.post(
    `/user/loan/${partnerId}/${userId}/create-loan/${profileId}`,
    updatedData
  );
};

export const postBankDetails = (
  partnerId: number,
  userId: number,
  profileId: number,
  updatedData: any
) => {
  return api.post(
    `/user/loan/${partnerId}/${userId}/create-bank/${profileId}`,
    updatedData
  );
};
