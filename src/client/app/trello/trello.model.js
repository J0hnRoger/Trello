var app;
(function (app) {
    var trello;
    (function (trello) {
        var Ticket = (function () {
            function Ticket(title, description, labels) {
                this.title = title;
                this.description = description;
                this.labels = labels;
            }
            return Ticket;
        })();
        trello.Ticket = Ticket;
    })(trello = app.trello || (app.trello = {}));
})(app || (app = {}));
//# sourceMappingURL=trello.model.js.map