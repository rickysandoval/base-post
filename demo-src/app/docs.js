angular.module('docs', [])
.component('docs', {
	templateUrl: 'docs.html',
	bindings: { $router: '<' },
	controller: function() {
	},
	$routeConfig: [
		{path: '/settings', name: 'Settings', component: 'settings', useAsDefault: true},
		{path: '/base', name: 'Base', component: 'base'},
		{path: '/layout', name: 'Layout', component: 'layout'},
		{path: '/overrides', name: 'Overrides', component: 'overrides'},
		{path: '/utilities', name: 'Utilities', component: 'utilities'},
		{path: '/components', name: 'Components', component: 'components'}
	]
});