export class Nhacungcap {
    public id: number;
    public tenNhacungcap: string;
    public diaChi: string;
    public soDienthoai: string;
    public email: string;
    public thongTin: string;
    public moTa: string;
    public hinhAnh: string;
    public trangThai: number;
    public idTaiKhoan: number;
    public idQuyen:number;
    public trangThaitk:number;
    public created_at: Date;
    public updated_at: Date;
    constructor (id: number, tenNhacungcap: string,diaChi:string,soDienthoai:string,email:string,thongTin:string,moTa:string,hinhAnh:string,
        trangThai:number,idTaiKhoan:number, idQuyen:number, trangThaitk:number ,created_at: Date, updated_at: Date) {
        this.id = id;
        this.tenNhacungcap = tenNhacungcap;
        this.diaChi=diaChi;
        this.soDienthoai=soDienthoai;
        this.email=email;
        this.thongTin=thongTin;
        this.moTa=moTa;
        this.hinhAnh=hinhAnh;
        this.trangThai=trangThai;
        this.idTaiKhoan=idTaiKhoan;
        this.idQuyen = idQuyen;
        this.trangThaitk = trangThaitk;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}