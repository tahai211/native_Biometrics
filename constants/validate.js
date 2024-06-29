import * as yup from "yup";
import { translate } from "../localization/localization";

export const validateUsername = yup
  .string()
  .required("Username is required")
  .matches(/^[a-zA-Z0-9_]*$/, "Username must not contain special characters");

export const validatePassword = yup.string().required("Password is required");
export const validateRequire = (type, text) => {
  switch (type) {
    case 'string':
      return yup.string().required(translate(text))
    case 'object':
      return yup.object().test('no-undefined-values',
        translate(text),
        function (value) {
          if (!value) return true; // If nestedObject is undefined or null, no further validation needed
          const values = Object.values(value);
          return values.every(val => val !== undefined);
        }
      ).required(translate(text))
    case 'date':
      return yup.date().required(text)
    default:
      break;
  }

}

export const validateDateRange = (fromDate, toDate) => {
  const schema = yup.object().shape({
    fromDate: yup.date().required().label('From Date'),
    toDate: yup.date().required().label('To Date'),
  });

  try {
    schema.validateSync({ fromDate, toDate }, { abortEarly: false });

    if (fromDate < toDate) {
      return null; // No error, date range is valid
    } else {
      return { error: translate('fromdatecantnotbegreaterthantodate') }; // Error message
    }
  } catch (error) {
    // Validation failed, extract error messages from Yup
    const yupErrors = error.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.errors[0] };
    }, {});
    return { error: yupErrors };
  }
};


// export const validateDate = ()=>{
//  return  validateFormSchema = yup.object().shape({
//     fromDate: ,
//     toDate: yup.date().required('toDate is required')
//       .test('toDate', 'toDate must be greater than fromDate', function (value) {
//         const { fromDate } = this.parent; // Access the fromDate field in the form data
//         return !fromDate || (value && value > fromDate);
//       }),
//   });
// }
