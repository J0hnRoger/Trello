module app.trello {
	export interface ICard {
		title : string;
		description : string;
		labels : string[];
		assignedTo : Member[];
		
		stringifiedLabels() : string;
		stringifiedMembers() : string;
		
		setUrlInDescription(id : number, url : string) : void;
		setTitleTicketId(id : number) : void;
	}
	
	export class Ticket implements ICard {
		constructor ( public title : string, public description : string, public labels: string[], public assignedTo : Member[]){}
		
		stringifiedLabels(){
			return this.labels.reduce((a, b) => {
				return a.concat(',', b);
			});
		}
		
		setUrlInDescription(id : number, url : string) {
			this.description = '[T'+id+']('+url+')  ' + this.description;
		}
		
		setTitleTicketId (ticketId : number ){
			this.title = '[T' + ticketId + '] ' +this.title;
		}
		
		stringifiedMembers(){
			var stringifiedMember : string = "";
			angular.forEach(this.assignedTo, (member : Member) => {
				stringifiedMember = stringifiedMember.concat(member.id, ',');
			});
			return stringifiedMember.substr(0, stringifiedMember.length - 1);
		}
	}
	
	export class Member {
		fullName : string;
		id : string;
		username : string;
			
		constructor (member : {}){
			this.fullName = member.fullName;
			this.id = member.id;
			this.username = member.username;
		}
	}
}