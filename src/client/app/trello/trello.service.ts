namespace app.trello {
    'use strict';

    export interface ITrelloService {
        getLabels: () => ng.IPromise<string[]>;
    }
//https://api.trello.com/1/board/557822213a3921e489b8858b?key=718ece59fb18adb49b2a586327b3d969&token=1769fc17a1eeb02e6e1212bf3d00bcd290ef086885dc2689cdaf4e8c27649ce8
//Get Lists : https://api.trello.com/1/board/557822213a3921e489b8858b/lists?key=718ece59fb18adb49b2a586327b3d969&token=1769fc17a1eeb02e6e1212bf3d00bcd290ef086885dc2689cdaf4e8c27649ce8
    export class TrelloService implements ITrelloService {
        boardId : string = "557822213a3921e489b8858b"; 
        listId : string = "557823e110f274f25cced4d2"
        appKey : string = "718ece59fb18adb49b2a586327b3d969";
        secret : string = "7989d18d4518fbe70c97f8f0e3060dfc2c2d0f2e8252914cff84e93615e8798a";
        
        static $inject: Array<string> = ['$http', '$q', 'exception', 'logger', 'TrelloApi'];
        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private exception: blocks.exception.IException,
            private logger: blocks.logger.Logger, 
            private TrelloApi : any) {
            //Instantiate the trello service
            TrelloApi.Authenticate().then(function(){
                logger.info(TrelloApi.Token());
            }, function(){
                logger.info('no');
            });
        }
        
        createCard(card : ICard) {
            return this.TrelloApi.Rest('POST', 'cards/?name='+ card.title +'&desc='+ card.description +'&idList=' + this.listId).then(function(card : JSON){
                this.logger.info(card);
            });
        }
        
        getLabels() {
            var deferred = this.$q;
            
            return deferred;
        }
        
        getPeople: () => ng.IPromise<any> = () =>
            this.$http.get('/api/people')
                .then(this.success)
                .catch(this.fail);

        private success: (response: any) => {} = (response) => response.data;

        private fail: (error: any) => {} = (error) => {
            var msg = error.data.description;
            var reason = 'query for people failed.';
            this.exception.catcher(msg)(reason);
            return this.$q.reject(msg);
        }
    }

    angular
        .module('app.core')
        .service('TrelloService', TrelloService);
}
