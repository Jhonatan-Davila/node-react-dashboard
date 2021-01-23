import { Controller, Get, Post, Delete, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { HttpService } from '../Services/HttpService';
import { cinfo, cerr } from 'simple-color-print';
import { User } from '../Entities/User';
import { UserRepository } from '../Services/UserRepository';
import { getCustomRepository, getRepository } from 'typeorm';

@Controller('api/user')
class UserController {

    private _httpService: HttpService = new HttpService();
    
    @Get('user')
    async getUser( req: Request, res: Response): Promise<any> {

        try {
            let response = await getRepository(User).findOne();
            cinfo('API: "GET /api/user/user" called with status: ' + 200);

            return res.status(250).json({response: response})

        } catch (err) {
            cerr(err);
            cinfo('ERROR: ' + err);
            return res.status(400).json({response: err});
        }
    }

    @Get('users')
    async getUsers( req: Request, res: Response): Promise<any> {

        try {

            let userRepo = getCustomRepository(UserRepository); 
            let response = await userRepo.getUsers();
            
            cinfo('API: "GET /api/user/users" called with status: ' + 200);

            return res.status(250).json({response: response})

        } catch (err) {
            cerr(err);
            cinfo('ERROR: ' + err);
            res.status(400).json({response: err});
        }
    }

    @Post('user-app-links')
    async postUserAppLinks( req: Request, res: Response): Promise<any> {

        try {
            let userRepo = getCustomRepository(UserRepository);
            await userRepo.setNewUserAppLinks(req.body.user, req.body.link)
            cinfo('API: "GET /api/user/user-app-links" called with status: ' + 200);
            return res.status(250)
        } catch(err) {
            cerr(err)
            cinfo('ERROR: ' + err);
            return res.status(400)
        }
    }

    @Put('update-app-links')
    async updateUserAppLinks( req: Request, res: Response): Promise<any> {
        try {
            let body = req.body
            let userRepo = getCustomRepository(UserRepository);
            await userRepo.updateUserAppLinks(body.links, body.user);
            cinfo('API: "GET /api/user/update-app-links" called with status: ' + 200);
            return res.status(250);
        } catch (err){
            cerr(err)
            cinfo('ERROR: ' + err);
            return res.status(400)
        }
    }

    @Delete("delete-app-link")
    async deleteUserAppLinks( req: Request, res: Response): Promise<any> {
        try {
            let body = req.body;
            let userRepo = getCustomRepository(UserRepository);
            await userRepo.deleteUserAppLinks(body.link, body.user);
            cinfo('API: "GET /api/user/delete-app-link" called with status: ' + 200);
            return res.status(200);
        }
        catch (err) {
            cerr(err);
            cinfo('ERROR: '+ err);
            return res.status(400);
        }
    }

    @Post('save-users')
    async saves( req: Request, res: Response): Promise<any> {
        try { 
            const userRepo = getCustomRepository(UserRepository); 
            req.body.users.forEach((user:any) => userRepo.save(user)); 
            cinfo('API: "GET /api/user/save-users" called with status: ' + 200);
            return res.status(250);
        } catch (err){
            cerr(err)
            cinfo('ERROR: ' + err);
            res.status(400)
        }
    }

    @Post('save-user')
    async save( req: Request, res: Response): Promise<any> {
        try { 
            const userRepo = getCustomRepository(UserRepository);
            cinfo('API: '+ req.body.user.name);
            await userRepo.save(req.body.user);
            cinfo('API: "GET /api/user/save-user" called with status: ' + 200);
            return res.status(250);
        } catch (err){
            cerr(err)
            cinfo('ERROR: ' + err);
            res.status(400)
        } 
    }
}

export default UserController;