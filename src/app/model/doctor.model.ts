export class Doctor {
    constructor(
        public _id: string,
        public name: string,
        public medicalSpecialty: string[],
        public availableTimes: AvailableTime[]
    ) {}
}

export interface AvailableTime {
    day: Date;
    hours: string[];
}