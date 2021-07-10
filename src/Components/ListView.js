import { makeStyles } from '@material-ui/core/styles';
import { List } from 'antd';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import CustomCard from './CustomCard';
import './list.css';

const useStyles = makeStyles((theme) => ({
    listRoot: {
        display: 'flex',
        justifyContent: 'center',
        height: '60vH',
        overflow: 'auto',
    },

}));

export default function ListView(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        data: [],
        loading: false,
        hasMore: true
    });

    return (
        <div className={classes.listRoot}>
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                hasMore={state.loading && state.hasMore}
                useWindow={false}
            >
                <List
                    className='list'
                    dataSource={props.data}
                    renderItem={user => (
                        <CustomCard
                            live={props.live}
                            smoking={user.currentlySmoking}
                            title={user.username}
                            subheader={user.day}
                            startTime={user.startTime}
                            endTime={user.endTime}
                            location={user.location}
                            color={user.color}
                        />
                    )}
                />
            </InfiniteScroll>
        </div>
    );
}
