export class Doctor {
    constructor(
        public _id: string,
        public name: string,
        public medicalSpecialty: string[],
        public availableTimes: AvailableTime[],
        public address: string,
        public price: number
    ) {}
}

export interface AvailableTime {
    day: Date;
    hours: string[];
}