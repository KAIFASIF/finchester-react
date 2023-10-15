import api from "../config/api";

export const fetchUserLoansStatusCount = (
  userId: number,
  search: string,
  startDate: string,
  endDate: string
) => {
  const params = new URLSearchParams();
  params.set("search", search);
  params.set("startDate", startDate);
  params.set("endDate", endDate);

  return api.get(`user/loan/${userId}/statuses?${params.toString()}`);
};

export const fetchUserLoans = (
  userId: number,
  search: string,
  startDate: string,
  endDate: string,
  page: number,
  size: number
) => {
  const params = new URLSearchParams();
  params.set("search", search);
  params.set("startDate", startDate);
  params.set("endDate", endDate);
  params.set("page", page.toString());
  params.set("size", size.toString());
  return api.get(
    `/user/loans/${userId}?${params.toString()}`
  );
};
