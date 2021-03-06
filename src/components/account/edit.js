export class AccountEditCtrl {

	$nav = 'cancel';

	$actions = [
		{
			label: 'Save',
			icon: 'done',
			click: this.save.bind(this)
		}
	];

	static $inject = ['$rootScope', '$state', 'Upload', 'User', 'Form'];
	constructor($rootScope, $state, Upload, User, Form) {
		if ($rootScope.$user) {
			this.form = $rootScope.$user;
		} else {
			$state.go('app.login');
		}

		this.$rootScope = $rootScope;
		this.$state = $state;
		this.Upload = Upload;
		this.User = User;
		this.Form = Form;
	}

	submit(form) {
		if (form) {
			angular.forEach(form, function(field, key) {
				if (key.charAt(0) !== '$') {
					field.$validate();
				}
			});

			if (form.$valid) {
				this.User.update(this.form, (result) => {
					this.$state.go('app.account');
				});
			}
		}
	}

	save() {
		var ctrl = this.Form.getCtrl('accountEditForm');
		this.submit(ctrl);
	}

	upload(type, files) {
		if (files && files.length > 0) {
			angular.forEach(files, (file) => {
				this.Upload.upload({
					url: '/api/upload',
					file: file
				}).progress((e) => {
					this.$rootScope.$loading = 100.0 * e.loaded / e.total;
				}).success((uploadResult) => {
					this.$rootScope.$loading = false;
					var data = {};
					data[type] = uploadResult.path;
					this.User.update(data, (result) => {
						this.form[type] =  this.$rootScope.$user[type] = result[type];
					});
				});
			});
		}
	}
}
