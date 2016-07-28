angular.module('demoApp').directive('demoMenu', function($anchorScroll, $location, $timeout, $state, $rootScope, $window){
	return {
		templateUrl: 'sidebar-menu.html',
		controllerAs: '$ctrl',
		controller: function() {
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

		}, 
		link: function(scope, element, attr) {
			scope.stickied = false;
			
			var ticking = false;
			var menuElement = element.find('.docs-menu');
			function scrollListener(e) {
				if (!ticking) {
					$window.requestAnimationFrame(function() {
						if (!scope.stickied && window.scrollY >= element[0].offsetTop + 5) {
							scope.stickied = true;
							scope.$apply()
						} else if (scope.stickied && window.scrollY < element[0].offsetTop + 5) {
							scope.stickied = false;
							scope.$apply()
						}
						ticking = false;
					});
				}
				ticking = true;
			}

			$window.addEventListener('scroll', scrollListener);
			scope.$on('$destroy', function() {
				$window.removeEventListener('scroll', scrollListener);
			});
		}
	};
});