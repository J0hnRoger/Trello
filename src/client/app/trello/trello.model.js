var app;
(function (app) {
    var trello;
    (function (trello) {
        var Ticket = (function () {
            function Ticket(title, description, labels, assignedTo) {
                this.title = title;
                this.description = description;
                this.labels = labels;
                this.assignedTo = assignedTo;
            }
            Ticket.prototype.stringifiedLabels = function () {
                return this.labels.reduce(function (a, b) {
                    return a.concat(',', b);
                });
            };
            Ticket.prototype.setUrlInDescription = function (id, url) {
                this.description = '[T' + id + '](' + url + ')  ' + this.description;
            };
            Ticket.prototype.setTitleTicketId = function (ticketId) {
                this.title = '[T' + ticketId + '] ' + this.title;
            };
            Ticket.prototype.stringifiedMembers = function () {
                var stringifiedMember = "";
                angular.forEach(this.assignedTo, function (member) {
                    stringifiedMember = stringifiedMember.concat(member.id, ',');
                });
                return stringifiedMember.substr(0, stringifiedMember.length - 1);
            };
            return Ticket;
        })();
        trello.Ticket = Ticket;
        var Member = (function () {
            function Member(member) {
                this.fullName = member.fullName;
                this.id = member.id;
                this.username = member.username;
            }
            return Member;
        })();
        trello.Member = Member;
    })(trello = app.trello || (app.trello = {}));
})(app || (app = {}));
//# sourceMappingURL=trello.model.js.map