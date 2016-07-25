angular.module('demoApp').component('demoMenu', {
	templateUrl: 'sidebar-menu.html',
	bindings: { router: '<' },
	controller: function($rootScope) {
		var $ctrl = this;
		var router = this.router;
		$rootScope.$on('$routeChangeSuccess', function() {
			$ctrl.route = router.parent.lastNavigationAttempt.split('/').pop()
		});
	}
});