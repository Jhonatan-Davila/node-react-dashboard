import React, { Component } from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CardHeader
} from "@material-ui/core"; 
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea"; 
import CardContent from "@material-ui/core/CardContent"; 
import Grid from "@material-ui/core/Grid"; 
import AtlantesModel from "../models/AtlantesModel";

const useStyles = createStyles({
  card: {
    minWidth: "400px",
    maxWidth: "400px",
    minHeight: "200px",
    maxHeight: "200px",
    marginTop: 50
  },
  paper: {
    height: 50,
    width: 50,
    backgroundColor: "#DCDCDC"
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
    width: 15,
    height: 15,
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
    flexGrow: 1
  }
});

interface QualityDocumentsProps extends WithStyles<typeof useStyles> {
  data: string;
}

interface QualityDocumentsState extends QualityDocumentsProps {}

class QualityDocuments extends Component<QualityDocumentsProps, QualityDocumentsState> {
  state: QualityDocumentsState;
  atlantes: Array<AtlantesModel> = [];
  
  constructor(props) {
    super(props);
    this.state = { ...props }; 
  } 

  render() {
    let { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader
            title="Documentos da Qualidade"
            className={classes.cardHeader}
            titleTypographyProps={{ variant: "subtitle2" }}
          />
          <CardContent>
            <List className={classes.root}>
              {this.atlantes.slice(0, 3).map((item, index) => (
                <ListItem alignItems="flex-start" key={index}>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Grid container className={classes.grid}>
                          <Grid item xs={3}>
                            <Paper className={classes.paper} />
                          </Grid> 
                        </Grid>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  componentDidMount() {}
}

export default withStyles(useStyles)(QualityDocuments);
