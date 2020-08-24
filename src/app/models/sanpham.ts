export class Sanpham {
    public id: number;
    public tenSanpham: string;
    public gia:number;
    public soLuong:number;
    public moTa: string;
    public hinhAnh: string;
    public thongTin: string;
    public idNhacungcap: number;
    public tenNhacungcap: string;
    public idDanhMuc: number;
    public idKhuyenmai:number;
    public diaChi:string;
    public rating:number;
    public chietKhau:number;
    public idNSX:number;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        tenSanpham: string,
        gia:number,
        soLuong:number,
        moTa: string,
        hinhAnh: string,
        thongTin: string,
        idNhacungcap: number,
        tenNhacungcap:string,
        idDanhMuc: number,
        idKhuyenmai:number,
        diaChi:string,
        rating:number,
        chietKhau:number,
        idNSX:number,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.tenSanpham = tenSanpham;
        this.gia=gia;
        this.soLuong=soLuong;
        this.hinhAnh = hinhAnh;
        this.moTa = moTa;
        this.thongTin = thongTin;
        this.idNhacungcap = idNhacungcap;
        this.tenNhacungcap=tenNhacungcap;
        this.idDanhMuc = idDanhMuc;
        this.idKhuyenmai=idKhuyenmai;
        this.diaChi=diaChi;
        this.rating=rating;
        this.chietKhau=chietKhau;
        this.idNSX=idNSX,
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
