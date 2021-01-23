import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm"; 
import User from './User';

@Entity()
export class Departments {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string; 

    @OneToOne(type => User, user => user.departments)
    user: User;
    
}

export default Departments;