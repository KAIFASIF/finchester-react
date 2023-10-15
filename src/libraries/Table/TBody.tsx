import { FC } from "react";
import { TableBodyProps } from "./type";

const TableBody: FC<TableBodyProps> = ({ data, TableRow, rowProps = {} }) => {
  return (
    <tbody>
      {data?.map((ele: any, index) => {
        return <TableRow {...rowProps} ele={ele} key={ele?.id} />;
      })}
    </tbody>
  );
};
export default TableBody;
