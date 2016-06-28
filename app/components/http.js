/**
 * Created by 皓强 on 2016/6/27 0027.
 */
(function (angular) {
	'use strict';
	var http=angular.module('moviecat.services.http',[]);
	http.service('httpService',['$window','$document',function ($window,$document) {
		this.jsonp=function (url,data,callback) {
			var fnSuffix = Math.random().toString().replace('.', '');
			var cbFuncName = 'my_json_cb_' + fnSuffix;
			// 不推荐
			$window[cbFuncName] = callback;
			var querystring = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				querystring += key + '=' + data[key] + '&';
			}
			querystring += 'callback=' + cbFuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			$document[0].body.appendChild(scriptElement);
		};
	}]);
})(angular);
