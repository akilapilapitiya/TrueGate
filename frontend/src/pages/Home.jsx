import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colorPallete } from "../ColorTheme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import namedLogo from "../assets/logo-name.png";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { NavLink } from "react-router-dom";
import Link from "@mui/material/Link";
import LoginIcon from '@mui/icons-material/Login';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          background: colorPallete.pageBackgroundColorHome,
          minHeight: "100vh",
          width: "100vw",
          margin: "-8px",
          padding: "8px",
          paddingBottom: "2vw",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "rgba(0, 0, 0, 0.7)",
            width: "100%",
            height: "100%",
            padding: 4,
            borderRadius: 2,
            marginTop: 4,
            boxShadow: 3,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            WELCOME TO TRUEGATE
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            gutterBottom
            sx={{ color: "#ffff" }}
          >
            Manage your account, explore features, and get started easily.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            gutterBottom
            sx={{ color: "#ffff" }}
          >
            {" "}
            TrueGate is your gateway to a secure and user-friendly experience.
            Whether you're new or returning, we have everything you need to get
            started.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <Button
              endIcon={<AppRegistrationIcon />}
              variant="contained"
              onClick={() => navigate("/register")}
              size="large"
              sx={{
                background: colorPallete.registerButtonColor,
                color: colorPallete.registerButtonAccentColor,
                borderColor: colorPallete.registerButtonAccentColor,
                "&:hover": {
                      background:colorPallete.registerButtonHoverColor,
                      color: colorPallete.registerButtonHoverAccentColor,
                      borderColor: colorPallete.registerButtonHoverAccentColor,
                    },
              }}
            >
              Register
            </Button>
            <Button
            endIcon={<LoginIcon />}
              variant="outlined"
              onClick={() => navigate("/login")}
              size="large"
              sx={{
                background: colorPallete.loginButtonColor,
                color: colorPallete.loginButtonAccentColor,
                borderColor: colorPallete.loginButtonAccentColor,
                "&:hover": {
                      background:colorPallete.loginButtonHoverColor,
                      color: colorPallete.loginButtonHoverAccentColor,
                      borderColor: colorPallete.loginButtonHoverAccentColor,
                    },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>

        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(0, 0, 0, 0.7)",
              width: "40%",
              height: "100%",
              padding: 4,
              borderRadius: 2,
              marginTop: 2,
              boxShadow: 3,
              textAlign: "center",
              color: "white",
            }}
          >
            <PeopleAltIcon
              sx={{
                fontSize: "4rem",
                color: "#ffff",
                alignSelf: "center",
              }}
            />
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ weight: "bold" }}
            >
              Manage Users with Ease
            </Typography>
            <Typography>
              TrueGate provides a user-friendly interface for managing your
              account and accessing features seamlessly.
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(0, 0, 0, 0.7)",
              width: "40%",
              height: "100%",
              padding: 4,
              borderRadius: 2,
              marginTop: 2,
              boxShadow: 3,
              textAlign: "center",
              color: "white",
            }}
          >
            <ElectricBoltIcon
              sx={{
                fontSize: "4rem",
                color: "#ffff",
                alignSelf: "center",
              }}
            />
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ weight: "bold" }}
            >
              Fast API Integration
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{ color: "#ffff" }}
            >
              {" "}
              TrueGate is built with a focus on performance ensuring that your
              API requests are handled efficiently.
            </Typography>
          </Container>
        </Container>

        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(0, 0, 0, 0.7)",
              width: "40%",
              height: "100%",
              padding: 4,
              borderRadius: 2,
              marginTop: 2,
              boxShadow: 3,
              textAlign: "center",
              color: "white",
            }}
          >
            <SecurityIcon
              sx={{
                fontSize: "4rem",
                color: "#ffff",
                alignSelf: "center",
              }}
            />
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ weight: "bold" }}
            >
              High Security Standards
            </Typography>
            <Typography>
              Ensure your data is safe with TrueGate's robust security measures.
              We prioritize your privacy and security at every step.
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(0, 0, 0, 0.7)",
              width: "40%",
              height: "100%",
              padding: 4,
              borderRadius: 2,
              marginTop: 2,
              boxShadow: 3,
              textAlign: "center",
              color: "white",
            }}
          >
            <SupportAgentIcon
              sx={{
                fontSize: "4rem",
                color: "#ffff",
                alignSelf: "center",
              }}
            />
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ weight: "bold" }}
            >
              24/7 Support
            </Typography>
            <Typography
              variant="body1"
              color="#ffff"
              gutterBottom
              sx={{ color: "#ffff" }}
            >
              {" "}
              Our team is here to assist you around the clock. Whether you have
              questions or need help, we're just a message away.
            </Typography>
          </Container>
        </Container>
      </Box>
      <Box
        sx={{
          height: "8vw",
          padding: "2vw",
          background: colorPallete.homeFooterBackgroundColor,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borders: "none",
          paddingRight: "10%",
        }}
      >
          <Box
            component="img"
            src={namedLogo}
            alt="logo"
            sx={{ height: "100%" }}
          />
        <Typography
          variant="body1"
          color="black"
          gutterBottom
          sx={{
            color: "#ffff",
            weight: "bold",
            fontFamily: "Arial, sans-serif",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          Developed and Designed by TrueGate Team <br />
          Copyrights 2025 <br />
          All Rights Reserved
        </Typography>
        <Typography
          sx={{
            color: "#ffff",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          QUICK LINKS <br />
          <Link
            component={NavLink}
            to="/login"
            weigh="hover"
            sx={{
              color: "#ffff",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Login
          </Link>{" "}
          <br />
          <Link
            component={NavLink}
            to="/login"
            weigh="hover"
            sx={{
              color: "#ffff",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default Home;
