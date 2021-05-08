import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardHeader, Button } from '@material-ui/core';

import { CgProfile } from 'react-icons/cg';
import { BiWalk, BiTrash } from 'react-icons/bi';
import { HiLocationMarker } from 'react-icons/hi';
import { FaHourglassStart, FaHourglassEnd } from 'react-icons/fa'

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
                        props.smoking ? (
                            <Button
                                variant="contained"
                                className={classes.button}
                                startIcon={<BiWalk />}
                                style={{ color: 'green' }}>
                                On my Way
                            </Button>) : (
                            <Button
                                variant="contained"
                                className={classes.button}
                                startIcon={<BiTrash />}
                                style={{ color: 'red' }}>
                                Delete
                            </Button>
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