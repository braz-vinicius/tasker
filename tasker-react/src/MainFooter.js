import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

class MainFooter extends Component {

render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'© 2020'}
      </Typography>
    );
  }
}

export default MainFooter;