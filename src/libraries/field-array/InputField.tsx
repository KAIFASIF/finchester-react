import React from "react";
import { MdOutlineClear } from "react-icons/md";
import RHFTextField from "../form/RHFTextField";
import RHFSelectField from "../form/RHFSelectField";
import {
  GSTINRegx,
  accountNumRegx,
  adhaarRegx,
  amountRegx,
  emailRegx,
  ifscRegx,
  mobileRegx,
  nameNumRegx,
  nameRegx,
  numRegx,
  onlyCharRegx,
  panRegx,
  pincodeRegx,
} from "../../utilities/regex";
import RHFCheckedField from "../form/RHFCheckedField";

const options = [
  {
    id: 1,
    label: "Name",
    value: nameRegx.toString(),
  },
  {
    id: 2,
    label: "Name and number",
    value: nameNumRegx.toString(),
  },
  {
    id: 3,
    label: "Mobile",
    value: mobileRegx.toString(),
  },

  {
    id: 4,
    label: "Email",
    value: emailRegx.toString(),
  },
  {
    id: 5,
    label: "Amount",
    value: amountRegx.toString(),
  },
  {
    id: 6,
    label: "Number",
    value: numRegx.toString(),
  },

  {
    id: 7,
    label: "Pincode",
    value: pincodeRegx.toString(),
  },

  {
    id: 8,
    label: "Account number",
    value: accountNumRegx.toString(),
  },
  {
    id: 9,
    label: "Ifsc",
    value: ifscRegx.toString(),
  },
  {
    id: 10,
    label: "GST",
    value: GSTINRegx.toString(),
  },
  {
    id: 11,
    label: "Aadhaar",
    value: adhaarRegx.toString(),
  },
  {
    id: 12,
    label: "Pan",
    value: panRegx.toString(),
  },
  {
    id: 13,
    label: "Only characters",
    value: onlyCharRegx.toString(),
  },
];

const InputField = ({
  index,
  configName,
  clearField,
  requiredChecked,
  disabledChecked,
  renderChecked,
  dependentChecked,
  handleRequiredChecked,
  handleDisabledChecked,
  handleDependentChecked,
  handleRenderChecked,
  dependentOptions,
}: any) => {
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-10 underline"> Input Field</h1>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-11">
          <div className="grid grid-cols-1 gap-4">
            <RHFTextField
              name={`${configName}[${index}].label`}
              label="Enter Label"
              required
              configName={configName}
              index={index}
            />

            <RHFSelectField
              label="Select pattern"
              name={`${configName}[${index}].pattern`}
              defaultValue=""
              options={options}
              configName={configName}
              index={index}
            />

            {dependentChecked[index] && dependentOptions.length > 0 ? (
              <div className="flex gap-4">
                <RHFSelectField
                  label="Dependent field name"
                  defaultValue=""
                  options={dependentOptions}
                  name={`${configName}[${index}].dependentFieldName`}
                />

                <RHFTextField
                  label="Dependent field value"
                  name={`${configName}[${index}].dependentFieldValue`}
                />
              </div>
            ) : null}

            <div className="flex">
              <RHFCheckedField
                label="Required"
                name={`${configName}[${index}].required`}
                checked={requiredChecked[index]}
                onChange={(e: any) =>
                  handleRequiredChecked(configName, index, e.target.checked)
                }
              />
              <RHFCheckedField
                label="Disabled"
                name={`${configName}[${index}].disabled`}
                checked={disabledChecked[index]}
                onChange={(e: any) =>
                  handleDisabledChecked(configName, index, e.target.checked)
                }
              />
              <RHFCheckedField
                label="Render"
                name={`${configName}[${index}].render`}
                checked={renderChecked[index]}
                onChange={(e: any) =>
                  handleRenderChecked(configName, index, e.target.checked)
                }
              />

              <RHFCheckedField
                label="Dependent"
                checked={dependentChecked[index]}
                name={`${configName}[${index}].dependent`}
                onChange={(e: any) =>
                  handleDependentChecked(configName, index, e.target.checked)
                }
              />
            </div>
            <RHFTextField
              name={`${configName}[${index}].typeText`}
              style={{ display: "none" }}
            />
            <RHFTextField
              name={`${configName}[${index}].indexed`}
              style={{ display: "none" }}
              value={index}
            />
          </div>
        </div>

        <div>
          <MdOutlineClear
            className="cursor-pointer text-red-600 text-2xl"
            onClick={() => clearField(index)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(InputField);
