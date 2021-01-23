import React, { Component } from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Paper,
  CardHeader,
  Divider 
} from "@material-ui/core"; 
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea"; 
import CardContent from "@material-ui/core/CardContent"; 
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid"; 
import Avatar from "@material-ui/core/Avatar";
import atlantico_img from "../styles/images/IMG_7823.JPG"; 
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import CircularProgress from '@material-ui/core/CircularProgress';
import AtlantesModel from "../models/AtlantesModel";
import config from '../config.json';


const useStyles = createStyles({
  card: {
    minWidth: "300px",
    maxWidth: "300px",
    minHeight: "250px",
    maxHeight: "300px",
    marginTop:50 
  },
  paper: {
    height: 25,
    width: 80,
    backgroundColor: "#DCDCDC",
    textAlign:'center'
  },
  inline: {
    display: "inline",
    fontSize: 10,
    height: 3
  },
  root: {
    width: "100%",
    display: "inline",
    maxWidth: 360,
    marginTop: 0
  },
  typography: {
    fontSize: 12
  },
  iconGift: {
    width: 20,
    height: 20,
    marginTop: 0
  },
  cardHeader: {
    display: "flex" /* establish flex container */,
    justifyContent: "space-between",
    fontSize: 10,
    height: 10,
    marginTop: 20,
    padding: 0,
    marginLeft: 20
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
  },
});

interface MonthBirthDayProps extends WithStyles<typeof useStyles> {
  data: any;
}

interface MonthBirthDayState extends MonthBirthDayProps {}

class Document extends Component {
  constructor(props) {
      super(props);
      this.state = { ...props }; 
    }

  monthShortNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN","JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  
  getDate(date):string{ 
    var t = date.split('/');
    return this.zeroComplete(t[0]) + '  ' + this.monthShortNames[parseInt(t[1])-1] ; 
  }

  zeroComplete(day){
    return day && parseInt(day) < 10  && day.lengh == 1 ? '0'+ day : day;
  }

  render(){
      const classes = this.props.classes;

      return (
                  <Grid container className={classes.grid} key={"Line_"+this.props.index}>
                    <Grid item xs={3} key={"Avatar"+this.props.index}>
                        <Avatar alt="Foto" src={atlantico_img} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={8} key={"Paper_"+this.props.index}>
                    <Typography variant="body2">{this.props.name} </Typography>
                      <Paper className={classes.paper}>
                        <Grid item xs={12}>
                          <Typography
                            variant="subtitle2" component={'div'}
                            className={classes.typography}
                          > 
                            <CardGiftcardIcon
                              fontSize="small"
                              className={classes.iconGift}
                            />{"   "}
                            {this.getDate(this.props.birthDay)}
                          </Typography>
                        </Grid>
                      </Paper>
                    </Grid> 
                    <Grid item xs={1} key={"Button_"+this.props.index}>
                          <MessageOutlinedIcon /> 
                    </Grid> 
                    <Divider variant="middle" />
                  </Grid>
      );
  }
}

class MonthBirthDay extends Component<MonthBirthDayProps, MonthBirthDayState> {
  state: MonthBirthDayState;
  atlantes: Array<AtlantesModel> = []; 

  constructor(props) {
    super(props);
    this.state = { ...props }; 
  }

  getBirthDayMonth = async () => {
    let response = await fetch(config.intranet_api_domain + '/api/user/users');
    let result = await response.json();
    this.atlantes = result.response.map( (atlante: any) => new AtlantesModel(atlante)); 
    this.setState({data: this.atlantes}); 
  }

  render() {
    let { classes } = this.props;
    if (this.state && this.state.data) {
        return (
          <Card className={classes.card}> 
              <CardHeader
                title="Aniversariantes do Mês"
                className={classes.cardHeader}
                titleTypographyProps={{ variant: "subtitle2" }}
              />
              <CardContent>
                <Grid  className={classes.root}>
                  {this.atlantes.slice(0, 3).map((obj, i) => (
                    <Document key={"document_birthday_"+i} index={i} name={obj.name}  birthDay={obj.birthDay} classes={classes} /> 
                  ))}
                </Grid >
              </CardContent> 
          </Card>
        );
  }

    return (
      <Card className={classes.card}>
        <CardActionArea  >
          <CardHeader title="Aniversariantes do Mês" className={classes.cardHeader} titleTypographyProps={{variant:'subtitle2' }} /> 
          <CardContent> 
          <CircularProgress size='40' className={classes.progress}   /> 
          </CardContent>
        </CardActionArea>
      </Card>
    ); 
  }

  componentDidMount() { 
    this.getBirthDayMonth(); 
  }
}

export default withStyles(useStyles)(MonthBirthDay);
