export class User {
    id:string;
    name: string;
    imageurl: string;
    email: string;
    provider: string;
    idtoken: string;

    constructor(id: string, name: string, email: string, imageurl: string, idtoken: string, provider: string) {
        this.id = id;
        this.name = name;
        this.imageurl = imageurl;
        this.email = email;
        this.idtoken = idtoken;
        this.provider = provider;
    }
}