import { FC, useState } from "react";
import { TablePagination } from "@mui/material";
import { PaginationPropsType } from "./type";
import { useEffect } from "react";

const Pagination: FC<PaginationPropsType> = (props) => {
  const { totalPageCount, refreshData, defaultPageSize } = props;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [currentPageSize, setPageSize] = useState<number>(defaultPageSize);

  const rowsPerPageOptions = [3, 5, 10, 20, 30];

  useEffect(() => {
    refreshData(currentPage, currentPageSize);
  }, [currentPage, currentPageSize, refreshData]);
  // alert(totalPageCount)
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions || [5, 7, 10, 50, 100]}
      component="div"
      className="table-pagination"
      count={Number(totalPageCount)}
      rowsPerPage={currentPageSize}
      page={currentPage}
      onPageChange={(e, newPage) => setCurrentPage(newPage)}
      onRowsPerPageChange={(e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0);
      }}
      showFirstButton
      showLastButton
      labelDisplayedRows={({ from, to, page }) =>
        `Page: ${page + 1} of ${
          Math.floor(totalPageCount / currentPageSize) + 1
        } ${
          (to + 1 - from) % currentPageSize !== 0
            ? `(${to + 1 - from} rows)`
            : ""
        }`
      }
    />
  );
};

export default Pagination;
