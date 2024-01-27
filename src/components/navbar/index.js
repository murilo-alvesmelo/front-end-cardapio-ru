import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [leftDrawer, setLeftDrawer] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setLeftDrawer({ ...leftDrawer, [anchor]: open });
  };

  const getDrawer = (e) => {
    e === "Visualizar refeições"
      ? navigate("/root")
      : e === "Cadastrar refeição"
      ? navigate("/root/refeicoes")
      : e === "Sair"
      ? handleLogout()
      : setLeftDrawer(false);
  };

  const filteredMenuItems = [
    { text: "Visualizar refeições" },
    { text: "Cadastrar refeição" },
    { text: "Sair" },
  ];

  return (
    <nav className="header-nav">
      {isLoggedIn && (
        <>
          <Grid container spacing={5}>
            <Grid item xs={1} className="nav-img-icon">
              {["left"].map((anchor) => (
                <div key={anchor} className="button-menu">
                  <Button
                    style={{ color: "#fff" }}
                    onClick={toggleDrawer(anchor, true)}
                  >
                    <MenuIcon />
                  </Button>
                  <div>SCRU</div>
                  <Drawer
                    anchor={anchor}
                    open={leftDrawer[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    <Box
                      className="nav-box"
                      sx={{
                        width:
                          anchor === "top" || anchor === "bottom"
                            ? "auto"
                            : 310,
                      }}
                      role="presentation"
                      onClick={toggleDrawer(anchor, false)}
                      onKeyDown={toggleDrawer(anchor, false)}
                    >
                      <List>
                        {filteredMenuItems.map((item, index) => (
                          <ListItem key={item.text}>
                            <ListItemButton
                              onClick={() => getDrawer(item.text)}
                            >
                              <ListItemIcon sx={{ color: "#fff" }}>
                                {item.text === "Visualizar refeições" ? (
                                  <FormatListBulletedIcon />
                                ) : item.text === "Cadastrar refeição" ? (
                                  <AddCircleIcon />
                                ) : item.text === "Sair" ? (
                                  <LogoutIcon />
                                ) : (
                                  ""
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={item.text}
                                sx={{ color: "#fff" }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Drawer>
                </div>
              ))}
            </Grid>
          </Grid>
          <div className="user-row">
            {JSON.parse(user).nome}
            <PersonIcon style={{ marginLeft: 10 }} />
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
