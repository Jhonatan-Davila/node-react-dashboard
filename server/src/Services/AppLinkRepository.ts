import { getRepository, Repository } from 'typeorm';
import AppLink from 'src/Entities/AppLink';


export class AppLinkRepository extends Repository<AppLink> {


    public async get(): Promise<AppLink | undefined> {
        //let AppLink = await this.AppLinkRepository.findOne();
        return this.findOne()
    }

    // public async getUserWithAppLinks(): Promise<User | undefined> {
    //     let user = await this.getUser()
    // }
}

export default AppLinkRepository;