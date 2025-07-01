import { useEffect, useState } from "react";
import { auth, db } from "../utils/Firebase";
import { collection, getDocs } from "firebase/firestore";
import SuccessModal from "../components/modals/SuccessModal";
import { deleteUser } from "firebase/auth";
import { colorPallete } from "../ColorTheme";

// MUI
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { buttonSizes, fontSizes } from "../Responsive";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    contact: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersArray);
        setFilteredUsers(usersArray);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEditClick = (userDoc) => {
    setSelectedUserId(userDoc.id);
    setFormData({
      firstName: userDoc.firstName || "",
      surName: userDoc.surName || "",
      contact: userDoc.contact || "",
    });
    setEditMode(true);
  };

  const handleDeleteProfile = (userId) => {
    const user = auth.currentUser;
    if (!user) {
      setErrorMessage("No authenticated user found.");
      return;
    }
    deleteUser(user)
      .then(() => {
        console.log(`User deleted from Firebase Auth: ${user.uid}`);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        setErrorMessage("Failed to delete user: " + error.message);
      });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log(`User updated (in memory): ${selectedUserId}`, formData);
    setEditMode(false);
    setErrorMessage(null);
  };

  const handleUserSearch = () => {
    const term = searchTerm.toLowerCase();
    const results = users.filter(
      (user) =>
        (user.firstName && user.firstName.toLowerCase().includes(term)) ||
        (user.surName && user.surName.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term)) ||
        (user.contact && user.contact.toLowerCase().includes(term))
    );
    setFilteredUsers(results);
  };

  return (
    <Box
      sx={{
        backgroundColor: colorPallete.pageBackgroundColorUserManage,
        minHeight: "100vh",
        margin: "-8px",
        padding: "8px",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {!editMode ? (
          <>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontSize: fontSizes.mainHeading, fontWeight: "bold" }}
            >
              User Management
            </Typography>
            <Typography variant="subtitle1">Manage your users here.</Typography>

            <Stack direction="row" spacing={2} mt={3} mb={3}>
              <TextField
                label="Search users..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleUserSearch}
                sx={{
                  minWidth: buttonSizes.subButton.minWidth,
                  fontSize: buttonSizes.subButton.fontSize,
                  padding: buttonSizes.subButton.padding,
                }}
              >
                Search
              </Button>
            </Stack>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Surname</TableCell>
                    <TableCell>Email Address</TableCell>
                    <TableCell>Account Created</TableCell>
                    <TableCell>Last Login</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7}>No users found.</TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.surName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>12-10-2024</TableCell>
                        <TableCell>22-06-2025</TableCell>
                        <TableCell>{user.mode || "client"}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              sx={{
                                minWidth: buttonSizes.iconButton.minWidth,
                                fontSize: buttonSizes.iconButton.fontSize,
                                padding: buttonSizes.iconButton.padding,
                              }}
                              variant="outlined"
                              onClick={() => handleEditClick(user)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => handleDeleteProfile(user.id)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Box component="form" onSubmit={handleSaveChanges} sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Edit User
            </Typography>
            <TextField
              fullWidth
              label="First Name"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Surname"
              id="surName"
              value={formData.surName}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Contact Number"
              id="contact"
              value={formData.contact}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            {errorMessage && (
              <Typography color="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained">
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </Stack>
          </Box>
        )}

        {showSuccessModal && (
          <SuccessModal
            message="The account has been deleted successfully!"
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </Container>
    </Box>
  );
};

export default UserManage;
