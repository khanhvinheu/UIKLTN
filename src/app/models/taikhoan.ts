export class Taikhoan {
    public id: number;
    public hoTen: string;
    public gioiTinh: string;
    public ngaySinh: Date;
    public dienThoai: string;
    public email: string;
    public email_verified_at: string;
    public diaChi: number;
    public password: number;
    public hinh: number;
    public remember_token: string;
    public idQuyen: number;    
    public trangThai: boolean;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        hoTen: string,
        gioiTinh: string,
        ngaySinh: Date,
        dienThoai: string,
        email: string,
        email_verified_at: string,
        diaChi: number,
        password: number,
        hinh: number,
        remember_token: string,
        idQuyen: number,       
        trangThai: boolean,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.hoTen = hoTen;
        this.gioiTinh = gioiTinh;
        this.ngaySinh=ngaySinh;
        this.dienThoai=dienThoai;
        this.email = email;
        this.email_verified_at = email_verified_at;
        this.diaChi = diaChi;
        this.password = password;
        this.hinh = hinh;
        this.remember_token = remember_token;
        this.idQuyen = idQuyen;       
        this.trangThai = trangThai;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
