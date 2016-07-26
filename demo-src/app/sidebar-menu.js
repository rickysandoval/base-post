angular.module('demoApp').component('demoMenu', {
	templateUrl: 'sidebar-menu.html',
	controller: function($anchorScroll, $location, $timeout, $state, $rootScope) {
		var $ctrl = this;

		$ctrl.scrollTo = function(id) {
			console.log(id);
			$location.hash(id);
			$anchorScroll();
		};


		$rootScope.$on('$locationChangeStart', function(e, to, from) {
			if (from.split('#').pop() == $location.hash()) {
				$location.hash('');
			}
		});

	}
});