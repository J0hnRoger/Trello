module app.trello {
	
	export class TrelloController {
		card : app.trello.ICard;
		cards : any[];
		labels : string [];
		members : Member[];
		ticketUrl : string = "http://www.google.fr";
		ticketId : number = 42;
		isAdded : boolean = false;
		
		static $inject : Array<string> = ["logger", "TrelloService"];
		constructor(private logger : blocks.logger.Logger, private TrelloService : app.trello.TrelloService){
			this.card = new Ticket("test", "description", [], []);
			TrelloService.getLabels().then((dataLabels : string[]) => {
				this.labels = dataLabels;
			});
			
			TrelloService.getMembers().then((dataMembers) => {
				this.members = <Member[]> dataMembers;
			})
		}
		
		createCard() {
			this.card.setUrlInDescription(this.ticketId, this.ticketUrl);
			this.card.setTitleTicketId(this.ticketId);
			
			this.TrelloService.createCard(this.card)
				.then((card : ICard) => {
					this.isAdded = true;
					this.card = new Ticket("", "", [], []);
					this.isAdded = false;
				});
		}
	}
	
	angular.module("app.trello")
		.controller("TrelloController", TrelloController);
}