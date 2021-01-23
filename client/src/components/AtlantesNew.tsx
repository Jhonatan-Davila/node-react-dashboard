import React, { Component } from "react";
import {
  createStyles,
  WithStyles,
  withStyles, 
  CardHeader,
  Typography,
  CardContent
} from "@material-ui/core"; 
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";    
import Grid from "@material-ui/core/Grid"; 
import Avatar from "@material-ui/core/Avatar";
import atlantico_img from "../styles/images/IMG_7823.JPG"; 
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import AtlantesModel from '../models/AtlantesModel';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../config.json';

const useStyles = createStyles({
  card: {
    marginTop:50,
    marginLeft:10,
    minWidth: '340px',
    maxWidth: '340px',
    minHeight: '278px',
    maxHeight: '300px'
  }, 
  media: {
    height: 200
  },
  paper: {
    height: 140,
    width: 100
  },
  inline: {
    display: "inline",
    fontSize: 12,
    height: 3
  },
  root: {
    width: "100%",
    display: "inline",
    maxWidth: 360,
    marginTop: 0
  },
  typography: {
    height: 20
  }, 
  cardHeader: {
    display: "flex" /* establish flex container */,
    justifyContent: "space-between",
    fontSize: 10,
    height: 10,
    marginTop: 20,
    padding: 0,
    marginLeft:20
  },
  cards: {
    display: "flex" /* establish flex container */,
    justifyContent: "space-between",
    backgroundColor: "lightblue",
    fontSize: 100,
    height: 10,
    marginTop: 20,
    padding: 0
  },
  grid: {
    flexGrow: 1,
    height: 80
  }, 
  progress:{
    alignContent:'center',
    marginLeft: '15%',
    marginTop: '15%',
    width: '150px',
    color:'Silver'
  },
  avatar: {
    width: 50,
    height: 50 ,
  }
});

interface AtlantesNewProps extends WithStyles<typeof useStyles> {
  data?: any;
}

interface AtlantesNewState extends AtlantesNewProps {}
 
class Document extends Component {
  constructor(props) {
      super(props);
      this.state = { ...props }; 
    }
      
  render(){
      const classes = this.props.classes;
      return (

        <Grid container className={classes.grid} key={"Line_"+this.props.index}>
            <Grid item xs={3} key={"Avatar"+this.props.index}>
                <Avatar alt="Remy Sharp" src={atlantico_img} className={classes.avatar} />
            </Grid> 
            <Grid item xs={8} key={"Info_"+this.props.index}>
                  <Grid item xs={12}  className={classes.typography}>
                    <Typography 
                      variant="h5"
                      className={classes.inline}
                      color="textSecondary">
                      {this.props.job} 
                    </Typography> 
                  </Grid> 
                  <Grid item xs={12} className={classes.typography}>
                    <Typography
                      variant="h5"
                      className={classes.inline}
                      color="textSecondary"
                    >
                      Projeto: {this.props.project} 
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.typography}>
                    <Typography
                      variant="h5"
                      component="span"
                      className={classes.inline}
                      color="textSecondary"
                    >
                      Gerente Responsável: {this.props.manager}
                    </Typography> 
                    </Grid> 
            </Grid> 
            <Grid item xs={1} key={"Button_"+this.props.index}>
                  <MessageOutlinedIcon /> 
            </Grid> 
          </Grid>
 
      );
  }
}

class AtlantesNew extends Component<AtlantesNewProps, AtlantesNewState> {
  state: any;
  atlantes: Array<AtlantesModel> = []; 

  constructor(props) {
    super(props); 
    this.state = { ...props }; 
  }

  getNovosAtlantes = async () => {
    try{
      let result = await fetch(config.intranet_api_domain + '/api/user/users').then( response => {
        return response.json()});
      this.atlantes = result.response.map( (atlante: any) => new AtlantesModel(atlante));  
      this.setState({data: this.atlantes});

    }catch(erro){
      console.log(erro)
    }
  }

  render() {
    let { classes } = this.props; 

    if (this.state && this.state.data) {
      return (
        <Card className={classes.card}> 
        <CardHeader
          title="Novos Atlantes"
          className={classes.cardHeader}
          titleTypographyProps={{ variant: "subtitle2" }}
        />
        <CardContent>
          <Grid  className={classes.root}>
            {this.atlantes.slice(0, 3).map((obj, i) => (
              <Document key={"document_atlantes_"+i} index={i} job={obj.job} manager={obj.manager} project={obj.project} classes={classes} /> 
            ))}
          </Grid >
        </CardContent> 
    </Card>

       
      ); 
    }
    
    return (
      <Card className={classes.card}>
        <CardActionArea  >
          <CardHeader title="Novos Atlantes" className={classes.cardHeader} titleTypographyProps={{variant:'subtitle2' }} /> 
          <CardContent> 
          <CircularProgress size='40' className={classes.progress}   /> 
          </CardContent>
        </CardActionArea>
      </Card>
    ); 
  }

  componentDidMount() {  
    this.getNovosAtlantes(); 
  } 
}

export default withStyles(useStyles)(AtlantesNew);
