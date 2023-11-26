export class Doctor {
    constructor(
        public _id: string,
        public name: string,
        public medicalSpecialty: string[],
        public availableTimes: AvailableTime[],
        public address: string,
        public content: string,
        public price: number,
        public userId: string,
        public image: string
    ) {}
}

export interface AvailableTime {
    day: Date;
    hours: string[];
}