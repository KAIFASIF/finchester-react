import React from "react";
import Table from "../../libraries/Table";
import SummmaryRow from "./SummmaryRow";

interface summaryTableProps {
  loans: any;
  handleRefreshData: any;
  count: number;
  size: number;
}
const SummaryTable: React.FC<summaryTableProps> = ({
  loans,
  handleRefreshData,
  count,
  size,
}) => {
  const headers: string[] = [
    "Mobile",
    "Email",
    "Date",
    "Loan id",
    "Amount",
    "Status",
    "Action",
  ];
  return (
    <div className="mt-5">
      <Table
        headers={headers}
        TableRow={SummmaryRow}
        tableData={loans}
        refreshTableData={handleRefreshData}
        paginationOptions={{
          totalPageCount: count,
          defaultPageSize: size,
        }}
      />
    </div>
  );
};

export default React.memo(SummaryTable);
