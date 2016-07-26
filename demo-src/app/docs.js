angular.module('docs', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/docs', function($state) {
		$state.transitionTo('settings');
	});
	$stateProvider
		.state('settings', {
			parent: 'docs',
			url: '/settings',
			component: 'settings'
		})
		.state('base', {
			parent: 'docs',
			url: '/base',
			component: 'base'
		});

})
.component('docs', {
	templateUrl: 'docs.html',
	controller: function() {
	},
	$routeConfig: [
		{path: '/base', name: 'Base', component: 'base'},
		{path: '/layout', name: 'Layout', component: 'layout'},
		{path: '/overrides', name: 'Overrides', component: 'overrides'},
		{path: '/utilities', name: 'Utilities', component: 'utilities'},
		{path: '/components', name: 'Components', component: 'components'}
	]
});