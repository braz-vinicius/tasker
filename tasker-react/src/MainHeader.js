import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

class MainHeader extends Component {

    classes = makeStyles((theme) => ({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        title: {
            flexGrow: 1,
        },
    }));


    render() {
        return (
            <AppBar position="absolute" className={this.classes.appBar}>
                <Toolbar>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={this.classes.title}>
                        Tasker
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default MainHeader;