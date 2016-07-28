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
		})
		.state('layout', {
			parent: 'docs',
			url: '/layout',
			component: 'layout'
		})
		.state('components', {
			parent: 'docs',
			url: '/components',
			component: 'components'
		})
		.state('utilities', {
			parent: 'docs',
			url: '/utilities',
			component: 'utilities'
		})
		.state('overrides', {
			parent: 'docs',
			url: '/overrides',
			component: 'overrides'
		});

})
.component('docs', {
	templateUrl: 'docs.html',
	controller: function() {
	}
});