var app;
(function (app) {
    var trello;
    (function (trello) {
        'use strict';
        //https://api.trello.com/1/board/557822213a3921e489b8858b?key=718ece59fb18adb49b2a586327b3d969&token=1769fc17a1eeb02e6e1212bf3d00bcd290ef086885dc2689cdaf4e8c27649ce8
        //Get Lists : https://api.trello.com/1/board/557822213a3921e489b8858b/lists?key=718ece59fb18adb49b2a586327b3d969&token=1769fc17a1eeb02e6e1212bf3d00bcd290ef086885dc2689cdaf4e8c27649ce8
        var TrelloService = (function () {
            function TrelloService($http, $q, exception, logger, TrelloApi) {
                var _this = this;
                this.$http = $http;
                this.$q = $q;
                this.exception = exception;
                this.logger = logger;
                this.TrelloApi = TrelloApi;
                this.boardId = "557822213a3921e489b8858b";
                this.listId = "557823e110f274f25cced4d2";
                this.appKey = "718ece59fb18adb49b2a586327b3d969";
                this.secret = "7989d18d4518fbe70c97f8f0e3060dfc2c2d0f2e8252914cff84e93615e8798a";
                this.getPeople = function () {
                    return _this.$http.get('/api/people')
                        .then(_this.success)
                        .catch(_this.fail);
                };
                this.success = function (response) { return response.data; };
                this.fail = function (error) {
                    var msg = error.data.description;
                    var reason = 'query for people failed.';
                    _this.exception.catcher(msg)(reason);
                    return _this.$q.reject(msg);
                };
                //Instantiate the trello service
                TrelloApi.Authenticate().then(function () {
                    logger.info(TrelloApi.Token());
                }, function () {
                    logger.info('no');
                });
            }
            TrelloService.prototype.createCard = function (card) {
                return this.TrelloApi.Rest('POST', 'cards/?name=' + card.title + '&desc=' + card.description + '&idList=' + this.listId).then(function (card) {
                    this.logger.info(card);
                });
            };
            TrelloService.prototype.getLabels = function () {
                var deferred = this.$q;
                return deferred;
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