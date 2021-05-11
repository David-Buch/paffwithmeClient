import React, { useState } from 'react';
import styled from 'styled-components';
import Sheet from 'react-modal-sheet';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { HiLocationMarker } from "react-icons/hi";
import { BiSend } from 'react-icons/bi';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const CustomSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    /* custom styles */
  }
  .react-modal-sheet-container {
    background-color: #88304e !important;
  
  }
  .react-modal-sheet-header {    
  }
  .react-modal-sheet-drag-indicator {
    /* custom styles */
  }
  .react-modal-sheet-content {
    /* custom styles */
  }
`;

const useStyles = makeStyles((theme) => ({

  container: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {

    height: '90%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
  buttonDiv: {
    display: 'flex', justifyContent: 'center',
  },
  button: { paddingTop: 10, width: '60vW' },
  timetf: {
    display: 'flex',
    justifyContent: 'center',
  },
  location: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 315,

  },
  grid: {
    marginTop: theme.spacing(3),
  }


}));

export default function BottomSheet(props) {
  const classes = useStyles();
  const [sendData, setSendData] = useState({
    location: '',
    startTime: '',
    endTime: ''
  });

  const validation = () => {
    let temp = {};
    temp.startTime = sendData.startTime ? "" : "This field is required"
    temp.endTime = sendData.endTime ? "" : "This field is required"
    temp.location = sendData.location ? "" : "This field is required"

  };

  return (
    <div>
      <CustomSheet
        isOpen={props.open}
        onClose={props.close}
        snapPoints={[450, 350]}
        initialSnap={1}
        onSnap={snapIndex =>
          console.log('> Current snap point index:', snapIndex)}>
        <CustomSheet.Container>
          <CustomSheet.Header />
          <CustomSheet.Content>
            <div className={classes.content}>
              <form
                className={classes.container}
                onSubmit={(event) => props.onSend(event, sendData)}
                onError={errors => console.log(errors)}>
                <Grid
                  className={classes.grid}
                  container
                  spacing={2}
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                >

                  <Grid item xs={12}>
                    <div className={classes.timetf}>
                      <TextField
                        className={classes.textField}
                        id="time"
                        color='secondary'
                        label="Starting Time"
                        variant='outlined'
                        type="time"
                        onChange={(e) => setSendData({ ...sendData, startTime: e.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        validators={["required"]}
                        errorMessages={["Starting Time is required"]}

                      />
                      <TextField
                        className={classes.textField}
                        id="time"
                        color='secondary'
                        label="Ending Time"
                        variant='outlined'
                        type="time"
                        onChange={(e) => setSendData({ ...sendData, endTime: e.target.value })}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.location}
                      id="tfLocation"
                      variant='outlined'
                      color='secondary'
                      label="Location"
                      placeholder='Your Location'
                      onChange={(e) => setSendData({ ...sendData, location: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HiLocationMarker />
                          </InputAdornment>
                        ),
                      }}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div className={classes.buttonDiv}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<BiSend />}
                      >
                        Send
                  </Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
          </CustomSheet.Content>
        </CustomSheet.Container>
        <CustomSheet.Backdrop />
      </CustomSheet>
    </div >
  );

}

