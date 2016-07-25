angular.module('demoApp', ['templates', 'ngComponentRouter', 'docs', 'ngRoute'])

.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
})

.value('$routerRootComponent', 'demo')

.component('demo', {
	templateUrl: 'demo.html',
	controller: function() {

	},
	$routeConfig: [
		{path: '/', name: 'Overview', component: 'overview', useAsDefault: true },
		{path: '/docs/...', name: 'Docs', component: 'docs'},
	]
});

angular.module('templates', []);