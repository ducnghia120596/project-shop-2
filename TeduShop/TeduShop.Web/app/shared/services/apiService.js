/// <reference path="D:\Nam4\LEARN\ASP.net Angular\Demo\Git\project-shop-2\TeduShop\TeduShop.Web\bower_components/angular/angular.js" />
(function (app) {
    app.service('apiService', apiService);

    //apiService.$inject = ['$http'];

    //function apiService($http) {
    //    return {
    //        get : get
    //    }
    //    function get(url, params, success, failure) {
    //        $http.get(url, params).then(function (result) {
    //            success(result);
    //        }, function (error) {
    //            failure(error);
    //        });
    //    }
    //}
    apiService.$inject = ['$http'];
    function apiService() {
        return {
            get:get
        }

        function get(url, params, success, failure) {
            $http.get(url, params).then(function (result) {
                success(result);
            }, function (error) {
                failure(error);
            });
        }
    }
})(angular.module('tedushop.common'));