var app;
(function (app) {
    var trello;
    (function (trello) {
        'use strict';
        angular
            .module('app.trello')
            .config(configureStates);
        configureStates.$inject = ['$stateProvider'];
        /* @ngInject */
        function configureStates($stateProvider) {
            var states = getStates();
            states.forEach(function (state) {
                $stateProvider.state(state.state, state.config);
            });
        }
        function getStates() {
            return [
                {
                    state: 'trello',
                    config: {
                        url: '/trello',
                        templateUrl: 'app/trello/trelloForms.html',
                        controller: 'TrelloController',
                        controllerAs: 'vm',
                        title: 'trello',
                        settings: {
                            nav: 3,
                            content: '<i class="fa fa-trello"></i> Trello'
                        }
                    }
                }
            ];
        }
    })(trello = app.trello || (app.trello = {}));
})(app || (app = {}));
//# sourceMappingURL=trello.route.js.map