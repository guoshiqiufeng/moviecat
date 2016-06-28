(function (angular) {
	'use strict';

	var app= angular.module('moviecat', [
		'ngRoute',
		'moviecat.services.http',
		'moviecat.movie_detail',
		'moviecat.movie_list',
		'moviecat.directives.auto_focus'
	]);
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);
	app.controller('SearchController',['$scope','$route',function ($scope,$route) {
		$scope.input = ''; // 取文本框中的输入
		$scope.search = function() {
			$route.updateParams({ category: 'search', q: $scope.input });
		};
	}]);
})(angular);

