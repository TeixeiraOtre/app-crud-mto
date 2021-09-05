import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Início" />
    </ListItem>
    <ListItem button component="a" href="/clientes">
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItem>
  </div>
);