module app.trello {
	export interface ICard {
		title : string;
		description : string;
		labels : string[];
	}
	
	export class Ticket implements ICard {
		constructor ( public title : string, public description : string, public labels: string[]){}
		
	}
}