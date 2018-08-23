import { Player } from "../player-components/player";

export class League {
    id: number;

    name: string;

    tournamentId: number;

    players: Player[];

    constructor() {
        this.players = new Array<Player>();

    }
}