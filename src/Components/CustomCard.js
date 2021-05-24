import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import { CgProfile } from 'react-icons/cg';
import { BiWalk} from 'react-icons/bi';
import { HiLocationMarker } from 'react-icons/hi';
import { FaHourglassStart, FaHourglassEnd } from 'react-icons/fa'
import { OMWContext } from '../Data/Contexts';

const useStyles = makeStyles({
    cardRoot: {
        borderRadius: '10%',
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    action: {
        paddingRight: 5
    }
});

export default function OutlinedCard(props) {
    const classes = useStyles();
    const {setOmwData}=useContext(OMWContext);
    
function handleOMW(){
    setOmwData({
        isOpen:true,
        to:props.title,
        startTime:props.startTime,
        endTime:props.endTime,
        location:props.location
    });
}
    return (
        <Card className={classes.cardRoot} variant="elevation">
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <CgProfile />
                    </Avatar>
                }
                action={
                    <div className={classes.action}>{
                        !props.currentlySmoking ? (
                            <Button
                                variant="contained"
                                className={classes.button}
                                startIcon={<BiWalk />}
                                style={{ color: 'green' }}
                                onClick={()=>handleOMW()}>
                                On my Way
                            
                            </Button>) : (
                            <>TO DO</>
                        )}
                    </div>}
                title={props.title}
                subheader={props.subheader}
            />
            <CardContent className={classes.CardContent}>
                <Typography variant="h8" color="textSecondary">
                    <FaHourglassStart />
                    {' Started at: ' + props.startTime}{' '}
                    <FaHourglassEnd />
                    {' Ended at: ' + props.endTime}
                </Typography>
                <Typography variant="h8" component="p">
                    <HiLocationMarker size={20} />
                    {' Location: ' + props.location}
                </Typography>
            </CardContent>
        </Card>
        
    );
}