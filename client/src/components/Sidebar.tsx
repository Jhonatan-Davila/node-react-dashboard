import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ListItemText, Collapse, IconButton } from '@material-ui/core';
import { IAppState } from '../Store/Store';
import { connect } from 'react-redux';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import {orderLinks, addLinks, removeLinks } from '../Actions/SidebarActions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { NONAME } from 'dns';

const styles = createStyles({
  icon: {fontSize: 50},
  grow: {flexGrow: 1},
  appBar: {backgroundColor: '#ffffff'},
  baseTypography: {color: '#555555'},
  baseIcon: {color: '#555555'},
  drawer: {width: 230, maxWidth: 230, '&::-webkit-scrollbar': {
    display: 'none'}},
  drawerOpen: {width: 230, maxWidth: 230, transition: 'width 250ms 0s', top: 64, height: 'calc(100% - 64px)', border: 'none'},
  drawerClosed: {width: 70, maxWidth: 70, transition: 'all 250ms 0s', top: 64, height: 'calc(100% - 64px)', border: 'none'},
  drawerDiv: {background: '#6f6f6f',width: '100%', height: '100%', overflowX: 'hidden',  '&::-webkit-scrollbar': {
    display: 'none'}},
  drawerTypography: {color: '#ffffff', transition: 'opacity 1000ms cubic-bezier(0.23, 1, 0.32, 1)'},
  drawerClosedTypography: {opacity: 0, visibility: 'hidden', transition: 'opacity 1000ms cubic-bezier(0.23, 1, 0.32, 1)'},
  drawerIcons: {marginLeft: 'auto', marginRight: 'auto', display: 'block'},
})

interface IProps extends WithStyles<typeof styles> {
  auth?: boolean;
  AppLinks?: any[];
  menuLinks?: any[];
  user?: any,
  drawerOpen?: any;
  orderLinks?: (links) => Promise<any>;
  addLinks?: (links) => Promise<any>;
  removeLinks?: (links) => Promise<any>;
  history?:any;
}

interface IState extends IProps{ isDragging: boolean, editOpen: boolean, configOpen: boolean }

class Sidebar extends Component<IProps, IState> {

  state: IState;
  draggedItem: any;
  draggedIdx:any;

  constructor (props: IProps) {
      super(props);
      this.state = { ...props, isDragging: false, editOpen: false, configOpen: false  };
  }
  
  onDragStart = (e: React.DragEvent, index: number) => {
    this.draggedItem = this.state.menuLinks[index];
    this.setState({ isDragging: true});
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("obj", JSON.stringify(this.draggedItem));
    e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
  }

  onDragEnd = () => {
    this.draggedIdx = null;
    this.setState({ isDragging: false});
    this.updateAppLinks();
  };

  onDragOver = (index, e) => {
    e.preventDefault();
    const draggedOverItem = this.props.menuLinks[index];
    if (this.draggedItem === draggedOverItem) 
      return;
    let items = this.state.menuLinks.filter(item => item !== this.draggedItem);
    items.splice(index, 0, this.draggedItem);
    items.forEach( (item, index) => item.assignedIndex = index)
    this.props.orderLinks(items);
  };

  onDragDelete = (e: any) => {
    let link = JSON.parse(e.dataTransfer.getData("obj"));
    let newMenuLinks = this.state.menuLinks.filter( item => item.name != link.name)
    this.props.removeLinks(newMenuLinks)
    this.onDragEnd();
    this.deleteAppLink(link);
  }

  onDeleteLink = (link: any) => {
    let newMenuLinks = this.state.menuLinks.filter( item => item.name != link.name)
    this.props.removeLinks(newMenuLinks);
    this.deleteAppLink(link);
  }

  handleAddLinks = (item: any) => {
    this.setState({editOpen: true})
    let currentLinks = this.state.menuLinks;
    if (currentLinks.find( link => link.name == item.name ))
      return;
    item.assignedIndex = currentLinks.length 
    currentLinks.push(item);
    this.props.addLinks(currentLinks);
    this.postAppLinks(item);
  }

  postAppLinks = async (item) => {
    await fetch('/api/user/user-app-links', {method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({link: item, user: this.state.user})})
  }

  updateAppLinks = async () => {
    await fetch('/api/user/update-app-links', {method: 'PUT', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({links: this.props.menuLinks, user: this.props.user})})
  }

