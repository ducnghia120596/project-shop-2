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
        // khởi tạo mảng rỗng
        $scope.moreImages = [];

        // tự động sinh Alias
        $scope.GetSeoTitle = GetSeoTitle;
        function GetSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        }
        // phương thức để submit
        $scope.EditProduct = EditProduct;

        function EditProduct() {
            $scope.product.MoreImages = JSON.stringify($scope.moreImages);
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

        // Chọn ảnh
        $scope.ChooseImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                $scope.$apply(function () {
                    $scope.product.Image = fileUrl;
                });
            };
            finder.popup();
        };
        // Thêm nhiều ảnh
        $scope.ChooseMoreImage = function () {
            var finder = new CKFinder();
            finder.selectActionFunction = function (fileUrl) {
                var duplicate = false;
                angular.forEach($scope.moreImages, function (i, item) {
                    if (i == fileUrl) {
                        duplicate = true;
                    }
                });
                if (duplicate) {
                    notificationService.displayError('Ảnh đã tồn tại.');
                }
                else {
                    $scope.$apply(function () {
                        $scope.moreImages.push(fileUrl);
                    });
                }
            };
            finder.popup();
        }
        // Load giá trị lên control
        function loadProductDetail() {
            apiService.get('/api/product/getbyid/' + $stateParams.id, null,
                function (result) {
                    $scope.product = result.data;
                    $scope.moreImages = JSON.parse($scope.product.MoreImages);
                },
                function (error) {
                    notificationService.displayError(error.data);
                }
                );
        }

        loadProductCategory();
        loadProductDetail();
    }
})(angular.module('tedushop.products'));