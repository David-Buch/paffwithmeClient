import React from 'react';
import styled from 'styled-components';
import Sheet from 'react-modal-sheet';
import { makeStyles } from '@material-ui/core/styles';
import SheetForm from './SheetForm';


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
  content: {
    height: '90%',
  },

}));

export default function BottomSheet(props) {
  const classes = useStyles();
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
              <SheetForm />
            </div>
          </CustomSheet.Content>
        </CustomSheet.Container>
        <CustomSheet.Backdrop />
      </CustomSheet>
    </div >
  );

}

