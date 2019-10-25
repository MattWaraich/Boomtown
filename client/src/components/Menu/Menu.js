import React from "react";
import styles from "./styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  withStyles,
  Menu,
  MenuItem,
  Link,
  ListItemIcon,
  Fab
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import logo from "../../images/boomtown.svg";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { NavLink } from "react-router-dom";

const MenuBar = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink to="/items">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img className={classes.logo} src={logo} />
          </IconButton>
        </NavLink>

        <div className={classes.navMenu}>
          <NavLink to="/share">
            <Fab
              variant="extended"
              aria-label="delete"
              className={classes.fab}
              color="primary"
            >
              <AddCircleIcon className={classes.extendedIcon} />
              Share Something
            </Fab>
          </NavLink>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: 200
              }
            }}
          >
            <Link component="button" variant="body2">
              <MenuItem onClick={handleClose}>
                <NavLink to="/profile">
                  <ListItemIcon>
                    <FingerprintIcon fontSize="small" />
                  </ListItemIcon>
                </NavLink>
                <Typography variant="inherit" noWrap>
                  Profile
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <NavLink to="/welcome">
                  <ListItemIcon>
                    <PowerSettingsNewIcon fontSize="small" />
                  </ListItemIcon>
                </NavLink>
                <Typography variant="inherit" noWrap>
                  Sign Out
                </Typography>
              </MenuItem>
            </Link>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(MenuBar);
