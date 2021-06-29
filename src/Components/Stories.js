import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from 'antd/lib/list';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { colors } from './Colors';
import { getFile } from '../Helpers/Api';
const useStyles = makeStyles((theme) => ({
    storyRoot: {
        display: 'flex',
    },
    story: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        display: 'flex',
    }

}));

export default function Stories(props) {
    const classes = useStyles();

    return (
        <div className={classes.storyRoot}>
            <List
                //itemLayout='horizontal'
                grid={
                    {
                        gutter: 16,
                    }
                }
                size='small'

                dataSource={props.data}
                renderItem={item => (
                    <div>
                        {item.currentlySmoking ? (
                            <div className={classes.story}>
                                <IconButton onClick={props.onClick}>
                                    <Box border={3} color='white'
                                        borderRadius="50%">
                                        <Avatar alt="profileAvatar"
                                            component='div'
                                            className={classes.avatar}
                                            style={colors[item.color]}>
                                            <Typography variant="h4" color='textSecondary'>
                                                {item.username.charAt(0).toUpperCase()}
                                            </Typography>
                                        </Avatar>
                                    </Box>
                                </IconButton>
                                <Typography variant="h6" color='textPrimary'>
                                    {item.username}
                                </Typography>

                            </div>

                        ) : (null)}
                    </div>
                )}>
            </List>
        </div>
    )
}
