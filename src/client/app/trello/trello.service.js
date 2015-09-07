var app;
(function (app) {
    var trello;
    (function (trello) {
        'use strict';
        //https://api.trello.com/1/board/557822213a3921e489b8858b?key=718ece59fb18adb49b2a586327b3d969&token=1769fc17a1eeb02e6e1212bf3d00bcd290ef086885dc2689cdaf4e8c27649ce8
        //Get Lists : https://api.trello.com/1/board/557822213a3921e489b8858b/lists?key=718ece59fb18adb49b2a586327b3d969&token=1769fc17a1eeb02e6e1212bf3d00bcd290ef086885dc2689cdaf4e8c27649ce8
        var TrelloService = (function () {
            function TrelloService($http, $q, exception, logger, TrelloApi) {
                this.$http = $http;
                this.$q = $q;
                this.exception = exception;
                this.logger = logger;
                this.TrelloApi = TrelloApi;
                this.boardId = "557822213a3921e489b8858b";
                this.listId = "557823e110f274f25cced4d2";
                this.organizationId = "55783d6a8dfed3c489261171";
                //Instantiate the trello service
            }
            TrelloService.prototype.createCard = function (card) {
                var _this = this;
                this.TrelloApi.Authenticate().then(function () {
                    _this.TrelloApi.Rest('POST', 'cards/?name=' + card.title + '&desc=' + card.description + '&idList=' + _this.listId
                        + '&labels=' + card.stringifiedLabels()
                        + '&idMembers=' + card.stringifiedMembers())
                        .then(function (card) {
                        _this.logger.info(card);
                    });
                }, function () {
                    this.logger.error('no');
                });
            };
            TrelloService.prototype.getMembers = function () {
                var deferred = this.$q.defer();
                this.TrelloApi.Rest('GET', 'boards/' + this.boardId + '/members')
                    .then(function (dataMembers) {
                    deferred.resolve(dataMembers.map(function (data) {
                        return new trello.Member(data);
                    }));
                });
                return deferred.promise;
            };
            TrelloService.prototype.getLabels = function () {
                var _this = this;
                var deferred = this.$q.defer();
                this.TrelloApi.Authenticate().then(function () {
                    _this.TrelloApi.boards(_this.boardId)
                        .then(function (board) {
                        _this.logger.info(board);
                        deferred.resolve(board.labelNames);
                    });
                }, function () {
                    this.logger.error('no');
                });
                return deferred.promise;
            };
            TrelloService.$inject = ['$http', '$q', 'exception', 'logger', 'TrelloApi'];
            return TrelloService;
        })();
        trello.TrelloService = TrelloService;
        angular
            .module('app.core')
            .service('TrelloService', TrelloService);
    })(trello = app.trello || (app.trello = {}));
})(app || (app = {}));
//# sourceMappingURL=trello.service.js.map