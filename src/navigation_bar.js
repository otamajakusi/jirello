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
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

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
  const { classes, title, button, projects, selected, onSelect } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
          </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Projects</InputLabel>
                <Select
                  style={{minWidth: 80, width: 80 * selected.length, marginRight: 10}}
                  multiple
                  value={selected}
                  onChange={event => onSelect(event)}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => {
                    return (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>);
                  }}
                >
                {projects.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </Select>
              </FormControl>
              {React.cloneElement(button, {color: "inherit"})}
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);
