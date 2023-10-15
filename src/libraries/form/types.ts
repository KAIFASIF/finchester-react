export type optionType = { id:number; label: string; value: string | number; Ifselected?: string[] };
export type conditionalType = { value: string; field: string };
export type ruleType = { required?: boolean; regex?: string; errorMessage?: string };

export interface DynamicFormFieldType {
  name: string;
  label: string;
  isConditional?: boolean;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'datetime' | 'number' | 'password' | 'optionalSelect';
  options?: optionType[];
  placeholder?: string;
  defaultValue?: string;
  rules?: ruleType;
  conditional?: conditionalType[];
}

export interface DynamicFormFieldProps extends DynamicFormFieldType {
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
