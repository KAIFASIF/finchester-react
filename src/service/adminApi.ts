import api from "../config/api";

export const createPartner = (updatedData: any) => {
  return api.post(`admin/create-partner`, updatedData);
};

// fetch All partners (All Partners page)
export const getPartners = () => {
  return api.get(`/admin/partners`);
};

// fetch partner by id (create page)
export const getPartner = (id: number) => {
  return api.get(`/admin/partner/${id}`);
};


// fetch All partner sigup Details  (Partner Signup page)
export const getPartnersAccounts = () => {
  return api.get(`/admin/partners/signup-details`);
};

export const updatePartnerConfig = (data: any) => {
  return api.post(`/admin/update-config`, data);
};



// partner signup page
export const getPartnerSignupDetail = (id: number) => {
  return api.get(`/admin/partner-signup-detail/${id}`);
};

export const createPartnerSignup = (partnerId: number, data: any) => {
  return api.post(`/admin/partner-signup/${partnerId}`, data);
};


// admin Dashboard 
export const fetchAdminLoansStatus = (
  search: string,
  fromDate: string,
  endDate: string
) => {
  const params = new URLSearchParams();
  params.set("search", search);
  params.set("fromDate", fromDate);
  params.set("endDate", endDate);
  return api.get(`admin/loans/statuses?${params.toString()}`);
};

export const fetchAdminLoans = (
  search: string,
  fromDate: string,
  endDate: string,
  page: number,
  size: number
) => {
  const params = new URLSearchParams();
  params.set("search", search);
  params.set("fromDate", fromDate);
  params.set("endDate", endDate);
  params.set("page", page.toString());
  params.set("size", size.toString());
  return api.get(`/admin/loans?${params.toString()}`);
};

