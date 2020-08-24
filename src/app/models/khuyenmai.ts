export class Khuyenmai {
    public id: number;
    public tieuDe: string;
    public chietKhau: number;
    public noiDungKm: string;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, tieuDe: string, chietKhau:number,noiDungKm:string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.tieuDe = tieuDe;
        this,chietKhau= chietKhau;
        this.noiDungKm=noiDungKm;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}