import React from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

export default function GoBackButton(){
  const history = useHistory();

  return (
    <Button variant="contained" onClick={() => history.goBack()}><KeyboardReturnIcon /></Button>
  )
}
