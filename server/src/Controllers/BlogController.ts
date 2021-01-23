import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { HttpService } from '../Services/HttpService';
import { cinfo, cerr } from 'simple-color-print';
import { Post }  from '../Models/Posts';

@Controller('api/blog')
class BlogController {

    private _httpService: HttpService = new HttpService();

    @Get('posts')
    async getPosts( req: Request, res: Response): Promise<any> {

        try {

            let response = await this._httpService.get('http://192.168.99.100:8000/?rest_route=/wp/v2/posts/')
            let posts: Array<Post> = JSON.parse(response).map( (item: any) => new Post(item));

            cinfo('API: "GET /api/blog/posts" called with status: ' + 200);
            cinfo(`${posts[0]}`);

            return res.status(250).json({response: posts})

        } catch (err) {
            cerr(err);
            cinfo('ERROR: ' + err);
            res.status(400).json({response: err});
        }
    }

    @Get('postsPaginated')
    async getPostsPaginated(req: Request, res: Response): Promise<any> {
        try {
            let page = req.query.page;
            let response = await this._httpService.get(`http://192.168.99.100:8000/?rest_route=/wp/v2/posts`, {resolveWithFullResponse: true});
            let pages = response.headers['x-wp-totalpages'];
            let posts: Array<Post> = JSON.parse(response.body).map( (item: any) => new Post(item));
            cinfo('API: "GET /api/blog/postsPaginated" called with status: ' + 200);

            return res.status(250).json({response: posts, pages: pages });
        }
        catch (err) {
            cerr(err);
            cinfo('ERROR: ' + err);
            res.status(400).json({response: err});
        }
    }
}

export default BlogController;