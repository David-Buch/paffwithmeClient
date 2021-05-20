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
        height: '55vH',
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

    //useEffect data fetching 

    const handleInfiniteOnLoad = () => {
        let { data } = state;
        this.setState({
            ...state,
            loading: true,
        });
        if (data.length > 14) {
            console.log('Infinite List loaded all');
            setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        //fetching data
    };

    return (
        <div className={classes.listRoot}>
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                //loadMore={handleInfiniteOnLoad}
                hasMore={state.loading && state.hasMore}
                useWindow={false}
            >
                <List
                    className='list'
                    dataSource={props.data}
                    renderItem={user => (
                        <CustomCard
                            smoking={user.currentlySmoking}
                            title={user.username}
                            subheader={user.day}
                            startTime={user.startTime}
                            endTime={user.endTime}
                            location={user.location}
                        />
                    )}
                />
            </InfiniteScroll>
        </div>
    );
}
