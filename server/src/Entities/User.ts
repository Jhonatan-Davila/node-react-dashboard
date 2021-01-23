import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index, OneToMany, OneToOne} from "typeorm";
import UserAppLink from './UserAppLink';
import Departments from './Department';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    idNumber:string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable:true})
    manager: string;

    @Column({nullable:true})
    project: string;

    @Column({nullable:true})
    job: string;

    @Column( {nullable:true})
    birthDay:string;  
    
    @Column({nullable:true})
    registration:string;

    @Column({nullable:true})
    dateAdmission:Date;

    @Column({nullable:true})
    active:boolean;

    @OneToOne(type => Departments, departments => departments.user)
    departments: Departments;
    
    @OneToMany( type => UserAppLink, userAppLink => userAppLink.user, { eager: true })
    appLinks: UserAppLink[];

}

export default User;