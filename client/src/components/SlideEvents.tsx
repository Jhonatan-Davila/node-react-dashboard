import React, { Component } from "react";
import { createStyles, WithStyles, withStyles, Card, CardActionArea, CardHeader, CardContent, CircularProgress } from "@material-ui/core";
import AtlantesModel from "../models/AtlantesModel";
import Carousel from "react-bootstrap/Carousel";
import config from '../config.json';

const useStyles = createStyles({
  card: {
    marginTop: 50,
    minWidth: "800px",
    maxWidth: "800px",
    minHeight: "420px",
    maxHeight: "450px"
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
  progress:{
    alignContent:'center',
    marginLeft: '10%',
    width: '200px'
  }
});

interface SlideEventsProps extends WithStyles<typeof useStyles> {
  data?: any;
}

interface SlideEventsState extends SlideEventsProps {}

class SlideEvents extends Component<SlideEventsProps, SlideEventsState> {
  state: SlideEventsState;
  atlantes: Array<AtlantesModel> = [];

  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  getNovosAtlantes = async () => {
    let response = await fetch(config.intranet_api_domain + "/api/user/users");
    let result = await response.json();
    this.atlantes = result.response.map(
      (atlante: any) => new AtlantesModel(atlante)
    );
  };

  render() {
    let { classes } = this.props;

    if (this.state && this.state.data) {
      return (
        <Carousel className={classes.card}>
          <Carousel.Item>
            <img
              width={700}
              height={400}
              className="d-block w-100"
              src="https://www.planetabandas.com.br/wp-content/uploads/2018/11/eventos-em-ilhabela.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              width={700}
              height={400}
              className="d-block w-100"
              src="https://tpeventos.com.br/wp-content/uploads/2015/07/evento-000-1030x494.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              width={700}
              height={400}
              className="d-block w-100"
              src="https://www.sincor.org.br/wp-content/uploads/2016/12/Eventos.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader
            title="Novos Atlantes"
            className={classes.cardHeader}
            titleTypographyProps={{ variant: "subtitle2" }}
          />
          <CardContent>
            <CircularProgress size="40" className={classes.progress} />
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  componentDidMount() {
    this.getNovosAtlantes();
    this.setState({ data: this.atlantes });
  }
}

export default withStyles(useStyles)(SlideEvents);