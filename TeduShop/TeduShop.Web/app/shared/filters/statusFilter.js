/// <reference path="D:\Nam4\LEARN\ASP.net Angular\Demo\Git\project-shop-2\TeduShop\TeduShop.Web\bower_components/angular/angular.js" />
(function (app) {
    app.filter('statusFilter',function(){
        return function(input){
            if (input == true) {
                return 'Kích hoạt';
            }
            else
            {
                return 'Khóa';
            }
        }
    });
})(angular.module('tedushop.common'));