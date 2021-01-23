export class AtlantesModel {

    Id: number;
    manager: string;
    img: string;
    name: string;
    project: string;
    job:string; 
    birthDay:string;

    constructor( atlante?: any) {
        if(atlante){
            this.Id = atlante.Id;
            this.manager = atlante.manager;
            this.img = atlante.img;
            this.name = atlante.name;
            this.project = atlante.project;
            this.job = atlante.job; 
            this.birthDay = atlante.birthDay;
        }
    }
}

export default AtlantesModel;