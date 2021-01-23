import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const styles = createStyles({
  icon: {fontSize: 50},
  grow: {flexGrow: 1},
  appBar: {backgroundColor: '#ffffff'},
  baseTypography: {color: '#555555'},
  baseIcon: {color: '#555555'},
  drawer: {width: 190, maxWidth: 190},
  drawerOpen: {width: 190, maxWidth: 190, transition: 'width 250ms 0s', top: 64, height: 'calc(100% - 64px)', border: 'none'},
  drawerClosed: {width: 70, maxWidth: 70, transition: 'all 250ms 0s', top: 64, height: 'calc(100% - 64px)', border: 'none'},
  drawerDiv: {background: '#6f6f6f',width: '100%', height: '100%', overflowX: 'hidden'},
  drawerTypography: {color: '#ffffff', transition: 'opacity 1000ms cubic-bezier(0.23, 1, 0.32, 1)'},
  drawerClosedTypography: {opacity: 0, visibility: 'hidden', transition: 'opacity 1000ms cubic-bezier(0.23, 1, 0.32, 1)'},
  drawerIcons: {marginLeft: 'auto', marginRight: 'auto', display: 'block'},
})

interface IProps extends WithStyles<typeof styles> {
    Title: string;
    Date: Date;
    Content: string;
    Link: string;
    Id?: string;
    Image?: string;
}

interface IState extends IProps{ }

class DetailPost extends Component<IProps, IState> {

  state: IState;

  constructor (props) {
      super(props);
      this.state = { ...props.location.state};
  }
  
  public render() {

    const { classes } = this.props;
    this.state = {...this.state};

    return (
    
    <div style={{marginTop: 42}}>
      <h1>Notícias</h1>
      <Divider></Divider>
      <br></br>
      <h1>{this.state.Title}</h1>
      <Typography style={{fontWeight: 'lighter'}}>{this.state.Date}</Typography>
      <div dangerouslySetInnerHTML={{__html: this.state.Content}}>
        
      </div>
    </div>
    )
  }
}


export default (withStyles(styles)(DetailPost));