angular.module('demoApp', ['templates', 'ngComponentRouter'])

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
		{path: '/defaults', name: 'Defaults', component: 'defaults'},
		{path: '/settings', name: 'Settings', component: 'settings'},
		{path: '/layout', name: 'Layout', component: 'layout'},
		{path: '/overrides', name: 'Overrides', component: 'overrides'},
		{path: '/utilities', name: 'Utilities', component: 'utilities'},
		{path: '/components', name: 'Components', component: 'components'}
	]
});

angular.module('templates', []);