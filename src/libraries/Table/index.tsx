import React, { FC } from "react";
import { CircularProgress, Typography } from "@mui/material";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import TableBody from "./TBody";
import { TablePropsType } from "./type";

const Table: FC<TablePropsType> = ({
  tableData,
  headers,
  paginationOptions,
  TableRow,
  refreshTableData,
  rowProps = {},
}) => {
  return (
    <div className="relative overflow-x-auto shadow-xl ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader headers={headers} />
        {tableData?.length ? (
          <TableBody rowProps={rowProps} TableRow={TableRow} data={tableData} />
        ) : tableData?.length === 0 ? (
          <tbody >
            <tr>
              <td colSpan={100}>
                <div className="w-full flex justify-center p-10">
                  <Typography>Oops.. looks like there is no data</Typography>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody >
            <tr>
              <td>
                <div className="w-full flex justify-center">
                  <CircularProgress />
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    
      {paginationOptions && (
        <Pagination          
          totalPageCount={paginationOptions.totalPageCount}
          defaultPageSize={paginationOptions.defaultPageSize}
          refreshData={refreshTableData}
        />
      )}
      </div>
   
  );
};

export default React.memo(Table)
