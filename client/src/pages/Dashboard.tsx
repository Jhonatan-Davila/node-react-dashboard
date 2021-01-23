import React, { Component } from "react";
import PostModel from "../models/PostModel";
import AtlantesNew from "../components/AtlantesNew";
import MonthBirthDay from "../components/MonthBirthDay";
import Row from "react-bootstrap/Row";
import SlideEvents from "../components/SlideEvents";
import CalendarPublicEvents from "../components/CalendarPublicEvents";
import SpartasRequests from "../components/SpartasRequests";
import GridQualityDocuments from "../components/GridQualityDocuments";
import ImportantDocuments from "../components/ImportantDocuments";
import Grid from '@material-ui/core/Grid';

interface IDashboardProps {
  data?: any;
}

interface IDashboardState extends IDashboardProps {}

class Dashboard extends Component<IDashboardProps, IDashboardState> {
  posts: Array<PostModel>;

  state: IDashboardState;

  constructor(props: IDashboardProps) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <SlideEvents />
          </Grid>
        </Grid>
    );
  }
}

export default Dashboard;
