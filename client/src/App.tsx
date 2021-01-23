import React, { Component } from 'react';
import './App.css';
import { Route } from "react-router-dom";
import Home from './pages/Home';
import Toolbar from '@material-ui/core/Toolbar'
import PrivateRoute from './components/PrivateRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IAppState } from './Store/Store';
import { getUser } from './Actions/UserActions';
import { connect } from 'react-redux';
import { openDrawer } from './Actions/SidebarActions';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import CalendarPublicEvents from './components/CalendarPublicEvents';
import DetailPost from './components/DetailPost';


const styles = createStyles({
  icon: {fontSize: 50},
  grow: {flexGrow: 1},
  appBar: {backgroundColor: '#ffffff'},
  baseTypography: {color: '#555555'},
  baseIcon: {color: '#555555'},
})



interface IBarProps extends WithStyles<typeof styles> { getUser: () => Promise<any>, openSidebar: (isOpen: boolean) => Promise<any> }

export interface IBarState {
  auth: boolean;
  anchorEl: null | HTMLElement;
  anchorLinkEl: null | HTMLElement;
  user: any,
  drawerOpen: any;
}

class App extends Component<IBarProps, IBarState> {
  
  draggedItem: any;
  draggedIdx:any;
  state: IBarState = {
    auth: true,
    anchorEl: null,
    anchorLinkEl: null,
    user: null,
    drawerOpen: false
  }
  
  handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }
  
  handleClose = () => {
    this.setState({ anchorEl: null });
  }
  
  handleDrawer = async () => {
    this.props.openSidebar(this.state.drawerOpen);
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  componentWillMount() {
    this.props.getUser();
  }
  
  render() {
    const contentStyle = {  transition: 'margin-left 500ms cubic-bezier(0.23, 1, 0.32, 1)', marginLeft: 98 };
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);
    contentStyle.marginLeft = this.state.drawerOpen? 258 : 98;
    console.log(this.state.drawerOpen)
    return (
    <React.Fragment>
        <CssBaseline />
    <div className="base">
      <header>
        <div>
          <AppBar className={classes.appBar} position="fixed">
            <Toolbar>
              <IconButton className={classes.baseIcon} onClick={this.handleDrawer}>
                <MenuIcon/>
              </IconButton>
              <Typography variant="title"
                className={classes.baseTypography}>
                DASHBOARD
              </Typography>
              <div className = {classes.grow}></div>
              <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit">
                <Avatar children={'M'} /> {/*TODO: Pegar a primeira letra do nome OU foto do user logado */}
              </IconButton>
              <span>User</span>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}}
                open={open}
                onClose={this.handleClose}>
                <MenuItem>Perfil</MenuItem>
                <MenuItem>Configurações</MenuItem>
                <MenuItem><NavBar /></MenuItem>
              </Menu>
            </div>
            </Toolbar>
          </AppBar>
          </div>
      </header>
      <div >
        <Sidebar></Sidebar>
        <br></br>
        <div style = {contentStyle}>
        <PrivateRoute path="/" exact component={Dashboard} style={contentStyle}/>
        <PrivateRoute path="/posts" exact component={Home} style={contentStyle} />
        <PrivateRoute path='/posts/:id' component={DetailPost} style={contentStyle}/>
        <Route path="/login"  style={contentStyle}/>
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/calendar" component={Calendar} />
        </div>
        <br></br>
      </div>
      <Footer />
  </div>
  </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    user: store.userState.user,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUser: () => dispatch(getUser()),
    openSidebar: (isOpen: boolean) => dispatch(openDrawer(isOpen))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));