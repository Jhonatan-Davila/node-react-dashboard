import React, { Component } from "react";
import {
    createStyles,
    WithStyles,
    withStyles,
    withTheme, 
} from '@material-ui/core/styles';
import GridDocuments from "../components/GridDocuments";

const useStyles = createStyles({
    root: {
        flexGrow: 1,
      },
    card: {
        marginTop: 50,
        marginRight: 10,
        marginLeft: 10,
        width: "300px",
        height: "400px"
    },    
    cardHeader: {
        display: "flex" /* establish flex container */,
        justifyContent: "space-between",
        fontSize: 20,
        height: 10,
        marginTop: 20,
        padding: 0,
        marginLeft: 20,
        textAlign:'center'
      },
    avatar:{
        marginTop: '4px',
        marginBottom: '4px',
        width:'50px',
        height:'50px'
    },
    cardContent:{
        height:  "330px",
        width: "300px"
    },
    steeper: {
        backgroundColor: "transparent"
    }
  });

const documents = [{titleDoc: 'Suspensão de Acessos'}, {titleDoc: 'Encerrar Projeto'}, 
                   {titleDoc: 'Reporte de Incidente'}, {titleDoc: 'Solicitar Atendimento'},
                   {titleDoc: 'Anti-vírus'}, {titleDoc: 'documento 6'}, {titleDoc: 'documento 7'}, 
                   {titleDoc: 'documento 8'}, {titleDoc: 'documento 9'}, {titleDoc:'documento 10'}]
const title = "SOLICITAÇÕES SPARTAS";
const numberOfDocuments = 6;
const documentsByRow = 2;

class SpartasRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props }; 
      }

    render(){
        return (
                <GridDocuments 
                    title={title}
                    documents={documents}
                    numberOfDocuments={numberOfDocuments}
                    documentsByRow={documentsByRow}
                    classes={useStyles}
                    theme={withTheme}>
                </GridDocuments>
        );
    }
}

export default (SpartasRequests);