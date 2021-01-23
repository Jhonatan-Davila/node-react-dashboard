import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'; 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'; 
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
  
const styles = createStyles({
  card: {minWidth: '275px', maxWidth: '275px',minHeight: '300px', maxHeight: '300px'},
  cardContent: {
    minHeight: '110px',
    maxHeight: '110px',
    maxWidth: '275px'
  },
  typography: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  cardAction: {
    backgroundColor: '#f5f5f5'
  }
})

interface IPostProps extends WithStyles<typeof styles> {
  title: string;
  date: Date;
  content: string;
  link: string;
  id?: string;
  image?: string;
}

interface IPostState extends IPostProps {}

class CardImage extends Component {
  render() {
    return (
    <img style={{width: '275px', height:'145px'}} src="data:image/jpeg;base64,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"></img>
    )
  }
}

class Post extends Component<IPostProps,IPostState>  {

  state: IPostState;

  constructor (props: IPostProps) {
    super(props);
    this.state = { ...props };
  }

  render() {
    let { classes } = this.props;
    return (
      <div style={{ marginTop: 20, padding: 0 }}>
        <Card className={classes.card}>
          <CardActionArea>
              <CardMedia 
              component = {CardImage}
              title={this.state.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="h6">
              {this.state.title}
              </Typography>
              <Typography variant="subtitle1" className={classes.typography} gutterBottom>
                
              </Typography>
              {/* <Typography component="p">{this.state.content}</Typography> */}
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardAction}>
            <Button size="small" color="primary">
              Abrir
            </Button>
          </CardActions>
        </Card>
    </div>
    );
  }

}

export default withStyles(styles)(Post);