import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryTable from "./SummaryTable";

import Button from "../../components/button";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import Layout from "../../components/Layout";
import {
  fetchUserLoans,
  fetchUserLoansStatusCount,
} from "../../service/summaryApi";
import StatusCards from "../../components/status-cards";
import FilterSearch from "../../components/filter-search";
import { FormProvider, useForm } from "react-hook-form";
import Toast from "../../components/snackbar";
import { fetchTodaysDate } from "../../utilities/dates";
import { AxiosResponse } from "axios";
import Navbar from "../../components/Navbar";

interface statusProp {
  Loans: number;
  Submitted: number;
  Draft: number;
  Approved: number;
  InComplete: number;
  Rejected: number;
  Completed: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const methods = useForm();
  const { getValues, setValue } = methods;

  const auth = useRecoilValue(authAtom);
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(3);
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<statusProp | {}>({});
  const [loans, setLoans] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const handleToast = () => setOpen(false);

  useEffect(() => {
    setValue("search", "");
    setValue("startDate", fetchTodaysDate());
    setValue("endDate", fetchTodaysDate());
    fetchStatusAndLoans("", fetchTodaysDate(), fetchTodaysDate());// eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchStatusAndLoans(
      getValues("search"),
      getValues("startDate"),
      getValues("endDate")
    ); // eslint-disable-next-line
  }, [page, size]);

  const clearFilters = () => {
    setValue("search", "");
    setValue("startDate", "");
    setValue("endDate", "");
    fetchStatusAndLoans("", fetchTodaysDate(), fetchTodaysDate());
  };

  const validateDates = () => {
    if (
      (getValues("search") !== "" &&
        getValues("startDate") === "" &&
        getValues("endDate") !== "") ||
      (getValues("search") !== "" &&
        getValues("startDate") !== "" &&
        getValues("endDate") === "") ||
      (getValues("startDate") === "" && getValues("endDate") !== "") ||
      (getValues("startDate") !== "" && getValues("endDate") === "")
    ) {
      setMessage("please select from dates");
      setSeverity("error");
      setOpen(true);
      setLoader(false);
      return true;
    }
    const fromDate = new Date(getValues("startDate"));
    const toDate = new Date(getValues("endDate"));
    if (fromDate && toDate && fromDate > toDate) {
      setMessage("From date should not be more than from to date");
      setSeverity("error");
      setOpen(true);
      setLoader(false);
      return true;
    }
    return false;
  };

  const fetchStatusAndLoans = async (
    search: any,
    fromDate: string,
    endDate: string
  ) => {
    setLoader(true);
    try {
      if (validateDates()) {
        return;
      }

      const statusResponse:AxiosResponse<any, any> = await fetchUserLoansStatusCount(
        auth?.user?.id,
        search,
        fromDate,
        endDate
      );

      if (statusResponse?.status === 200) {
        setStatus(statusResponse?.data);
        const loanResponse = await fetchUserLoans(
          auth?.user?.id,
          search,
          fromDate,
          endDate,
          page,
          size
        );
        if (loanResponse?.status === 200) {
          setLoans(loanResponse?.data?.loans);
          setCount(loanResponse?.data?.count);
        }
      }
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      if (error?.response?.status === 404) {
        setMessage(error?.response?.data);
        setSeverity("error");
        setOpen(true);
        setStatus({});
        setLoans([]);
      }
    }
  };

  const handleRefreshData = (newPage: number, newPageSize: number): any => {
    setPage(newPage);
    setSize(newPageSize);
  };

  const okSubmit = () => {
    fetchStatusAndLoans(
      getValues("search"),
      getValues("startDate"),
      getValues("endDate")
    );
  };
  return (
    <Layout loader={loader}>
      <Toast
        message={message}
        open={open}
        severity={severity}
        handleClose={handleToast}
      />

      <FormProvider {...methods}>
        <div className="flex flex-col h-screen sm:p-2 md:p-10 bg-gray-200 overflow-y-auto">
          <div className="flex-grow bg-white">
            <div className="  bg-white w-full p-4">
              <div className="flex justify-center">
                <h1>Staff Dashboard</h1>
              </div>
              <div className="mb-5">
                <Navbar />
              </div>
              <div className="flex mt-10 mb-5">
                <div className="w-4/5">
                  <FilterSearch
                    clearFilters={clearFilters}
                    onClick={okSubmit}
                  />
                </div>
                <div className="w-1/5  flex justify-end">
                  <Button
                    label="New Application"
                    onClick={() => navigate("/loan-application")}
                    className="btn btn-primary-outline flex self-start"
                  />
                </div>
              </div>

              <div className="grid  sm:grid-cols-2   lg:grid-cols-7 items-start overflow-hidden bg-gray-200 p-2 gap-2 mt-5 ">
                {Object.entries(status).map(([key, value]: any, index: any) => (
                  <StatusCards key={index} statusKey={key} value={value} />
                ))}
              </div>
              <SummaryTable
                loans={loans}
                handleRefreshData={handleRefreshData}
                count={count}
                size={size}
              />
            </div>
          </div>
        </div>
      </FormProvider>
    </Layout>
  );
};

export default React.memo(Dashboard);
