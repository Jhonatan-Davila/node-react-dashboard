import React, { Component } from "react";
import {
    createStyles,
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
        height: "300px"
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
        height: "225px",
        width: "300px"
    },
    steeper: {
        backgroundColor: "transparent"
    }
  });

const documents = [{titleDoc: 'Base Histórica de Projetos'}, {titleDoc: 'Documentos Organizacionais'}, 
                   {titleDoc: 'Controle de Registros'}, {titleDoc: 'Auditoria'},
                   {titleDoc: 'Documento 5'}, {titleDoc: 'Documento 6'}, {titleDoc: 'Documento 7'}] 
const title = "DOCUMENTOS DA QUALIDADE";
const numberOfDocuments = 4;
const documentsByRow = 2;

class GridQualityDocuments extends React.Component {
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

export default (GridQualityDocuments);