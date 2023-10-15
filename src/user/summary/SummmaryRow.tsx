import React from "react";
import { useNavigate } from "react-router-dom";
import { getFormatedDate } from "../../utilities/dates";

const SummaryRow = ({ ele }: any) => {
  const navigate = useNavigate();
  return (
    <tr className="tableBodyTr">
      <td className="tableBodyTd"> {ele?.profileMobile}</td>
      <td className="tableBodyTd"> {ele?.profileEmail}</td>
      <td className="tableBodyTd"> {getFormatedDate(ele?.loan.date)}</td>

      <td className="tableBodyTd"> {ele?.loan?.loanId}</td>
      <td className="tableBodyTd"> {ele?.loan?.loanAmount}</td>
      <td
        className="tableBodyTd cursor-pointer underline"
        onClick={() =>
          navigate(
            `/loan-application/${ele?.loan?.loanId}?status=${ele?.loan?.status}`
          )
        }
      >
        {" "}
        {ele?.loan?.status}
      </td>
      <td className="tableBodyTd"> Action</td>
    </tr>
  );
};

export default React.memo(SummaryRow);
