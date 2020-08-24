export class DanhGia {
    constructor(
        public id: number,
        public Diem: number,
        public NoiDung: string,
        public idSanPham: number,       
        public idTaikhoan: number,
        public created_at: Date,
        public updated_at: Date
    ) {}
}
