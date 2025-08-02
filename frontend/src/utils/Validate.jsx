export const checkLogInValidateData = (email, password) => {
  //Regex
  const isEmailVaild = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailVaild) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";
  return null;
};

export const checkSignUpValidateData = (
  email,
  password,
  rePassword,
  firstName,
  surName,
  dob,
  contact,
  gender
) => {
  //Regex
  const isFirstNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(firstName);
  const isSurNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(surName);
  const isEmailVaild = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isDateValid = /^\d{4}-\d{2}-\d{2}$/.test(dob);
  const isContactValid = /^\d{10}$/.test(contact);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isRePasswordValid = password == rePassword;

  if (!isFirstNameValid) return "First name is not valid";
  if (!isSurNameValid) return "Last Name is not valid";
  if (!isEmailVaild) return "Email ID is not valid";
  if (!isDateValid) return "Date of Birth is not valid";
  if (!isContactValid) return "Contact number is not valid";
  if (!gender) return "Select a gender";
  if (!isPasswordValid) return "Password is not valid";
  if (!isRePasswordValid) return "Re-entered password does not match";
  return null;
};

export const profileUpdateValidateData = (firstName, surName, contact) => {
  // Clean input
  const cleanFirstName = firstName.trim();
  const cleanSurName = surName.trim();
  const cleanContact = contact.trim();

  // Regex
  const isFirstNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(cleanFirstName);
  const isSurNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(cleanSurName);
  const isContactValid = /^\d{10}$/.test(cleanContact);


  if (!isFirstNameValid) return "First Name is not valid";

  if (!isSurNameValid) return "Last Name is not valid";
  if (!isContactValid) return "Contact number is not valid";
  return null;
};

export const emailValidation = (email) => {
  const isEmailVaild = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  if (!isEmailVaild) return "Email ID is not valid";
  return null;

} 

export const newPasswordValidateData = (newPassword, reNewPassword) => {
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(newPassword);
  const isRePasswordValid = newPassword == reNewPassword;

  if (!isPasswordValid) return "Password is not valid";
  if (!isRePasswordValid) return "Re-entered password does not match";
  return null;
};
