export const checkValidData = (email, password)=> {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    if(!isEmailValid) return "Email is not Valid";
    if(!isPasswordValid) return "Password is not Valid";

    return null;

};

export const checkInputData = (firstName, surName, day, month, year, gender, password, rePassword) => {
  const isFirstNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(firstName);
  const isSurNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(surName);

  // Convert to numbers
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);

  const isDayValid = /^\d{1,2}$/.test(day) && d >= 1 && d <= 31;
  const isMonthValid = /^\d{1,2}$/.test(month) && m >= 1 && m <= 12;
  const isYearValid = /^\d{4}$/.test(year) && y >= 1900 && y <= 2099;

  const isDateValid = (d, m, y) => {
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  };

  const isGenderValid = gender?.trim() !== "";

  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isRePasswordValid = password === rePassword;

  if (!isFirstNameValid) return "First name is not valid";
  if (!isSurNameValid) return "Surname is not valid";
  if (!isDayValid) return "Day is not valid";
  if (!isMonthValid) return "Month is not valid";
  if (!isYearValid) return "Year is not valid";
  if (!isDateValid(d, m, y)) return "Date is not valid";
  if (!isGenderValid) return "Please select a gender";
  if (!isPasswordValid) return "Password is not valid";
  if (!isRePasswordValid) return "Re-entered password does not match";

  return null;
};
