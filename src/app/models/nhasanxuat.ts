export class NhaSanXuat {
    public id: number;
    public Ten: string;
    public created_at: Date;
    public updated_at: Date;
    NhaSanXuat() { }
    constructor (id: number, Ten: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.Ten = Ten;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
