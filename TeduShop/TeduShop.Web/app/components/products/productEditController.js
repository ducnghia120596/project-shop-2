(function (app) {
    app.controller("productEditController", productEditController);

    productEditController.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams', 'commonService'];
    // $state thuộc ui-router angular ( cơ chế điều hướng )
    function productEditController($scope, apiService, notificationService, $state, $stateParams, commonService) {
        $scope.product = {
            UpdatedDate: new Date(),
        }

        $scope.ckeditorOptions = {
            language: 'vi',
            height: '200px'
        }
        // tự động sinh Alias
        $scope.GetSeoTitle = GetSeoTitle;
        function GetSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        }
        // phương thức để submit
        $scope.EditProduct = EditProduct;

        function EditProduct() {
            apiService.put('/api/product/update', $scope.product,
                function (result) {
                    notificationService.displaySuccess(result.data.Name + ' đã được cập nhật.');
                    // thành công thì chuyển hướng tới trang list product
                    $state.go('products');
                }, function (error) {
                    notificationService.displayError('Cập nhật không thành công.');
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

        function loadProductDetail() {
            apiService.get('/api/product/getbyid/' + $stateParams.id, null,
                function (result) {
                    $scope.product = result.data;
                },
                function (error) {
                    notificationService.displayError(error.data);
                }
                );
        }
        loadProductDetail();
    }
})(angular.module('tedushop.products'));