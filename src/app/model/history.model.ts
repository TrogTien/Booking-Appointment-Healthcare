export class History {
    constructor(
        public _id: string,
        public patientName: string,
        public appointmentTime: Date,
        public day: string,
        public symptoms: string,
        public price: number,
        public doctorId: string,
        public userId: string
    ) {}
}