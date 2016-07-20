angular.module('demoApp').component('components', {
	templateUrl: 'components.html',
	controller: function() {
		this.changeFormSize = function(fontSize) {
			switch (fontSize) {
				case 'small':
					this.sizeClass="fontSize-n1"
					break;
				case 'normal':
				this.sizeClass="fontSize-1"
					break;
				case 'large':
					this.sizeClass="fontSize-2"
					break
			}
		}
		this.sizeClass = 'fontSize-1';
	}
});