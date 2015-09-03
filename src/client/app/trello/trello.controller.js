var app;
(function (app) {
    var trello;
    (function (trello) {
        var TrelloController = (function () {
            function TrelloController(logger, TrelloService) {
                this.logger = logger;
                this.TrelloService = TrelloService;
                this.card = new trello.Ticket("test", "description", ["label"]);
            }
            TrelloController.prototype.createCard = function () {
                this.TrelloService.createCard(this.card);
            };
            TrelloController.$inject = ["logger", "TrelloService"];
            return TrelloController;
        })();
        trello.TrelloController = TrelloController;
        angular.module("app.trello")
            .controller("TrelloController", TrelloController);
    })(trello = app.trello || (app.trello = {}));
})(app || (app = {}));
//# sourceMappingURL=trello.controller.js.map