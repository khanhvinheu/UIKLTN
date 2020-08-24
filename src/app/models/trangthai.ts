export class TrangThai {
    public id: number;
    public tenTrangthai: string;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, tenTrangthai: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.tenTrangthai = tenTrangthai;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
