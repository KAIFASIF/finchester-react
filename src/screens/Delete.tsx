import React, { useState } from "react";
import api from "../config/api";
import axios from "axios";



const Delete = () => {

    const [tableData, setTableData] = useState<any>([]);
    const [header, setHeader] = useState<any>([]);
    // useEffect(() => {
    //   setValue("car", "Tata");
    // }, []);
    const savePartnerConfig = async () => {
        const updatedData = {
            "id":1,
    "name" : "Airblack",
     "email" : "airblack@gmail.com",
      "mobile" : 9550697451,
     "username" : "airblack21",
       "password" : "airblack",
         "isAuthorized" : true,
     
          
          config: JSON.stringify([
            {
              profileConfig: [
                {
                  label: "Mobile",
                  disabled: true,
                  dependent: false,
                  id: 1,
                  type: "text",
                  name: "mobile",
                  rules: { required: false, pattern: "/^[6-9]\\d{9}$/" },
                  render: true,
                  indexed: "0",
                },
                {
                  label: "Firstname",
                  disabled: false,
                  dependent: false,
                  id: 2,
                  type: "text",
                  name: "firstname",
                  rules: { required: true, pattern: "/^[A-Za-z ]*$/" },
                  render: true,
                  indexed: "1",
                },
                {
                  label: "Lastname",
                  disabled: false,
                  dependent: false,
                  id: 3,
                  type: "text",
                  name: "lastname",
                  rules: { required: true, pattern: "/^[A-Za-z ]*$/" },
                  render: true,
                  indexed: "2",
                },
                {
                  label: "Email",
                  disabled: false,
                  dependent: false,
                  id: 4,
                  type: "text",
                  name: "email",
                  rules: {
                    required: true,
                    pattern:
                      '/^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/',
                  },
                  render: true,
                  indexed: "3",
                },
                {
                  label: "Marital status",
                  disabled: false,
                  multiple: false,
                  dependent: false,
                  id: 5,
                  name: "maritalStatus",
                  type: "select",
                  defaultValue: "",
                  render: true,
                  rules: { required: true },
                  indexed: "4",
                  options: [
                    { id: 1, label: "Married", value: "Married" },
                    { id: 2, label: "Unmarried", value: "Unmarried" },
                    { id: 3, label: "Others", value: "Others" },
                  ],
                },
                {
                  label: "Residence type",
                  disabled: false,
                  multiple: false,
                  dependent: false,
                  id: 6,
                  name: "residenceType",
                  type: "select",
                  defaultValue: "",
                  render: true,
                  rules: { required: true },
                  indexed: "5",
                  options: [
                    { id: 1, label: "Own", value: "Own" },
                    { id: 2, label: "Lease", value: "Lease" },
                    { id: 3, label: "Rented", value: "Rented" },
                  ],
                  onChange: "handleDependentFields",
                },
                {
                  label: "Address",
                  disabled: false,
                  dependent: false,
                  id: 7,
                  type: "text",
                  name: "address",
                  rules: { required: true, pattern: "" },
                  render: true,
                  indexed: "6",
                },
                {
                  label: "Permanent address",
                  disabled: false,
                  dependent: true,
                  dependentFieldName: "residenceType",
                  dependentFieldValue: ["Rented"],
                  id: 8,
                  type: "text",
                  name: "permanentAddress",
                  rules: { required: true, pattern: "" },
                  render: false,
                  indexed: "7",
                },
               
               
               
                {
                  label: "City",
                  disabled: false,
                  dependent: false,
                  id: 9,
                  type: "text",
                  name: "city",
                  rules: { required: true, pattern: "/^[A-Za-z ]*$/" },
                  render: true,
                  indexed: "8",
                },
                {
                  label: "State",
                  disabled: false,
                  dependent: false,
                  id: 10,
                  type: "text",
                  name: "state",
                  rules: { required: true, pattern: "/^[A-Za-z ]*$/" },
                  render: true,
                  indexed: "9",
                },
                {
                  label: "Pincode",
                  disabled: false,
                  dependent: false,
                  id: 11,
                  type: "text",
                  name: "pincode",
                  rules: { required: true, pattern: "/^(\\d{4}|\\d{6})$/" },
                  render: true,
                  indexed: "10",
                },
                {
                  label: "Gender",
                  disabled: false,
                  dependent: false,
                  id: 12,
                  render: true,
                  name: "gender",
                  type: "radio",
                  rules: { required: true },
                  indexed: "11",
                  options: [
                    { id: 1, label: "Male", value: "Male" },
                    { id: 2, label: "Female", value: "Female" },
                  ],
                },
              ],
    
           
              bankConfig: [
                {
                  label: "Account type",
                  disabled: false,
                  dependent: false,
                  id: 1,
                  render: true,
                  onChange: "handleDependentFields",
                  name: "accountType",
                  type: "radio",
                  rules: { required: true },
                  indexed: "0",
                  options: [
                    { id: 1, label: "Savings", value: "Savings" },
                    { id: 2, label: "Current", value: "Current" },
                    { id: 3, label: "Joint", value: "Joint" },
                  ],
                },
                {
                  label: "Account no",
                  disabled: false,
                  dependent: false,
                  id: 2,
                  type: "text",
                  name: "accountNo",
                  rules: { required: true, pattern: "/^[0-9]+$/" },
                  render: true,
                  indexed: "1",
                },
                {
                  label: "Confirm account no",
                  disabled: false,
                  dependent: false,
                  id: 3,
                  type: "text",
                  name: "confirmAccountNo",
                  rules: { required: true, pattern: "/^[0-9]+$/" },
                  render: true,
                  indexed: "2",
                },
                {
                  label: "Ifsc code",
                  disabled: false,
                  dependent: false,
                  id: 4,
                  type: "text",
                  name: "ifscCode",
                  rules: {
                    required: true,
                    pattern: "/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/",
                  },
                  render: true,
                  indexed: "3",
                },
                {
                  label: "Bank name",
                  disabled: false,
                  dependent: false,
                  id: 5,
                  type: "text",
                  name: "bankName",
                  rules: { required: true, pattern: "" },
                  render: true,
                  indexed: "4",
                },
                {
                  label: "Branch",
                  disabled: false,
                  dependent: false,
                  id: 6,
                  type: "text",
                  name: "branch",
                  rules: { required: true, pattern: "" },
                  render: true,
                  indexed: "5",
                },
                {
                  label: "City",
                  disabled: false,
                  dependent: false,
                  id: 7,
                  type: "text",
                  name: "city",
                  rules: { required: true, pattern: "" },
                  render: true,
                  indexed: "6",
                },
                {
                  label: "State",
                  disabled: false,
                  dependent: false,
                  id: 8,
                  type: "text",
                  name: "state",
                  rules: { required: true, pattern: "" },
                  render: true,
                  indexed: "7",
                },
                {
                  label: "Aadhaar no",
                  disabled: false,
                  dependent: false,
                  id: 9,
                  type: "text",
                  name: "aadhaarNo",
                  rules: { required: true, pattern: "/^\\d{12}$/" },
                  render: true,
                  indexed: "8",
                },
                {
                  label: "Pan no",
                  disabled: false,
                  dependent: false,
                  id: 10,
                  type: "text",
                  name: "panNo",
                  rules: {
                    required: true,
                    pattern: "/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/",
                  },
                  render: true,
                  indexed: "9",
                },
                
                {
                  label: "Joint account partner name",
                  disabled: false,
                  dependent: true,
                  dependentFieldName: "accountType",
                  dependentFieldValue: ["Joint"],
                  id: 14,
                  type: "text",
                  name: "jointAccountPartner",
                  rules: { required: true, pattern: "" },
                  render: false,
                  indexed: "13",
                },
              ],
    
              loanConfig: [
                {
                  label: "Reason",
                  disabled: false,
                  multiple: false,
                  dependent: false,
                  id: 1,
                  name: "reason",
                  type: "select",
                  defaultValue: "",
                  render: true,
                  rules: { required: true },
                  indexed: "0",
                  options: [
                    { id: 1, label: "Higher education", value: "Higher education" },
                    { id: 2, label: "Marriage", value: "Marriage" },
                    { id: 3, label: "Medical", value: "Medical" },
                    { id: 4, label: "Personal", value: "Personal" },
                    { id: 5, label: "Other", value: "Other" },
                  ],
                },
                {
                  label: "Loan amount",
                  disabled: false,
                  dependent: false,
                  id: 2,
                  type: "text",
                  name: "loanAmount",
                  rules: { required: true, pattern: /^\d+(\.\d{1,2})?$/.toString() },
                  render: true,
                  indexed: "1",
                },
                {
                  label: "Loan tenure",
                  disabled: false,
                  multiple: false,
                  dependent: false,
                  id: 3,
                  name: "loanTenure",
                  type: "select",
                  defaultValue: "",
                  render: true,
                  rules: { required: true },
                  indexed: "2",
                  options: [
                    { id: 1, label: "12", value: "12" },
                    { id: 2, label: "24", value: "24" },
                    { id: 3, label: "36", value: "36" },
                    { id: 4, label: "48", value: "48" },
                    { id: 5, label: "60", value: "60" },
                  ],
                },
                {
                  label: "Job type",
                  disabled: false,
                  multiple: false,
                  dependent: false,
                  id: 4,
                  name: "jobType",
                  type: "select",
                  defaultValue: "",
                  render: true,
                  rules: { required: true },
                  indexed: "3",
                  options: [
                    { id: 1, label: "Salaried", value: "Salaried" },
                    { id: 2, label: "Self-employed", value: "Self-employed" },
                    { id: 3, label: "Others", value: "Others" },
                  ],
                  onChange: "handleDependentFields",
                },
                {
                  label: "No of employees in your company",
                  disabled: false,
                  dependent: true,
                  dependentFieldName: "jobType",
                  dependentFieldValue: ["Self-employed"],
                  id: 5,
                  type: "text",
                  name: "noOfEmployees",
                  rules: { required: true, pattern: "/^([1-9]?\\d|100)$/" },
                  render: false,
                  indexed: "4",
                },
                {
                  label: "Company name",
                  disabled: false,
                  dependent: false,
                  id: 6,
                  type: "text",
                  name: "companyName",
                  rules: { required: true, pattern: "/^[A-Za-z ]*$/" },
                  render: true,
                  indexed: "5",
                },                
              ],
            },
          ])
        }        
   
        const res = await api.post("admin/create-partner", updatedData);
      
    };
      const deletePartnerConfig = async () => {
        const res = await api.delete("/delete/partnerConfig");
      };
    
      const deletePartner = async () => {
        const res = await api.delete("/delete/partner");
      };
      const deleteStaff = async () => {
        const res = await api.delete("/delete/staff");
      };
      const deleteUser = async () => {
        const res = await api.delete("/delete/user");
      };
      const deleteLoan = async () => {
        const res = await api.delete("/delete/loan");
      };
    
      const deleteBank = async () => {
        const res = await api.delete("/delete/bank");
      };

      const setHeaders = async () => {
        const res = await api.delete("/delete/bank");
      };
    
      // ******************get
      // ******************get
      // ******************get
      // ******************get
      // ******************get
      const getPartner = async () => {
        const res = await api.get("/partner");
        console.log(res?.data);
        setHeader(["Partner Id", "Partner Name"]);
        setTableData([{ id: res?.data[0]?.id, name: res?.data[0]?.name }]);
      };
    
      const getStaff = async () => {
        const res = await api.get("/staff");
        const updatedArray = res?.data.map((obj: any) => {
          delete obj.gender;
          delete obj.name;
          return obj;
        });
        setTableData(updatedArray);
        setHeader([
          "@Id",
          "Its Id",
          "Username",
          "Email",
          "Mobile",
          "Password",
          "isAuthorized",
          "Role",
        ]);
      };
    
      const getUser = async () => {
        const res = await api.get("/user");
        const updatedArray = res?.data.map((obj: any) => {
          delete obj.firstname;
          delete obj.middlename;
          delete obj.lastname;
          delete obj.address;
          delete obj.city;
          delete obj.pincode;
          return obj;
        });
        // const a = res?.data.map(({ firstname, middlename, lastname,  address, city, pincode, ...rest }:any) => rest);
        setTableData(updatedArray);
        setHeader(["@ Id", "Its id", "Mobile", "Email", "Residence Type"]);
      };
    
      const getLoan = async () => {
        const res = await api.get("/loan");
        const updatedArray = res?.data.map((obj: any) => {
          delete obj.reason;
          delete obj.noOfEmployees;
          delete obj.companyName;
          delete obj.companyType;
          delete obj.jobType;
          delete obj.loanTenure;
          delete obj.monthlySalary;
          return obj;
        });
        setTableData(updatedArray);
        setHeader([
          "@ Id",
          "Its id",
          "loanId",
          "Loan Amount",
          "isLoanActive",
          "Status",
          "date",
        ]);
      };
    
      const getBank = async () => {
        const res = await api.get("/bank");
        const updatedArray = res?.data.map((obj: any) => {
          delete obj.accountType;
          delete obj.bankName;
          delete obj.branch;
          delete obj.city;
          delete obj.ifscCode;
          delete obj.state;
          return obj;
        });
        setTableData(updatedArray);
        setHeader(["@ Id", "Its id", "Account No", , "Aadhaar No", "Pan No"]);
      };
    
   
  return (
    <>
    <div className="flex  flex-row mt-10 justify-center">     
      <button
        className="bg-red-700 ml-10 rounded-lg p-5 text-white"
        onClick={savePartnerConfig}
      >
        Save PartnerConfig
      </button>
      <button
        className="bg-red-700 ml-10 rounded-lg p-5 text-white"
        onClick={deletePartner}
      >
        Delete Partner
      </button>
      <button
        className="bg-red-700 ml-10 rounded-lg p-5 text-white"
        onClick={deleteStaff}
      >
        Delete Staff
      </button>
      <button
        className="bg-red-700 ml-10 rounded-lg p-5 text-white"
        onClick={deleteUser}
      >
        Delete User
      </button>
      <button
        className="bg-red-700 ml-10 rounded-lg p-5 text-white"
        onClick={deleteLoan}
      >
        Delete Loan
      </button>
      <button
        className="bg-red-700 ml-10 rounded-lg p-5 text-white"
        onClick={deleteBank}
      >
        Delete Bank
      </button>
    </div>

    <div className="flex  flex-row mt-20 justify-center">
      <button
        className="bg-blue-700 ml-10 rounded-lg p-5 text-white"
        onClick={getPartner}
      >
        Get Partner
      </button>
      <button
        className="bg-blue-700 ml-10 rounded-lg p-5 text-white"
        onClick={getStaff}
      >
        Get Staff
      </button>
      <button
        className="bg-blue-700 ml-10 rounded-lg p-5 text-white"
        onClick={getUser}
      >
        Get User
      </button>
      <button
        className="bg-blue-700 ml-10 rounded-lg p-5 text-white"
        onClick={getLoan}
      >
        Get Loan
      </button>
      <button
        className="bg-blue-700 ml-10 rounded-lg p-5 text-white"
        onClick={getBank}
      >
        Get Bank
      </button>
    </div>

  
  </>
  );
};

export default Delete;
