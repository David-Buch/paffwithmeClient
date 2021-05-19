import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from 'antd/lib/list';
import React from 'react';


const useStyles = makeStyles({
    storyRoot: {
        display: 'flex',
        flexDirection: 'row',
    }

});

export default function Stories(props) {
    const classes = useStyles();
    return (
        <div className={classes.storyRoot}>
            <List
                itemLayout='vertical'
                size='small'
                dataSource={props.data}
                renderItem={item => (
                    <div>
                        {item.currentlySmoking ? (
                            <div>
                                <Avatar alt="profileAvatar"
                                    component='div'>
                                    <Typography variant="h2">
                                        {item.username.charAt(0).toUpperCase()}
                                    </Typography>
                                </Avatar>
                                {item.username}
                            </div>

                        ) : (null)}
                    </div>
                )}>
            </List>
        </div>
    )
}
