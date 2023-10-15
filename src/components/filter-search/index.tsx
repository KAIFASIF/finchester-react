import React from "react";
import RHFTextField from "../../libraries/form/RHFTextField";
import Button from "../button";

interface filterSearchProps {
  clearFilters: () => void;
  onClick?: () => void;
}
const FilterSearch: React.FC<filterSearchProps> = ({
  clearFilters,
  onClick,
}) => {
  return (
    <div className="grid  sm:grid-cols-12 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <RHFTextField name="search" placeholder="Search by name" />
      <RHFTextField
        name="startDate"
        type="date"
        shrinkLabel="From Date"
        InputLabelProps={{ shrink: true }}
      />
      <RHFTextField
        name="endDate"
        type="date"
        shrinkLabel="To Date"
        InputLabelProps={{ shrink: true }}
      />

      <Button
        label="Clear Filters"
        className="btn btn-primary"
        onClick={clearFilters}
      />
      <Button label="Submit" className="btn btn-primary" onClick={onClick} />
    </div>
  );
};

export default React.memo(FilterSearch);
