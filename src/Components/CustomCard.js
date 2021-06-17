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
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { colors } from './Colors';

const useStyles = makeStyles((theme)=>({
    
    cardRoot: {
        borderRadius: '10%',
        marginBottom: 10,
    },
    avatar:{

    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    action: {
        paddingRight: 5,
        paddingLeft:5,
    }

}));

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
                    <Avatar aria-label="recipe" style={colors[props.color]}
                    className={classes.avatar}>
                        {props.title.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <div className={classes.action}> 
                        {console.log(props.smoking)}
                        {
                        props.smoking ? (
                            <Button
                                variant="outlined"
                                color='primary'
                                className={classes.button}
                                startIcon={<BiWalk />}
                                style={{ color: 'primary' }}
                                onClick={()=>handleOMW()}
                                disabled={props.live}>
                                On my Way
                            
                            </Button>) : (
                            <>TO DO</>
                        )}
                    </div>}

                title={props.title}
                subheader={<Typography>{props.subheader}</Typography>}
            />
            <CardContent className={classes.CardContent}>
                <Typography variant="h8" >
                    <FaHourglassStart />
                    {' Started at: ' + props.startTime}
                    <FaHourglassEnd />
                    {' Ended at: ' + props.endTime}
                </Typography>
                <Typography variant="h8" component="p" >
                    <HiLocationMarker size={20} />
                    {' Location: ' + props.location}
                </Typography>
            </CardContent>
        </Card>
        
    );
}