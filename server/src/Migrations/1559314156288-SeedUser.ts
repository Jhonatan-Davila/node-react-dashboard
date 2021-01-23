import {MigrationInterface, QueryRunner, getRepository, getCustomRepository} from "typeorm";
import User from '../Entities/User';
import  AppLink  from '../Entities/AppLink';
import { UserRepository } from '../Services/UserRepository';

const userSeed = {
    name:"Test User",
    email:"test@example.com.br",
    password:"teste",
    job:"Product Owner Pleno",
    project:"Dell Matrix",
    manager:"Katryne Rabelo",
    birthDay:"01/02/2019"
}

const userSeed2 = {
    name:"Test User 2",
    email:"teste2@example.com.br",
    password:"teste2",
    job:"Product Owner Pleno",
    project:"Dell Matrix",
    manager:"Katryne Rabelo",
    birthDay:"01/04/2019"
}

const userSeed3 = {
    name:"Test User 3",
    email:"teste3@example.com.br",
    password:"teste3",
    job:"Product Owner Pleno",
    project:"Dell Matrix",
    manager:"Katryne Rabelo",
    birthDay:"01/03/2019"
}

const appLinkSeed = [
    {name: "Home", defaultIndex: 0, address: '/'},
    {name: "Posts", defaultIndex: 1, address: '/posts'},
    {name: "Reddit",defaultIndex: 3, address: 'https://www.reddit.com/'},
    {name: "Github", defaultIndex: 4, address: 'https://github.com/'},
    {name: "Stack Overflow", defaultIndex: 5, address: 'https://stackoverflow.com/'},
    {name: "ReactJS", defaultIndex: 6, address: 'https://reactjs.org/'},
    {name: "NodeJS", defaultIndex: 7, address: 'https://nodejs.org/en/'},
]
export class SeedUser1559314156288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = await getRepository(User).save(userSeed)
        await getRepository(User).save(userSeed2)
        await getRepository(User).save(userSeed3)
        let appLinks = await getRepository(AppLink).save(appLinkSeed)
        let userRepository = getCustomRepository(UserRepository)
        let test = 0
        for(const link of appLinks) {
            await userRepository.setUserAppLinks(user, link, test)
            test += 1
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
