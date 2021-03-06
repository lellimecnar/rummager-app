export class SidenavCtrl {

	static $inject = ['$mdSidenav', '$state', '$rootScope', 'User'];
	constructor($mdSidenav, $state, $rootScope, User) {
		this.$mdSidenav = $mdSidenav;
		this.$state = $state;
		this.$rootScope = $rootScope;
		this.User = User;
	}

	close() {
		this.$mdSidenav('left').close();
	}

	click(state) {
		this.close();

		switch (state) {
			case 'user':
				if (this.$rootScope.$user) {
					state = 'app.account';
				} else {
					state = 'app.login';
				}
				break;
		}

		this.$state.go(state);
	}
}
