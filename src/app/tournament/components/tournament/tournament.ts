import { League } from './../league-components/league';
export interface ITournament {
    startDate: Date;

    endDate: Date;

    name: string;
}

export class Tournament implements ITournament {

    organiserId: string;

    startDate: Date;

    endDate: Date;

    name: string;

    streamUrl?: string;

    id: number;

    leagues: League[];

} 