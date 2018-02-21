/// <reference path="D:\Nam4\LEARN\ASP.net Angular\Demo\Git\project-shop-2\TeduShop\TeduShop.Web\bower_components/angular/angular.js" />
(function(){
    angular.module('tedushop', ['tedushop.products','tedushop.common']).config(config);

    config.$inject = ['$stateProvider','$urlRouterProvider'];

    function config($stateProvider,$urlRouterProvider) {
        $stateProvider.state('home',{
            url: "/admin",
            templateUrl: "/app/components/home/homeView.html",
            controller:"homeController"
        });
        $urlRouterProvider.otherwise('/admin');
    }
})();