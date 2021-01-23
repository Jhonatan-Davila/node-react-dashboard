import {Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinTable} from "typeorm";
import User from './User';
import AppLink from './AppLink';

@Entity()
export class UserAppLink {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    assignedIndex: number;

    @Column({nullable:true})
    address: string;

    @ManyToOne(type => User, user => user.appLinks)
    user: User;

    @ManyToOne(type => AppLink, appLink => appLink.userAppLink)
    appLink: AppLink;

}

export default UserAppLink