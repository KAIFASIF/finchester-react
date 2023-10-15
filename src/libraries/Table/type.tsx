export interface PaginationOptionsType {
  totalPageCount: number;
  defaultPageSize: number;
}

export interface PaginationPropsType extends PaginationOptionsType {
  refreshData: (newPage: number, newPageSize: number) => void;
}

export type ItemType = {
  ele: any;
};

export interface TablePropsType {
  headers: Array<string>;
  TableRow: React.FC<ItemType>;
  refreshTableData?: any
  // refreshTableData?: (newPage: number, newPageSize: number) => void;
  tableData: any[] | null;
  paginationOptions?: PaginationOptionsType;
  rowProps?: any;
}

export type TableBodyProps = {
  data: any[];
  TableRow: React.FC<ItemType>;
  rowProps?: any;
};

export type TableHeaderProps = {
  headers: Array<string>;
};
