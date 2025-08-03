import {
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { useNavigate } from "react-router-dom";

const EmailVerificationNotice = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  return (
    <Fade in timeout={400}>
      <Box
        sx={{
          minHeight: "100dvh",
          bgcolor: theme.palette.background.default,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: isMobile ? 3 : 5,
            borderRadius: 4,
            maxWidth: 500,
            width: "100%",
            textAlign: "center",
            bgcolor: theme.palette.background.paper,
          }}
        >
          <MarkEmailUnreadIcon
            sx={{
              fontSize: isMobile ? 60 : 80,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          />
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={600}
            gutterBottom
          >
            Please Verify Your Email
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            A verification link has been sent to your email. Please check your
            inbox and click the link to activate your account.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Return to Home
          </Button>
        </Paper>
      </Box>
    </Fade>
  );
};

export default EmailVerificationNotice;
