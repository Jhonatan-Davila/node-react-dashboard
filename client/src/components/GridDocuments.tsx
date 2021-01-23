import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from '@material-ui/core/CardContent';
import { CardHeader, CardMedia, withTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SpartasIcon from "../styles/images/spartas-icon1.ico";
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import _ from 'lodash';

/**
 *  This component needs the props from the RequestsSpartasProps
 *  interface and the 'classes' prop. 
 *  
 *  The classes prop manage the component style and document style.
 *
 *  Example of classes prop:
 * 
 *  const useStyles = createStyles({
 *   root: {
 *       flexGrow: 1,
 *     },
 *   card: {
 *       marginTop: 50,
 *       marginRight: 10,
 *       marginLeft: 10,
 *       width: "300px",
 *       height: "280px"
 *   },    
 *   cardHeader: {
 *       display: "flex" ,
 *       justifyContent: "space-between",
 *       fontSize: 20,
 *       height: 10,
 *       marginTop: 20,
 *       padding: 0,
 *       marginLeft: 20,
 *       textAlign:'center'
 *    },
 *   avatar:{
 *       marginTop: '4px',
 *       marginBottom: '4px',
 *       width:'50px',
 *       height:'50px'
 *   },
 *   cardContent:{
 *       height: "200px",
 *       width: "300px"
 *   },
 *   steeper: {
 *       backgroundColor: "transparent"
 *   }
 * });
 */
   
interface RequestsSpartasProps {
    id?: String;
    title: String;
    numberOfDocuments: Number;
    documentsByRow: Number;
    documents: {
        titleDoc: String;
        link: String;
    };
}

class Document extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props }; 
      }
        
    render(){
        const classes = this.props.classes;
        const cardSize = Math.ceil(12 / this.props.documentsByRow)
        return (
                <Grid item xs={6} sm={cardSize} zeroMinWidth style={classes.root}>
                    <Card>
                        <CardActionArea>
                            <Grid container wrap="nowrap" alignItems="center" direction='column'  justify='space-evenly'>
                                <Grid item >
                                    <CardMedia alt="Spartas Icon" image={SpartasIcon} style={classes.avatar} />
                                </Grid>
                                <Grid item zeroMinWidth style={classes.paper} >
                                    {this.props.name} 
                                </Grid>
                            </Grid>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
    }
}

class GridDocuments extends Component<RequestsSpartasProps> {    
    constructor(props) {
        super(props);
        this.state = { ...props, activeStep: 0 };         
      }

      handleNext = () => {
        this.setState(prevState => ({
          activeStep: prevState.activeStep + 1,
        }));
      };
    
      handleBack = () => {
        this.setState(prevState => ({
          activeStep: prevState.activeStep - 1,
        }));
      };
    
    render() {
        const { documentsByRow, documents, theme, numberOfDocuments, title, classes } = this.props;

        const isMobile = (window.innerWidth < 576) ? true : false
        const numberOfDocumentsByPage =  isMobile ? (numberOfDocuments / 2) : numberOfDocuments;
        const maxSteps = Math.ceil(documents.length / numberOfDocumentsByPage);
        const documentsChunk = _.chunk(documents, numberOfDocumentsByPage);                
        
        return (
            <Card style={classes.card}>
                <CardHeader                         
                    style={classes.cardHeader}
                    className={JSON.stringify(classes.cardHeader)} 
                    title={title}
                    titleTypographyProps={{ variant: "subtitle2" }}
                    />
                <CardContent style={classes.cardContent} >
                    <Grid container justify='flex-start' spacing={8} alignItems='center'>
                        {documentsChunk[this.state.activeStep].map((element, i) => (
                            <Document classes={classes} name={element.titleDoc} documentsByRow={documentsByRow} key={i} />                                      
                        ))}
                    </Grid>                            
                </CardContent>   
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={this.state.activeStep}
                    style={classes.steeper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === maxSteps - 1}>                                
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}                                
                        </Button>
                    }
                />
            </Card>
        );       
    }
}

export default (GridDocuments);