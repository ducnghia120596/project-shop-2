(function (app) {
    app.controller("productAddController", productAddController);

    productAddController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];
    // $state thuộc ui-router angular ( cơ chế điều hướng )
    function productAddController($scope, apiService, notificationService, $state) {
        $scope.product = {
            CreatedDate: new Date(),
            Status: true,
        }

        $scope.ckeditorOptions = {
            language: 'vi',
            height:'200px'
        }
        // phương thức để submit
        $scope.AddProduct = AddProduct;

        function AddProduct() {
            apiService.post('/api/product/create', $scope.product,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được thêm mới.');
                    // thành công thì chuyển hướng tới trang list product
                    $state.go('products');
                }, function (error) {
                    notificationService.displayError('Thêm mới không thành công.');
                });
        }

        function loadProductCategory() {
            apiService.get('/api/productcategory/getallparents', null, function (result) {
                //parentCateggory để sử dụng dropdownlist
                $scope.productCategories = result.data;
            }, function () {
                console.log('Can not get list parent.')
            });
        }


        loadProductCategory();

        $scope.ChooseImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.product.Image = fileUrl;
            };
            finder.popup();
        };
    }
})(angular.module('tedushop.products'));