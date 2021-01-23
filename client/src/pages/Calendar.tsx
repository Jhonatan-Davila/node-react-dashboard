import React, { Component } from "react";
import PostModel from "../models/PostModel";
import AtlantesNew from "../components/AtlantesNew";
import MonthBirthDay from "../components/MonthBirthDay";
import Row from "react-bootstrap/Row";
import SlideEvents from "../components/SlideEvents";
import CalendarPublicEvents from "../components/CalendarPublicEvents";

class Calendar extends Component{

  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
         <Row>
          <CalendarPublicEvents />
        </Row>  
      </React.Fragment>
    );
  }
}

export default Calendar;
