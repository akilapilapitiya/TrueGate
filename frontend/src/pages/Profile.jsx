import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import maleIcon from "../assets/maleIcon.png";

const Profile = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "rgb(255, 255, 255)",
        padding: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      <Box
        sx={{
          background: "blue",
          alignItems: "center",
          display: "flex",
          ustifyContent: "center",
          paddingTop: "10vh",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Paper
              elevation={2}
              sx={{
                minWidth: "300px",
              }}
            >
              <Container>
                <img src={maleIcon} alt="" />
              </Container>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={3}>
            <Paper elevation={2}>Helllo there</Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
