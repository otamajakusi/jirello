import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavigationBar(props) {
  const { classes, title, button, selected, onselect } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          */}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            AppBar
          </Typography>
            <div>

              <FormControl className={classes.formControl}>
    <Select
      multiple
      value={selected}
      onChange={event => onselect(event)}

      renderValue={selected => (
        <div className={classes.chips}>
          {selected.map(value => (
            <Chip key={value} label={value} className={classes.chip} />
          ))}
        </div>
      )}
    >
      <MenuItem value={'Google'}>Google</MenuItem>
      <MenuItem value={'Amazon'}>Amazon</MenuItem>
      <MenuItem value={'Apple'}>Apple</MenuItem>
    </Select>
              </FormControl>
              {React.cloneElement(button, {color: "inherit"})}
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);
