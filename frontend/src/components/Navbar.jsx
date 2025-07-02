import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem, Typography,
} from "@mui/material";
import React from "react";
import namedLogo from "../assets/logo-name.png";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DevicesIcon from '@mui/icons-material/Devices';
import ForumIcon from '@mui/icons-material/Forum';
import InfoIcon from '@mui/icons-material/Info';


const Navbar = () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250,
     background:'blue',
    height: '100vh',}}
      onClick={toggleDrawer(false)}>
        <IconButton
        sx={{
        }}>
            <img src={namedLogo}
             alt="TrueGate Logo"
             style={{ width: 'auto', height: 40 }}/>
        </IconButton>
            <Divider sx={{borderColor:"white"}}/>
      <List>
        <Container>
            <ListItem button onClick={() => console.log("About Clicked")}>
            <DashboardIcon />
          <Typography 
          variant="body1" 
          color="initial">
            DASHBOARD
          </Typography>
        </ListItem>
        <ListItem button onClick={() => console.log("About Clicked")}>
            <PeopleIcon />
          <Typography 
          variant="body1" 
          color="initial">
            USER MANAGEMENT
          </Typography>
        </ListItem>
        <ListItem button onClick={() => console.log("About Clicked")}>
            <DevicesIcon />
          <Typography 
          variant="body1" 
          color="initial">
            DEVICE MANAGEMENT
          </Typography>
        </ListItem>
        </Container>
        
        <Divider sx={{borderColor:"white"}}/>
        <Container>
            <ListItem button onClick={() => console.log("About Clicked")}>
            <ForumIcon />
          <Typography 
          variant="body1" 
          color="initial">
            COMMUNITY FORUM
          </Typography>
        </ListItem>
        <ListItem button onClick={() => console.log("About Clicked")}>
            <InfoIcon />
          <Typography 
          variant="body1" 
          color="initial">
            ABOUT US
          </Typography>
        </ListItem>
        </Container>
        
      </List> 
    </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
