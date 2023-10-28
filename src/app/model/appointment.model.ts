export class Appointment {
    constructor(
        public patientName: string,
        public appointmentDate: Date,
        public symptoms: string,
        public status: string = 'chua xac nhan',
        public price: number,
        public doctorId: string
    ) {}
}