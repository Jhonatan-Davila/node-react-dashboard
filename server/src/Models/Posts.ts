export class Post {

    Id: number;
    Date: Date;
    Link: string;
    Title: string;
    Content: string;
    
    constructor( post: any) {
        this.Id = post.id;
        this.Date = post.date;
        this.Link = post.link;
        this.Title = post.title.rendered;
        this.Content = post.content.rendered;
    }
}

export default Post;