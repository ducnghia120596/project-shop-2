﻿/// <reference path="D:\Nam4\LEARN\ASP.net Angular\Demo\Git\project-shop-2\TeduShop\TeduShop.Web\bower_components/angular/angular.js" />
(function () {
    angular.module('tedushop.products', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('products', {
            url: "/products",
            templateUrl: "/app/components/products/productListView.html",
            controller: "productListController"
        }).state('product_add', {
            url: "/product_add",
            templateUrl: "/app/components/products/productAddView.html",
            controller: "productAddController"
        }).state('product_edit', {
            url: "/product_edit/:id",
            templateUrl: "/app/components/products/productEditView.html",
            controller: "productEditController"
        });
    }
})();