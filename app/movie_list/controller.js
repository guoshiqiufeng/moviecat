(function (angular) {
	'use strict';

	var module=angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http']);

	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);
	module.controller('MovieListController', ['$scope','$route','$routeParams','httpService',
		function($scope,$route,$routeParams,httpService) {
			console.log("category");
			$scope.loading = true;
			var count = 5; // 每一页的条数
			var page=parseInt($routeParams.page);
			var start=(page-1)*count;
			$scope.currentPage = page;
			$scope.totalPages=0;
			$scope.title ='';
			$scope.totalCount=0;
			/*$http.get('./datas/in_theaters.json').then(function (res) {
				console.log(res);
				if(res.status==200){
					$scope.subjects=res.data.subjects;
					$scope.total=res.data.total;
				}
			});*/
			httpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.category, { start:start, count: count, q: $routeParams.q },
				function(data) {
					$scope.title = data.title;
					$scope.subjects = data.subjects;
					$scope.totalCount = data.total;
					$scope.totalPages = Math.ceil($scope.totalCount / count);
					$scope.loading = false;
					$scope.$apply();
				});
			$scope.go=function (page) {
				console.log(page);
				if(page>=1 &&page<=$scope.totalPages){
					$route.updateParams({page:page});
				}
			};
		}]);

})(angular);



