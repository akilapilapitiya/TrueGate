import React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import AddCallIcon from "@mui/icons-material/AddCall";
import { colorPallete } from "../ColorTheme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomButton  from "../components/CustomButton";
import { motion } from "framer-motion";

const MotionIcon = motion.div;

const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, rotate: 2 },
};

const cardVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.03 },
};

const tileStyle = {
  width: "250px",
  m: 2,
  background: colorPallete.tileBackgroundColor,
  borderRadius: "16px",
};

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const name = "Akila";
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const cards = [
    {
      label: "API Dashboard",
      icon: <SpeedIcon sx={{ fontSize: "6rem", color: colorPallete.tileAccentColor }} />,
      route: "/dashboard",
      adminOnly: true,
    },
    {
      label: "User Management",
      icon: <GroupAddIcon sx={{ fontSize: "6rem", color: colorPallete.tileAccentColor }} />,
      route: "/manage",
      adminOnly: true,
    },
    {
      label: "Profile Editor",
      icon: <PersonIcon sx={{ fontSize: "6rem", color: colorPallete.tileAccentColor }} />,
      route: "/profile",
      adminOnly: false,
    },
    {
      label: "Tech Support",
      icon: <AddCallIcon sx={{ fontSize: "6rem", color: colorPallete.tileAccentColor }} />,
      route: null,
      adminOnly: false,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: colorPallete.pageBackgroundColorLanding,
        minHeight: "100vh",
        width: "100vw",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            backgroundColor: colorPallete.tileBackgroundColor,
            borderRadius: 2,
            boxShadow: "0 0 15px rgba(0,0,0,0.4)",
            mb: 4,
          }}
        >
          <Typography
            variant={isSmall ? "h4" : "h3"}
            sx={{
              fontWeight: "bold",
              color: colorPallete.tileAccentColor,
              mb: 2,
            }}
          >
            Welcome, {user?.firstName || name}!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: colorPallete.registerPageNormalText,
              maxWidth: "700px",
              mx: "auto",
              px: 2,
            }}
          >
            You’ve entered the control panel of <b>TrueGate</b>, your secure gateway
            to managing users and authentication settings. Choose a section below to begin.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {cards
  .filter((card) => !card.adminOnly || user?.mode === "admin")
  .map((card, index) => (
   
  <motion.div
  key={card.label}
  style={{
    ...tileStyle,
    width: 220,
    height: 220,
    cursor: card.route ? 'pointer' : 'default',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    boxShadow: '0 0 6px rgba(0, 255, 255, 0.3)',
    transition: 'box-shadow 0.3s ease-in-out',
  }}
  animate={{
    boxShadow: [
      '0 0 6px rgba(0, 255, 255, 0.25)',
      '0 0 10px rgba(0, 255, 255, 0.4)',
      '0 0 6px rgba(0, 255, 255, 0.25)',
    ],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'easeInOut',
  }}
  whileHover={{
    scale: 1.03,
    boxShadow: '0 0 12px rgba(0, 255, 255, 0.5)',
  }}
  onClick={() => card.route && navigate(card.route)}
>


    
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 1,
          }}
        >
          <MotionIcon variants={iconVariants}>
            {card.icon}
          </MotionIcon>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: colorPallete.tileAccentColor,
              textAlign: "center",
              mt: 1,
            }}
          >
            {card.label}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  ))}

        </Box>
      </Container>
    </Box>
  );
};

export default Landing;
