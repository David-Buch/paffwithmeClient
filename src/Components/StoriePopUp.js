import React from 'react';
import Modal from '@material-ui/core/Modal';
import Stories from 'react-insta-stories';

function StoriePopUp(props) {
    const body = (
        <>
            {console.log(props.stories)}
            <Stories
                stories={props.stories}
                defaultInterval={5000}
                onAllStoriesEnd={props.onAllStoriesEnd}
            />
        </>
    );
    return (
        <div>
            <Modal
                open={props.open}
                //onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {body}
            </Modal>

        </div>
    );
}

export default StoriePopUp;
