import { createTheme } from "@mui/material/styles";

const colorPallete = {
  // Background Configs
  navbarBackgroundColor: "rgb(8, 8, 20)",
  pageBackgroundColorLogin:
    `radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.2), transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(0, 204, 255, 0.15), transparent 30%),
      linear-gradient(135deg, #0f0c29, #302b63, #ff007f, #000000)`,
  pageBackgroundColorRegister:
    `radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.2), transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(0, 204, 255, 0.15), transparent 30%),
      linear-gradient(135deg, #0f0c29, #302b63, #ff007f, #000000)`,
  pageBackgroundColorLanding:
    `radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.2), transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(0, 204, 255, 0.15), transparent 30%),
      linear-gradient(135deg, #0f0c29, #302b63, #ff007f, #000000)`,
  pageBackgroundColorProfile: 
    `radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.2), transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(0, 204, 255, 0.15), transparent 30%),
      linear-gradient(135deg, #0f0c29, #302b63, #ff007f, #000000)`,
  pageBackgroundColorPasswordReset: 
    `radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.2), transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(0, 204, 255, 0.15), transparent 30%),
      linear-gradient(135deg, #0f0c29, #302b63, #ff007f, #000000)`,
  pageBackgroundColorUserManage: "rgb(255, 0, 0)",
  pageBackgroundColorDashboard: "rgb(0, 255, 255)",
  pageBackgroundColorHome:
    `radial-gradient(circle at 20% 30%, rgba(255, 0, 128, 0.2), transparent 25%),
      radial-gradient(circle at 80% 70%, rgba(0, 204, 255, 0.15), transparent 30%),
      linear-gradient(135deg, #0f0c29, #302b63, #ff007f, #000000)`,
  pageBackgroundColorNotFound: "rgb(255, 192, 203)",
  pageBackgroundColorError: "rgb(128, 0, 128)",

  //Container Colors
  containerBackgroundColorLogin: "rgba(0, 0, 0, 0.7)",
  containerBackgroundColorRegister: "rgba(0, 0, 0, 0.7)",
  containerBackgroundColorProfile: "rgba(0, 0, 0, 0.7)",
  containerBackgroundColorPasswordReset: "rgba(0, 0, 0, 0.7)",

  //Register
  textFieldBackgroundColor: "rgba(0, 0, 0, 0.7)",
  registerPageNormalText: "rgb(255, 255, 255)",
  selectorActiveColor:'rgb(255, 0, 127)',

  //LOGIN PAGE and REGISTER PAGE

  //Login Button
  buttonBackgroundColorLogin: "rgb(255, 0, 127)",
  buttonHoverBackgroundColorLogin: "rgb(255, 255, 255)",
  buttonActiveBackgroundColorLogin: "rgb(255, 255, 255)",

  buttonHoverTextColorLogin: "rgb(255, 0, 127)",
  buttonActiveTextColorLogin: "rgb(255, 0, 127)",
  buttonTextColorLogin: "rgb(255, 255, 255)",

  buttonHoverBorderColorLogin: "rgb(255, 0, 127))",
  buttonActiveBorderColorLogin: "rgb(255, 0, 127)",
  buttonBorderColorLogin: "rgb(255, 0, 127)",

  //Register Button
  buttonBackgroundColorRegister: "rgb(255, 255, 255)",
  buttonHoverBackgroundColorRegister: "rgb(57, 34, 139)",
  buttonActiveBackgroundColorRegister: "rgb(57, 34, 139)",

  buttonTextColorRegister: "rgb(57, 34, 139)",
  buttonHoverTextColorRegister: "rgb(255, 255, 255)",
  buttonActiveTextColorRegister: "rgb(255, 255, 255)",

  buttonBorderColorRegister: "rgb(57, 34, 139)",
  buttonHoverBorderColorRegister: "rgb(57, 34, 139)",
  buttonActiveBorderColorRegister: "rgb(57, 34, 139)",

  linkColorForgotPassword: "rgb(255, 255, 255)",

  // LANDING PAGE
  tileAccentColor: "rgb(255, 255, 255)",
  tileBackgroundColor: "rgba(0, 0, 0, 0.7)",
  tileHoverBackgroundColor: "rgba(10, 18, 26, 0.92)",


  //HOME PAGE
  registerButtonColor: 'rgb(255, 0, 127)',
  registerButtonAccentColor: 'rgb(255, 255, 255)',
 registerButtonHoverColor: 'rgb(255, 255, 255)', 
 registerButtonHoverAccentColor: 'rgb(255, 0, 127)',
  loginButtonColor: 'rgb(255, 255, 255)',
  loginButtonAccentColor: 'rgb(48, 43, 99)',
  loginButtonHoverColor: 'rgb(48, 43, 99)',
  loginButtonHoverAccentColor: 'rgb(255, 255, 255)',

  homeFooterBackgroundColor: "rgb(8, 8, 20)",

  //LOGIN PAGE
  loginPageNormalText: "rgb(255, 255, 255)",

  //NAVBAR
  navbarProfileNameButton:'rgb(8, 8, 20)',
  navbarProfileNameButtonAccent: 'rgb(255, 255, 255)',

  navbarLinkButton:'rgb(8, 8, 20)',
  navbarLinkButtonAccent: 'rgb(255, 255, 255)',


  //PASSWORD RESET PAGE
  passwordResetPageNormalText: "rgb(255, 255, 255)",

  //PROFILE PAGE
  profilePageNormalText: "rgb(255, 255, 255)",
  updateButtonColor: 'rgb(255, 0, 127)',
  updateButtonAccentColor: 'rgb(255, 255, 255)',
  updateButtonHoverColor: 'rgb(255, 255, 255)', 
  updateButtonHoverAccentColor: 'rgb(255, 0, 127)',
  changePasswordButtonColor: 'rgb(255, 255, 255)',
  changePasswordButtonAccentColor: 'rgb(48, 43, 99)',
  changePasswordButtonHoverColor: 'rgb(48, 43, 99)',
  changePasswordButtonHoverAccentColor: 'rgb(255, 255, 255)',

  profileModeIconColor: 'rgb(48, 43, 99)',


  // Success Model
  successPageNormalText: "rgb(255, 255, 255)",
  successModalBackgroundColor: 'rgba(0, 0, 0, 0.7)',
  
  




};

export { colorPallete };
