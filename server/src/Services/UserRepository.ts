import { getRepository, Repository, EntityRepository, getCustomRepository, getConnection, DeleteResult } from 'typeorm';
import { User } from '../Entities/User';
import { AppLink } from '../Entities/AppLink';
import { UserAppLink } from '..//Entities/UserAppLink';
import { AppLinkRepository } from '../Services/AppLinkRepository';
import { cinfo } from 'simple-color-print'; 
import { isThisMonth } from 'date-fns';
import { isNull } from 'util';


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    SameMonth = (date: Date) => isThisMonth(date);

    public async getUser(): Promise<User | undefined> {
        
        return this.findOne();
    }

    public async getUsers(): Promise<User[] | undefined[]> {
        
        return this.find();
    }

    public async setUserAppLinks(user: User, appLink: AppLink, assignedIndex: number): Promise<UserAppLink> {
        let userAppLinkRepository = getRepository(UserAppLink);
        let userAppLink = userAppLinkRepository.create({name: '', assignedIndex: 0});
        userAppLink.name = appLink.name;
        userAppLink.assignedIndex = assignedIndex;
        userAppLink.user = user;
        userAppLink.address = appLink.address;
        userAppLink.appLink = appLink;
        return await userAppLinkRepository.save(userAppLink);
    }

    public async setNewUserAppLinks(userJson: User, linkJson: UserAppLink): Promise<UserAppLink> {
        let userAppLinkRepository = getRepository(UserAppLink);
        let user = await getRepository(User).findOneOrFail({id: userJson.id})
        let appLink = await getRepository(AppLink).findOneOrFail({name: linkJson.name})
        let userAppLink = userAppLinkRepository.create({name: appLink.name, assignedIndex: linkJson.assignedIndex, user: user, appLink: appLink});
        return await userAppLinkRepository.save(userAppLink)
    }

    public async updateUserAppLinks(appLinks: any[], user: any) {
        cinfo(appLinks.toString())
        for (let appLink of appLinks) {
            await getConnection().createQueryBuilder()
            .update(UserAppLink).set({ assignedIndex: appLink.assignedIndex}).where("id = :id", {id: Number(appLink.id)}).execute()
        }
    }

    public async deleteUserAppLinks( appLink: any, user: any): Promise<DeleteResult> {
        cinfo(appLink)
        return await getConnection().createQueryBuilder()
        .delete().from(UserAppLink).where("id = :id", {id: Number(appLink.id)}).execute();
    }
}