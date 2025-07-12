import { checkLogInValidateData } from "../utils/Validate";

export const userLogin = (email, password, rememberChecked) => {
    // Validate email and password
  const message = checkLogInValidateData(email, password);
  if (message) {return message; }

    // Remember Me Check
    if (rememberChecked) {
    console.log("Remember Me is checked");
    // Token Logic
    }

    //Login Logic form API
    return null;
};