import users from '../data/user.json';

export function login(email, password, navigate, setErrorMessage, dispatchUser) {
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (user) {
    // Save to localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', user.firstName);
    localStorage.setItem('userRole', user.role);

    // Update redux state
    if (dispatchUser) {
      dispatchUser({
        email: user.email,
        firstName: user.firstName,
        surname: user.surname,
        role: user.role,   
        originalRole: user.role,
        gender: user.gender,
        birthDate: {
          day: user.birthDate,
          month: user.birthMonth,
          year: user.birthYear
        }
      });

       localStorage.setItem('user', JSON.stringify({
        email: user.email,
        firstName: user.firstName,
        surname: user.surname,
        role: user.role,
        originalRole: user.role,
        gender: user.gender,
        birthDate: {
        day: user.birthDate,
        month: user.birthMonth,
        year: user.birthYear
    }
  }));
    }

    if (user.role === 'admin') {
      console.log('Admin logged in');
      navigate('/dashboard');
    } else {
      console.log('User logged in');
      navigate('/profile');
    }
  } else {
    setErrorMessage('Invalid email or password');
    console.log('Login failed: Invalid email or password');

    if (dispatchUser) {
      dispatchUser(null); // clear user state on failure
    }
  }
}

export function logout(navigate, dispatchUser) {
  localStorage.clear();
  if (dispatchUser) dispatchUser(null);
  navigate('/');
}
