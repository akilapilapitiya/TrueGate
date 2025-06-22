import { useEffect, useState } from 'react';
import { auth, db } from '../utils/Firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../styles/pages/UserManage.css';
import SuccessModal from '../components/modals/SuccessModal';
import { deleteUser } from 'firebase/auth';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    contact: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersArray);
        setFilteredUsers(usersArray); // Set initially
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Input change handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Edit button click
  const handleEditClick = (userDoc) => {
    setSelectedUserId(userDoc.id);
    setFormData({
      firstName: userDoc.firstName || '',
      surName: userDoc.surName || '',
      contact: userDoc.contact || ''
    });
    setEditMode(true);
  };

  // Delete logic (Auth only, Firestore is commented)
  const handleDeleteProfile = (userId) => {
    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("No authenticated user found.");
      return;
    }

    deleteUser(user)
      .then(() => {
        // Commented out Firestore deletion
        /*
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
        */
        console.log(`User deleted from Firebase Auth (not Firestore): ${user.uid}`);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        setErrorMessage("Failed to delete user: " + error.message);
      });
  };

  // Save form data (Firestore update commented out)
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    /*
    try {
      const userDocRef = doc(db, 'users', selectedUserId);
      await updateDoc(userDocRef, {
        firstName: formData.firstName,
        surName: formData.surName,
        contact: formData.contact
      });
    } catch (error) {
      setErrorMessage("Failed to update user: " + error.message);
      return;
    }
    */
    console.log(`User updated (in memory): ${selectedUserId}`, formData);
    setEditMode(false);
    setErrorMessage(null);
  };

  // Search function
  const handleUserSearch = () => {
    const term = searchTerm.toLowerCase();
    const results = users.filter(user =>
      (user.firstName && user.firstName.toLowerCase().includes(term)) ||
      (user.surName && user.surName.toLowerCase().includes(term)) ||
      (user.email && user.email.toLowerCase().includes(term)) ||
      (user.contact && user.contact.toLowerCase().includes(term))
    );
    setFilteredUsers(results);
  };

  return (
    <div className='user-manage-container'>
      {!editMode ? (
        <div className="display-users">
          <div className="header">
            <h1>User Management</h1>
            <p>Manage your users here.</p>
          </div>

          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleUserSearch}>Search</button>
          </div>

          <div className="view-container">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Surname</th>
                  <th>Email Address</th>
                  <th>Account Created</th>
                  <th>Last Login</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7">No users found.</td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.firstName}</td>
                      <td>{user.surName}</td>
                      <td>{user.email}</td>
                      <td>12-10-2024</td>
                      <td>22-06-2025</td>
                      <td>{user.mode || 'client'}</td>
                      <td>
                        <button onClick={() => handleEditClick(user)}>Edit</button>
                        <button onClick={() => handleDeleteProfile(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="profile-changer-container">
          <form onSubmit={handleSaveChanges}>
            <div className="first-name-box">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="surname-name-box">
              <label htmlFor="surName">Surname</label>
              <input
                type="text"
                id="surName"
                value={formData.surName}
                onChange={handleInputChange}
              />
            </div>
            <div className="contact-box">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="text"
                id="contact"
                value={formData.contact}
                onChange={handleInputChange}
              />
            </div>
            <div className="error-message">
              <p className="error-message">{errorMessage}</p>
            </div>
            <div className="action-buttons">
              <button type="submit" className="save-info-button">Save Information</button>
              <button type="button" className="back-view-button" onClick={() => setEditMode(false)}>Return to View Mode</button>
            </div>
          </form>
        </div>
      )}

      {showSuccessModal && (
        <SuccessModal
          message="The account has been deleted successfully!"
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default UserManage;
