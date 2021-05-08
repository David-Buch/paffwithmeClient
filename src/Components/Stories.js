import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { List } from 'antd';
import React from 'react';

import { CgProfile } from 'react-icons/cg';

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
                        {item.smoking ? (
                            <div>
                                <Avatar>
                                    <CgProfile size={40} />
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
