import React from 'react';
import styled from 'styled-components';
import Sheet from 'react-modal-sheet';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { HiLocationMarker } from "react-icons/hi";
import Fab from '@material-ui/core/Fab';
import { BiSend } from 'react-icons/bi';


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
    marginTop: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  },
  send: {
    position: 'fixed',
    top: 0,
    right: 0,
    paddingRight: 5,
  },


}));

export default function BottomSheet(props) {
  const classes = useStyles();
  return (
    <div>
      <CustomSheet
        isOpen={props.open}
        onClose={props.close}
        snapPoints={[500, 300]}
        initialSnap={1}
        onSnap={snapIndex =>
          console.log('> Current snap point index:', snapIndex)}>
        <CustomSheet.Container>
          <CustomSheet.Header />
          <CustomSheet.Content>
            <div className={classes.send}>
              <Fab
                color='secondary'
                aria-label="send"
                className={classes.sendIcon}
                onClick={props.pressedSend}>
                <BiSend size={30} />
              </Fab>
            </div>
            <div className={classes.content}>
              <Grid
                spacing={3}
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Typography variant='h6' noWrap>
                    Smoking Time!
                    </Typography>
                </Grid>
                <Grid item xs={12}
                >
                  <div>

                    <form className={classes.container} noValidate>
                      <TextField
                        id="time"
                        color='secondary'
                        label="Starting Time"
                        variant='outlined'
                        type="time"
                        defaultValue="07:30"
                        className={classes.textField}
                        onChange={props.onChangeST}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                      <TextField
                        id="time"
                        color='secondary'
                        label="Ending Time"
                        variant='outlined'
                        type="time"
                        defaultValue="07:30"
                        className={classes.textField}
                        onChange={props.onChangeET}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </form>
                  </div>
                </Grid>
                <Grid item xs={12}
                >
                  <TextField
                    className={classes.location}
                    id="tfLocation"
                    variant='outlined'
                    color='secondary'
                    label="Location"
                    size='medium'
                    fullWidth
                    placeholder='Your Location'
                    onChange={props.onChangeLocation}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HiLocationMarker />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </CustomSheet.Content>
        </CustomSheet.Container>
        <CustomSheet.Backdrop />
      </CustomSheet>
    </div >
  );

}

