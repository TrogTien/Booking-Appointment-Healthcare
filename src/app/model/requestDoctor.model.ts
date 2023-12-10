export class RequestDoctor {
    constructor(
        public _id: string,
        public doctorName: string,
        public phone: string,
        public content: string,
        public address: string,
        public birthday: Date,
        public userId: string
    ) {}
}