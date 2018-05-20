(function (app) {
    app.controller("productCategoryAddController", productCategoryAddController);

    productCategoryAddController.$inject = ['$scope','apiService','notificationService','$state'];
    // $state thuộc ui-router angular ( cơ chế điều hướng )
    function productCategoryAddController($scope, apiService, notificationService, $state) {
        $scope.productCategory = {
            CreatedDate: new Date(),
            Status: true,
            Name: "Danh mục 1"
        }
        // phương thức để submit
        $scope.AddProductCategory = AddProductCategory;

        function AddProductCategory() {
            apiService.post('/api/productcategory/create', $scope.productCategory,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được thêm mới.');
                    // thành công thì chuyển hướng tới trang list productCategory
                    $state.go('product_categories');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
            });
        }

        function loadParentCategory() {
            apiService.get('/api/productcategory/getallparents', null, function (result) {
                //parentCateggory để sử dụng dropdownlist
                $scope.parentCategories = result.data;
            }, function () {
                console.log('Can not get list parent.')
            });
        }
        loadParentCategory();
    }
})(angular.module('tedushop.product_categories'));