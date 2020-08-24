export class Password_reset {
    public id: number;
    public email: string;
    public token: string;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, email: string, token: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}