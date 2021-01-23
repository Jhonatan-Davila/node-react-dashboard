export class PostModel {

    Id: number;
    Date: Date;
    Link: string;
    Title: string;
    Content: string;
    
    constructor( post: any) {
        this.Id = post.Id;
        this.Date = post.Date;
        this.Link = post.Link;
        this.Title = post.Title;
        this.Content = post.Content;
    }
}

export default PostModel;