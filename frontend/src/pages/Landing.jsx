import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import AddCallIcon from "@mui/icons-material/AddCall";
import { colorPallete } from "../ColorTheme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fontSizes } from "../Responsive";

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const name = "Akila";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: colorPallete.pageBackgroundColorLanding,
        minHeight: "100vh",
        width: "100vw",
        margin: "-8px",
        padding: "8px",
        paddingBottom: "2vw",
      }}
    >
      <Container>
        <Container sx={{ display: "flex" }}>
          {user.mode === "admin" && (
            <>
              <Card
                sx={{
                  width: "20%",
                  margin: "auto",
                  mt: 4,
                  background: colorPallete.tileBackgroundColor,
                  "&:hover": {
                    backgroundColor: colorPallete.tileHoverBackgroundColor,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <SpeedIcon
                    sx={{
                      fontSize: "20vh",
                      alignContent: "center",
                      color: colorPallete.tileAccentColor,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: fontSizes.subHeading,
                      color: colorPallete.tileAccentColor,
                    }}
                  >
                    API Dashboard
                  </Typography>
                </CardActionArea>
              </Card>

              <Card
                sx={{
                  width: "20%",
                  margin: "auto",
                  mt: 4,
                  background: colorPallete.tileBackgroundColor,
                  "&:hover": {
                    backgroundColor: colorPallete.tileHoverBackgroundColor,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate("/manage")}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: colorPallete.tileAccentColor,
                  }}
                >
                  <GroupAddIcon
                    sx={{ fontSize: "20vh", alignContent: "center" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: colorPallete.tileAccentColor,
                      fontSize: fontSizes.subHeading,
                    }}
                  >
                    User Management
                  </Typography>
                </CardActionArea>
              </Card>
            </>
          )}

          <Card
            sx={{
              width: "20%",
              margin: "auto",
              mt: 4,
              background: colorPallete.tileBackgroundColor,
              "&:hover": {
                backgroundColor: colorPallete.tileHoverBackgroundColor,
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate("/profile")}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: colorPallete.tileAccentColor,
              }}
            >
              <PersonIcon sx={{ fontSize: "20vh", alignContent: "center" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: colorPallete.tileAccentColor,
                  fontSize: fontSizes.subHeading,
                }}
              >
                Profile Editor
              </Typography>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              width: "20%",
              margin: "auto",
              mt: 4,
              background: colorPallete.tileBackgroundColor,
              "&:hover": {
                backgroundColor: colorPallete.tileHoverBackgroundColor,
              },
            }}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: colorPallete.tileAccentColor,
              }}
            >
              <AddCallIcon sx={{ fontSize: "20vh", alignContent: "center" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: colorPallete.tileAccentColor,
                  fontSize: fontSizes.subHeading,
                }}
              >
                Tech Support
              </Typography>
            </CardActionArea>
          </Card>
        </Container>

        <Container></Container>
      </Container>
    </Box>
  );
};

export default Landing;
