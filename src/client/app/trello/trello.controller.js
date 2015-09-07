var app;
(function (app) {
    var trello;
    (function (trello) {
        var TrelloController = (function () {
            function TrelloController(logger, TrelloService) {
                var _this = this;
                this.logger = logger;
                this.TrelloService = TrelloService;
                this.ticketUrl = "http://www.google.fr";
                this.ticketId = 42;
                this.isAdded = false;
                this.card = new trello.Ticket("test", "description", [], []);
                TrelloService.getLabels().then(function (dataLabels) {
                    _this.labels = dataLabels;
                });
                TrelloService.getMembers().then(function (dataMembers) {
                    _this.members = dataMembers;
                });
            }
            TrelloController.prototype.createCard = function () {
                var _this = this;
                this.card.setUrlInDescription(this.ticketId, this.ticketUrl);
                this.card.setTitleTicketId(this.ticketId);
                this.TrelloService.createCard(this.card)
                    .then(function (card) {
                    _this.isAdded = true;
                    _this.card = new trello.Ticket("", "", [], []);
                    _this.isAdded = false;
                });
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