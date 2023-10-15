import React, { useEffect, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import RHFTextField from "../form/RHFTextField";
import RHFCheckedField from "../form/RHFCheckedField";
import RHFSelectField from "../form/RHFSelectField";
import { nameRegx } from "../../utilities/regex";

const SelectField = ({
  configName,
  index,
  clearField,
  dependentChecked,
  handleDependentChecked,
  renderChecked,
  handleRenderChecked,
  dependentOptions,
  constructDependentOption,
  handleKeyUp,
}: any) => {
  useEffect(() => {
    handleDependentOtions();
  }, [dependentOptions]);

  const [filteredDependentOptions, setfilteredDependentOptions] = useState<any>(
    []
  );
  const handleDependentOtions = () => {
    setfilteredDependentOptions(
      dependentOptions.filter((ele: any) => ele?.indexed !== index)
    );
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-10 underline"> Select Field</h1>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-11">
          <div className="grid grid-cols-2 gap-4">
            <RHFTextField
              name={`${configName}[${index}].label`}
              label="Enter Label"
              required
              configName={configName}
              index={index}
              pattern={nameRegx}
            />

            <RHFTextField
              label="Enter options"
              name={`${configName}[${index}].options`}
              required
              configName={configName}
              index={index}
            />

            {dependentChecked[index] && dependentOptions.length > 0 ? (
              <div className="flex gap-4">
                <RHFSelectField
                  label="Dependent field name"
                  defaultValue=""
                  options={filteredDependentOptions}
                  name={`${configName}[${index}].dependentFieldName`}
                />

                <RHFTextField
                  label="Dependent field value"
                  name={`${configName}[${index}].dependentFieldValue`}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <MdOutlineClear
            className="cursor-pointer text-red-600 text-2xl"
            onClick={(e: any) => clearField(configName, index)}
          />
        </div>
      </div>

      <div className="flex ">
        <RHFCheckedField
          label="Required"
          defaultChecked
          defaultValue
          name={`${configName}[${index}].required`}
        />
        <RHFCheckedField
          label="Disabled"
          defaultValue={false}
          name={`${configName}[${index}].disabled`}
        />
        <RHFCheckedField
          label="Render"
          name={`${configName}[${index}].render`}
          checked={renderChecked[index]}
          defaultValue={renderChecked[index]}
          onChange={(e: any) =>
            handleRenderChecked(configName, index, e.target.checked)
          }
        />

        <RHFCheckedField
          label="Dependent"
          checked={dependentChecked[index]}
          defaultValue={dependentChecked[index]}
          name={`${configName}[${index}].dependent`}
          onChange={(e: any) =>
            handleDependentChecked(configName, index, e.target.checked)
          }
        />

        <RHFCheckedField
          label="Multiple select"
          name={`${configName}[${index}].multiple`}
          defaultValue={false}
        />
      </div>
      <RHFTextField
        name={`${configName}[${index}].typeSelect`}
        style={{ display: "none" }}
      />
      <RHFTextField
        name={`${configName}[${index}].indexed`}
        style={{ display: "none" }}
        value={index}
      />
    </div>
  );
};

export default React.memo(SelectField);