  deleteAppLink = async (link: any) => {
    await fetch('/api/user/delete-app-link', {method: 'DELETE', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({link: link, user: this.state.user})})
  }

  handleDrawer = async () => {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  handleSublist = async () => {
    this.setState({editOpen: !this.state.editOpen})
  }

  handleConfig = async () => {
    this.setState({configOpen: !this.state.configOpen});
  }

  handleLinkClick = async (address: string) => {
    window.open(
      address,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
 
  
  public render() {

    const contentStyle = {  transition: 'margin-left 500ms cubic-bezier(0.23, 1, 0.32, 1)', marginLeft: 0 };
    const { classes } = this.props;
    this.state = {...this.state, ...this.props};
    const drawerOpen = Boolean(this.state.drawerOpen);
    const editOpen = Boolean(this.state.editOpen);
    contentStyle.marginLeft = this.state.drawerOpen? 230 : 0;

    return (
    <Drawer variant="permanent" classes={{paper: `${drawerOpen? classes.drawerOpen : classes.drawerClosed}`}} open={drawerOpen}>
    <div className={classes.drawerDiv}>
    <Typography variant="h6" style={{paddingTop: 10, textAlign: 'center', whiteSpace: 'nowrap'}} 
    className={`${drawerOpen? classes.drawerTypography : classes.drawerClosedTypography}`}>
      My Favorites
    </Typography>
    <List component="nav">
      <div>
        {this.props.menuLinks.map( (item, index) => 
          <ListItem onClick={ e => this.handleLinkClick(item.address)} button component="div" draggable={true}  
            onDragStart={e => this.onDragStart(e, index)}
            onDragOver={e => this.onDragOver(index, e)} onDragEnd={this.onDragEnd} style={{padding: 22}}>
            <ListItemIcon className={classes.drawerTypography}>
              <PersonOutlineIcon />
            </ListItemIcon>
              <ListItemText disableTypography primary={<Typography className={classes.drawerTypography}>{item.name}</Typography>}/>
            <ListItemSecondaryAction className={`${this.state.configOpen? classes.drawerTypography : classes.drawerClosedTypography}`}>
              <IconButton onClick={ e => this.onDeleteLink(item)} className={classes.drawerTypography}>
              <RemoveCircleOutlineOutlinedIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
        <ListItem button component="div" style={{padding: 22, marginTop: 30}} >
            <ListItemIcon className={`${classes.drawerTypography}`}>
              <SettingsOutlinedIcon />
            </ListItemIcon>
          <ListItemText disableTypography primary={<Typography className={classes.drawerTypography} onClick={ e => this.handleConfig()}>Editar</Typography>}/>
        </ListItem>
        <ListItem button component="div" onClick={this.handleSublist}
        style={{padding: 22, marginBottom: 3}} className={`${this.state.configOpen? classes.drawerTypography : classes.drawerClosedTypography}`}>
            <ListItemIcon className={classes.drawerTypography}> 
              <AddBoxOutlinedIcon/>
            </ListItemIcon>
          <ListItemText disableTypography primary={
          <Typography className={classes.drawerTypography}>
            Adicionar
          </Typography>}/>
          </ListItem>
        <Collapse in={editOpen} timeout="auto" unmountOnExit>
          <List style={{padding: 10, backgroundColor: '#484747'}}>
            {this.props.AppLinks.map( item => <ListItem button onClick={ e => this.handleAddLinks(item)}><ListItemIcon className={classes.drawerTypography}>
              <PersonOutlineIcon />
            </ListItemIcon>
              <ListItemText disableTypography primary={<Typography className={classes.drawerTypography}>{item.name}</Typography>}/></ListItem>)}
          </List>
        </Collapse>
        </div>
      </List>
      </div> 
    </Drawer>
    )
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    orderLinks: (links: any[]) => dispatch(orderLinks(links)),
    addLinks: (links: any[]) => dispatch(addLinks(links)),
    removeLinks: (links: any[]) => dispatch(removeLinks(links))
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    user: store.userState.user,
    menuLinks: store.sidebarState.menuLinks || [],
    AppLinks: store.sidebarState.AppLinks || [],
    drawerOpen: store.sidebarState.drawerOpen || false
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));