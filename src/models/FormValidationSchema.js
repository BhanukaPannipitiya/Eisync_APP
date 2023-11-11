import * as Yup from "yup";

export const SignupSchemaFirstPageSchema = Yup.object().shape({
  usernameInput: Yup.string()
    .email("Email is not valid*")
    .matches(
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Email is not valid"
    )
    .required("Required*"),
  passwordInput: Yup.string()
    .matches(
      /^(?=.[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password is not valid"
    )
    // Must contain Minimum eight and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character*
    .required("Required*"),
  confirmPasswordInput: Yup.string()
    .oneOf(
      [Yup.ref("passwordInput")],
      "Confirm password does not match password*"
    )
    .required("Required*"),
});

export const SignupSchemaSecondPageSchema = Yup.object().shape({
  firstNameInput: Yup.string().required("Required*"),
  lastNameInput: Yup.string(),
  nicknameInput: Yup.string(),
  dateInput: Yup.date().required("Required*"),
  genderInput: Yup.string().required("Required*"),
  countryInput: Yup.string().required("Required*"),
  cityInput: Yup.string().required("Required*"),
  weightInput: Yup.number().typeError("Weight is not valid*").nullable(),
  heightInput: Yup.number().typeError("Height is not valid*").nullable(),
  calorieGoalInput: Yup.number()
    .typeError("Calorie goal is not valid*")
    .nullable(),
  weightUnitInput: Yup.string()
    .test("weightUnitTest", "Unit required*", function (value) {
      let result = true;
      if (this.parent.weightInput == undefined) {
        result = true;
      } else {
        if (isNaN(this.parent.weightInput) == false) {
          if (value == undefined || value == "" || value == "undefined") {
            result = false;
          } else {
            result = true;
          }
        } else {
          result = true;
        }
      }
      return result;
    })
    .nullable(),
  heightUnitInput: Yup.string()
    .test("heightUnitTest", "Unit required*", function (value) {
      let result = true;
      if (this.parent.heightInput == undefined) {
        result = true;
      } else {
        if (isNaN(this.parent.heightInput) == false) {
          if (value == undefined || value == "" || value == "undefined") {
            result = false;
          } else {
            result = true;
          }
        } else {
          result = true;
        }
      }
      return result;
    })
    .nullable(),
});

export const ForgotPasswordPageSchema = Yup.object().shape({
  usernameInput: Yup.string()
    .email("Email is not valid*")
    .matches(
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Email is not valid"
    )
    .required("Required*"),
});

export const ChangePasswordPageSchema = Yup.object().shape({
  currentPasswordInput: Yup.string().required("Required*"),
  newPasswordInput: Yup.string()
    .matches(
      /^(?=.[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password is not valid"
    )
    .required("Required*"),
  confirmNewPasswordInput: Yup.string()
    .oneOf(
      [Yup.ref("newPasswordInput")],
      "Confirm password does not match new password*"
    )
    .required("Required*"),
});

export const SigninPageSchema = Yup.object().shape({
  usernameInput: Yup.string()
    .email("Email is not valid*")
    .matches(
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Email is not valid"
    )
    .required("Required*"),
  currentPasswordInput: Yup.string().required("Required*"),
});

export const ResetPasswordPageSchema = Yup.object().shape({
  newPasswordInput: Yup.string()
    .matches(
      /^(?=.[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      "Password is not valid"
    )
    .required("Required*"),
  confirmNewPasswordInput: Yup.string()
    .oneOf(
      [Yup.ref("newPasswordInput")],
      "Confirm password does not match new password*"
    )
    .required("Required*"),
});
