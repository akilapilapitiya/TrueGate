import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUpdateValidateData } from "../utils/Validate";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../utils/Firebase";
import Loading from "../components/Loading";
import { addUser } from "../utils/UserSlice";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import { deleteUser } from "firebase/auth";
import SuccessModal from "../components/modals/SuccessModal";

const Profile = () => {
  const store = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    contact: "",
  });

  // Redirect to login if no user
  useEffect(() => {
    if (!store) {
      const timeout = setTimeout(() => {
        navigate("/login");
      }, 1500); // 1.5 seconds

      return () => clearTimeout(timeout); // cleanup
    } else {
      setFormData({
        firstName: store.firstName || "",
        surName: store.surName || "",
        contact: store.contact || "",
      });
    }
  }, [store, navigate]);

  if (!store) {
    return (
      <div className="profile-container">
        <Loading />
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const { firstName, surName, contact } = formData;

    const message = profileUpdateValidateData(firstName, surName, contact);
    setErrorMessage(message);
    if (message) return;

    try {
      const userDocRef = doc(db, "users", store.uid);
      await updateDoc(userDocRef, { firstName, surName, contact });

      //Manually update Redux store
      dispatch(
        addUser({
          ...store, // preserve existing data
          firstName,
          surName,
          contact,
        })
      );
      setEditMode(false);
    } catch (error) {
      setErrorMessage("Failed to update profile: " + error.message);
    }
  };

  const handleProfileDelete = () => {
    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("No authenticated user found.");
      return;
    }

    deleteUser(user)
      .then(() => {
        dispatch(addUser(null)); // Clear Redux store
        setShowSuccessModal(true); // Show success modal
      })
      .catch((error) => {
        setErrorMessage("Failed to delete user: " + error.message);
      });
  };

  return (
    <div className="profile-container">
      {editMode ? (
        <div className="profile-changer-container">
          <form onSubmit={handleSaveChanges}>
            {/* form inputs as before */}
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
              <button type="submit" className="save-info-button">
                Save Information
              </button>
              <button
                type="button"
                className="back-view-button"
                onClick={() => setEditMode(false)}
              >
                Return to View Mode
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="profile-display-container">
          <h1>Welcome back {store.firstName}</h1>
          <p>Let's get you through your profile</p>
          <div className="profile-details">
            <p>
              <strong>First Name:</strong> {store.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {store.surName}
            </p>
            <p>
              <strong>Email:</strong> {store.email}
            </p>
            <p>
              <strong>Contact:</strong> {store.contact}
            </p>
          </div>
          <div className="action-buttons">
            <button
              className="change-info-button"
              onClick={() => setEditMode(true)}
            >
              Change Personal Info
            </button>
            <button
              className="change-password-button"
              onClick={() => navigate("/resetpassword")}
            >
              Change Password
            </button>
            <button
              className="delete-account-button"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleProfileDelete}
        />
      )}
      {showSuccessModal && (
        <SuccessModal
          message="Your account has been deleted successfully!"
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/login"); // optional navigation after close
          }}
        />
      )}
    </div>
  );
};

export default Profile;
