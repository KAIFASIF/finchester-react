import { DynamicFormFieldType } from "./types";

const formField: DynamicFormFieldType[] = [
    {
      label: 'Reason for Loan trextfiled',
      name: 'details',
      type: 'text',
      defaultValue: '',
      rules: { required: true },
      options: [{ label: 'Course Financing', value: 'Course Financing' }],
    },
    {
      label: 'Reason for Loan select',
      name: 'details',
      type: 'select',
      defaultValue: '',
      rules: { required: true },
      options: [{ label: 'Course Financing', value: 'Course Financing' }],
    },
    {
      label: 'Course Opted for',
      name: 'otherDetails',
      type: 'select',
      defaultValue: '',
      rules: { required: true },
      options: [
        { label: 'Beauty', value: 'Beauty' },
        { label: 'Culinary', value: 'Culinary' },
      ],
    }]