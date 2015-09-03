module app.trello {
	
	export class TrelloController {
		card : app.trello.ICard;
		static $inject : Array<string> = ["logger", "TrelloService"];
		constructor(private logger : blocks.logger.Logger, private TrelloService : app.trello.TrelloService){
			this.card = new Ticket("test", "description", ["label"]);
		}
		
		createCard() {
			this.TrelloService.createCard(this.card);
		}
	}
	
	angular.module("app.trello")
		.controller("TrelloController", TrelloController);
}