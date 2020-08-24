export class Rating {
    constructor(
        public id: number,
        public Diem: number,
        public NoiDung: string,
        public idSanPham: number,
        public idUser: number,
        public Ten: string,
        public Hinh: string,
        public created_at: Date,
        public updated_at: Date
    ) {}
}
