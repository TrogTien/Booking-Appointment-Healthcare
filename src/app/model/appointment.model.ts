export class Appointment {
    constructor(
        public _id: string,
        public patientName: string,
        public appointmentTime: Date,
        public phone: string,
        public gender: string,
        public day: string,
        public symptoms: string,
        public status: string = 'chua xac nhan',
        public price: number,
        public doctorId: string
    ) {}
}