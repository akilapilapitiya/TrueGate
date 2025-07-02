import { colorPallete } from "../ColorTheme";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { buttonSizes, fontSizes } from "../Responsive";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: colorPallete.pageBackgroundColorNotFound,
        minHeight: "100vh",
        margin: "-8px",
        padding: "8px",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontSize: fontSizes.mainHeading,
          }}
        >
          404 | Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          sx={{
            fontSize: fontSizes.subHeading,
          }}
        >
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            minWidth: buttonSizes.subButton.minWidth,
            fontSize: buttonSizes.subButton.fontSize,
            padding: buttonSizes.subButton.padding,
          }}
        >
          Go to Homepage
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
