export class ChiTietDonHang {
    public id: number;
    public soLuong: number;
    public donGia: number;  
    public idDonHang: number;
    public idSanPham: number;
    public chietKhau:number;
    public thanhTien:number;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        soLuong: number,
        donGia: number,        
        idDonHang: number,
        idSanPham: number,
        chietKhau:number,
        thanhTien:number,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.soLuong = soLuong;
        this.donGia = donGia;       
        this.idDonHang = idDonHang;
        this.idSanPham = idSanPham;
        this.chietKhau = chietKhau;
        this.thanhTien = thanhTien;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
