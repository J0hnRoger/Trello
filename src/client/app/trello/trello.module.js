var app;
(function (app) {
    var trello;
    (function (trello) {
        angular.module("app.trello", [
            'trello'
        ])
            .config(['TrelloApiProvider', config]);
        function config(TrelloApiProvider) {
            TrelloApiProvider.init({
                key: '718ece59fb18adb49b2a586327b3d969',
                secret: '7989d18d4518fbe70c97f8f0e3060dfc2c2d0f2e8252914cff84e93615e8798a',
                scopes: { read: true, write: true, account: true },
                AppName: 'CDS-Board'
            });
        }
    })(trello = app.trello || (app.trello = {}));
})(app || (app = {}));
//# sourceMappingURL=trello.module.js.map