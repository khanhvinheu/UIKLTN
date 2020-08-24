import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Quanlydonhang {
    public id: number;
    public NguoiNhan: string;
    public DiaChi: string;
    public DienThoai: number;
    public tongTien:number;
    public phiShip:number;
    public idTrangthai: number;
    public idTaiKhoan: number;
    public idDiaDiem: number;
    public idPhuongthucTT:number;
    public LiDo: string;
    public ngayDat:Date;
    public created_at: Date;
    public updated_at: Date;
    constructor (
        id: number,
        nguoinhan: string,
        diachi: string,
        dienthoai: number,
        tongTien:number,
        phiShip:number,
        idTrangthai: number,
        idTaiKhoan: number,
        iddiadiem: number,
        idPhuongthucTT:number,
        ngayDat:Date,
        lido: string,
        created_at: Date,
        updated_at: Date) {
        this.id = id;
        this.NguoiNhan = nguoinhan;
        this.DiaChi = diachi;
        this.DienThoai = dienthoai;
        this.tongTien= tongTien;
        this.phiShip = phiShip;
        this.idTrangthai = idTrangthai;
        this.idTaiKhoan = idTaiKhoan;
        this.idDiaDiem = iddiadiem;
        this.idPhuongthucTT = idPhuongthucTT;
        this.ngayDat =ngayDat;
        this.LiDo = lido;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
