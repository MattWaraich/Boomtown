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
  ListItemIcon,
  Fab
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import logo from "../../images/boomtown.svg";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { NavLink } from "react-router-dom";
import { compose, graphql } from "react-apollo";
import { LOGOUT_MUTATION, VIEWER_QUERY } from "../../apollo/queries";

const MenuBar = ({ classes, SIGNOUT }) => {
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
              <div>Share Something</div>
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
            <MenuItem onClick={handleClose}>
              <NavLink to="/profile">
                <ListItemIcon>
                  <FingerprintIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit" noWrap>
                  Profile
                </Typography>
              </NavLink>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                try {
                  SIGNOUT();
                } catch (e) {}
              }}
            >
              <ListItemIcon>
                <PowerSettingsNewIcon fontSize="small" />
              </ListItemIcon>
              <Typography
                className={classes.signOutButton}
                variant="inherit"
                noWrap
              >
                Sign Out
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const refetchQueries = [{ query: VIEWER_QUERY }];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: { refetchQueries },
    name: "SIGNOUT"
  })
)(withStyles(styles)(MenuBar));
