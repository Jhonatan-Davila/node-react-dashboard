import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import UserAppLink from './UserAppLink';

@Entity()
export class AppLink {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable:true})
    address: string;

    @Column()
    defaultIndex: number;

    @OneToMany(type => UserAppLink, userAppLink => userAppLink.appLink, {
        eager: true
    })
    userAppLink: UserAppLink;

}

export default AppLink