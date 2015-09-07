namespace app.trello {
    'use strict';

    export interface ITrelloService {
        getLabels() : ng.IPromise<{}>;
    }
//https://api.trello.com/1/board/557822213a3921e489b8858b?key=718ece59fb18adb49b2a586327b3d969&token=1769fc17a1eeb02e6e1212bf3d00bcd290ef086885dc2689cdaf4e8c27649ce8
//Get Lists : https://api.trello.com/1/board/557822213a3921e489b8858b/lists?key=718ece59fb18adb49b2a586327b3d969&token=1769fc17a1eeb02e6e1212bf3d00bcd290ef086885dc2689cdaf4e8c27649ce8
    export class TrelloService implements ITrelloService {
        boardId : string = "557822213a3921e489b8858b";
        listId : string = "557823e110f274f25cced4d2";
        organizationId : string = "55783d6a8dfed3c489261171";
        
        static $inject: Array<string> = ['$http', '$q', 'exception', 'logger', 'TrelloApi'];
        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private exception: blocks.exception.IException,
            private logger: blocks.logger.Logger, 
            private TrelloApi : any) {
            //Instantiate the trello service
        }
        
        createCard(card : ICard) {
            this.TrelloApi.Authenticate().then(() => {
                    this.TrelloApi.Rest('POST', 'cards/?name='+ card.title +'&desc='+ card.description +'&idList=' + this.listId 
                        + '&labels=' + card.stringifiedLabels()
                        + '&idMembers=' + card.stringifiedMembers())
                        .then((card : JSON) => {
                            this.logger.info(card);
                        }); 
                }, function(){
                    this.logger.error('no');
                });
        }
        
        getMembers() : ng.IPromise<Member[]> {
            var deferred = this.$q.defer();
            this.TrelloApi.Rest('GET', 'boards/' + this.boardId + '/members' )
                .then( (dataMembers : any) => {
                    deferred.resolve(dataMembers.map((data : {}) => {
                        return new Member(data);
                    }));
                });
            return deferred.promise;
        }

        getLabels() : ng.IPromise<{}> {
            var deferred = this.$q.defer();
            this.TrelloApi.Authenticate().then(() => {
                    this.TrelloApi.boards(this.boardId)
                        .then((board: JSON) => {
                            this.logger.info(board);
                            deferred.resolve(board.labelNames);
                    });
                }, function(){
                    this.logger.error('no');
                });
            return deferred.promise; 
        }
    }

    angular
        .module('app.core')
        .service('TrelloService', TrelloService);
}
