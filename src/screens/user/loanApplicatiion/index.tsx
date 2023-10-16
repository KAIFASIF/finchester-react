import React, { useEffect, useState } from "react";
import { FcExpand } from "react-icons/fc";
import { BiArrowBack } from "react-icons/bi";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../../recoil/authAtom";
import ProfileDetail from "./ProfileDetail";
import BankDetail from "./BankDetail";
import LoanDetails from "./LoanDetail";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  fetchPartnerConfig,
  getDetailsByLoanId,
} from "../../../service/loanApplicationApi";
import Layout from "../../../components/Layout";
import Toast from "../../../components/snackbar";
import MobileModal from "./MobileModal";

const LoanApplication = () => {
  let status = new URLSearchParams(useLocation().search).get("status");
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const [config, setConfig] = useState({});
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [searchVal, setSearchVal] = useState<string>("");
  const [profileDetails, setProfileDetails] = useState<any | null>(null);
  const [bankDetail, setBankDetail] = useState<any | null>(null);
  const [loanDetail, setLoanDetail] = useState<any | null>(null);
  const [loanStatus, setLoanStatus] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const handleToast = () => setOpen(false);

  const loanId = useParams()?.loanId;

  useEffect(() => {
    if (loanId) {
      fetchDetailsByLoanId();
    }
    getConfig();
  }, []);

  useEffect(() => {
    if (
      status === "Submitted" ||
      status === "Approved" ||
      status === "Rejected" ||
      status === "Completed"
    ) {
      setLoanStatus(true);
    }
  }, [status]);

  const fetchDetailsByLoanId = async () => {
    try {
      setLoader(true);
      const res = await getDetailsByLoanId(loanId);
      if (res?.status === 200) {
        setProfileDetails(res?.data?.profileDetail);
        setBankDetail(res?.data?.bankDetail);
        setLoanDetail(res?.data?.loanDetail);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const getConfig = async () => {
    try {
      setLoader(true);
      const res = await fetchPartnerConfig(auth?.partnerId);

      if (res?.status === 200) {
        setConfig({
          profileConfig: JSON.parse(res?.data?.config)[0]?.profileConfig,
          bankConfig: JSON.parse(res?.data?.config)[0].bankConfig,
          loanConfig: JSON.parse(res?.data?.config)[0].loanConfig
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      // setExpanded(isExpanded ? panel : false);
      if( panel == "panel1"){
        setExpanded(isExpanded ? "panel1" : false)
      }
      else if( panel == "panel2" && profileDetails?.id){
        setExpanded(isExpanded ? "panel2" : false)
      }
      else if(panel == "panel3" && bankDetail?.id){
        setExpanded(isExpanded ? "panel3" : false)
      }else{
         if(panel == "panel2"){
          setMessage("Please submit profile details")
         }
         if(panel == "panel3"){
          setMessage("Please submit  profile and bank details")
         }
        setOpen(true)
        setSeverity("error")
        
      }

    };

  const formAccordian = [
    {
      id: 1,
      title: "Profile Details",
      panel: "panel1",
      component: (
        <ProfileDetail
          config={config}
          auth={auth}
          setExpanded={setExpanded}
          searchVal={searchVal}
          profileDetails={profileDetails}
          setProfileDetails={setProfileDetails}
          loanStatus={loanStatus}
          setLoader={setLoader}
          setMessage={setMessage}
          setSeverity={setSeverity}
          setOpen={setOpen}
        />
      ),
    },
    {
      id: 2,
      title: "Bank Details",
      panel: "panel2",
      component: (
        <BankDetail
          config={config}
          auth={auth}
          setExpanded={setExpanded}
          profileId={profileDetails?.id}
          bankDetail={bankDetail}
          setBankDetail={setBankDetail}
          loanStatus={loanStatus}
          setLoader={setLoader}
          setMessage={setMessage}
          setSeverity={setSeverity}
          setOpen={setOpen}
        />
      ),
    },
    {
      id: 3,
      title: "Loan Details",
      panel: "panel3",
      component: (
        <LoanDetails
          config={config}
          auth={auth}
          setExpanded={setExpanded}
          profileId={profileDetails?.id}
          loanDetail={loanDetail}
          setLoanDetail={setLoanDetail}
          loanStatus={loanStatus}
          setLoader={setLoader}
          setMessage={setMessage}
          setSeverity={setSeverity}
          setOpen={setOpen}
        />
      ),
    },
  ];

  return (
    <Layout loader={loader}>
      <Toast
        message={message}
        open={open}
        severity={severity}
        handleClose={handleToast}
      />

      <div className=" lg:p-5 h-screen bg-gray-200">
        <div className=" lg:p-7">
          {!loanId && (
            <MobileModal
              setSearchVal={setSearchVal}
              setProfileDetails={setProfileDetails}
              setBankDetail={setBankDetail}
              setLoanDetail={setLoanDetail}
              setLoanStatus={setLoanStatus}
            />
          )}

          <div
            className="mt-5 ml-2  mb-5 md:mt-5 md:ml-3 lg:ml-0 bg-white p-5 flex cursor-pointer-"
            onClick={() => navigate("/")}
          >
            <BiArrowBack className="text-2xl  mr-2" /> <span> Back</span>
          </div>

          {formAccordian.length > 0 &&
            formAccordian.map((ele: any, index: number) => (
              <Accordion
                key={ele?.id}
                expanded={expanded === ele?.panel}
                onChange={handleChange(ele?.panel)}
              >
                <AccordionSummary
                  expandIcon={<FcExpand className="text-red-400" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h1 className="text-xl font-medium text-green-400">
                    {ele?.title}
                  </h1>
                </AccordionSummary>
                <AccordionDetails>{ele?.component}</AccordionDetails>
              </Accordion>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default React.memo(LoanApplication);
