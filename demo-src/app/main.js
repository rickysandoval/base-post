angular.module('demoApp', ['templates', 'docs', 'ui.router'])

.config(function($locationProvider,  $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('overview', {
			url: "/",
			component: 'overview'
		})
		.state('docs', {
			url: "/docs",
			component: 'docs'
		});
})

.value('$routerRootComponent', 'demo')

.component('demo', {
	templateUrl: 'demo.html',
	controller: function() {
	}
});

angular.module('templates', []);