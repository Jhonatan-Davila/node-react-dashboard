import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Post from '../components/Post';
import PostModel from '../models/PostModel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Row from 'react-bootstrap/Row';
import { Button, Link, List, ListItem, ListItemText } from '@material-ui/core';

interface IHomeProps extends RouteComponentProps<any> {
  data?: any;
  pages?: any;
  selectedPage?: any;
}

interface IHomeState extends IHomeProps {}

class Home extends Component<IHomeProps, IHomeState> {

  posts: Array<PostModel>;

  state: IHomeState;

  constructor (props: IHomeProps) {
    super(props);
    this.state = { ...props };
  }

  async getPosts(): Promise<void> {
    try{
    let result = await fetch('/api/blog/posts').then( response => {
      return response.json()});
    this.posts = result.response.map( (post: any) => new PostModel(post));
    this.setState({data: this.posts, pages: result.pages});
    }
    catch(err) {
      console.log(err);
    }
  }

  formatDate(date: Date): string {
    var monthNames = [
      "Janeiro", "Fevereiro", "Março",
      "Abril", "Maio", "Junho", "Julho",
      "Agosto", "Setembro", "Outubro",
      "Novembro", "Dezembro"
    ];

    date = new Date(date);
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' de ' + year;
  }

  async getPostsPaginated(page: any): Promise<any> {
    try {
      let result = await fetch(`/api/blog/postsPaginated?page=${page}`).then( res => res.json());
      debugger;
      this.posts = result.response.map((post: any) => new PostModel(post));
      this.setState({data: this.posts, pages: result.pages, selectedPage: page});
    }
    catch(err) {
      console.log(err);
    }
  }

  componentWillMount() {
    //this.getPosts();
    this.getPostsPaginated(1);
  }

  async routeChange(item): Promise<void> {
    this.props.history.push(
      {
        pathname: `/posts/${item.Id}`,
        state: item
      })
  }
    
  render() {

    let pageButtons = []
      if (this.state && this.state.data) {
        for(var i = 0; i < this.state.pages; i++) {
          let pageNumber = (i+1).toString()
          pageButtons.push(
          <Button variant={this.state.selectedPage && this.state.selectedPage == pageNumber? "contained" : "outlined" } style={{margin: 5}}
           onClick={e => this.getPostsPaginated(pageNumber)}>
            {pageNumber}
          </Button>)
        }
        return (
          <React.Fragment> 
            <div style={{marginTop: 40}}>
            <Typography variant="h3" style={{justifyContent: 'center', textAlign: 'center', marginTop: 15}}>Notícias Recentes</Typography>
            <Grid container spacing={40} justify="center">
                {this.posts.slice(0, 3).map( (item, index) => 
                  <Grid item key={index} onClick={e => this.routeChange(item)}>
                    {<Post title={item.Title} date={item.Date} content={item.Content} link={item.Link} /> }
                  </Grid>
                )}
            </Grid>
            </div>
            <Grid container direction="column" justify="flex-start">
              <Typography variant="h5">Outras notícias</Typography>
              <List>
                {this.posts.slice(3).map((item, index) => 
                <ListItem button color="primary" onClick={e => this.routeChange(item)}>
                  <ListItemText primary={item.Title} secondary={this.formatDate(item.Date)}></ListItemText>
                      {/* <Typography style={{fontWeight: 'bold'}}>{item.Title}</Typography>
                    <Typography style={{fontWeight: 'lighter', marginLeft: 10}}>{this.formatDate(item.Date)}</Typography> */}
                </ListItem>
                )}
                </List>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Row> {pageButtons} </Row>        
            </Grid>
          </React.Fragment>
        );
      }
      return ( 
      <React.Fragment> 
        <Row>
          <Grid container spacing={40} justify="center" style={{marginTop: 15}}>
            <div style={{ marginTop: 20, padding: 0 }}>
            <Typography variant="h6"> Carregando posts... </Typography>
            </div>
          </Grid>
        </Row>
      </React.Fragment>)
    }
}

export default Home;