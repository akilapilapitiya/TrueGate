import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import maleIcon from "../assets/male.png";
import femaleIcon from "../assets/female.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  //Temp Data
  const gender = "male";
  const firstName = "Mahinda";
  const lastName = "Wickramasinghe";
  const email = "mahainda@gmail.com";
  const tel = "0123456789";

  const usersArray = [
    {id: "0001", name: "Namal", email: "namal@mail.com" },
    {id: "0001", name: "Kamala", email: "kamal@gmail.com" },
  ];

  const profileIcon = gender === "male" ? maleIcon : femaleIcon;

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        py: 6,
        px: { xs: 2, sm: 3, md: 6 },
        boxSizing: "border-box",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Profile
              </Typography>

              <Box
                component="img"
                src={profileIcon}
                alt="Profile icon"
                sx={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #1976d2",
                }}
              />

              <Box sx={{ width: "100%", mt: 2 }}>
                <Typography>Email: {email}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>First Name: {firstName}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>Last Name: {lastName}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>Phone Number: {tel}</Typography>
              </Box>
              <Container sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="contained">Edit Profile</Button>
                <Button variant="contained"
                onClick={() => {navigate("/password-reset")}}
                >Change Password</Button>
                <Button variant="contained">Delete Account</Button>
                </Container>
            </Paper>
          </Grid>

          {/* Dependents Section */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                minHeight: "100%",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Dependants
              </Typography>

              {usersArray.map((user, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: "#f0f4ff",
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Name: {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {user.email}
                  </Typography>
                  {index < usersArray.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
              <Container sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="contained">Add new Dependants</Button>
              <Button variant="contained">Remove Dependants</Button>
              </Container>
              
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
