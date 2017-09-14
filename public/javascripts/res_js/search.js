var search = angular.module("search", ["globalconfig"]);
search.controller("searchController", ["$scope", "$http", "$sce",function ($scope, $http, $sce) {
    $scope.displayResult = false;
    $scope.response = {
        data: {
            pageNum: 1
        },
    };
    $scope.orderBy = "1";
    $scope.order = "2";
    $scope.isActive = function (page) {
        if (page == $scope.response.data.pageNum)
            return "active";
        return "";
    }
    $scope.getTrustedHtml = function (html) {
        return $sce.trustAsHtml(html);
    };
    $scope.search = function (page) {
        if (!page && page != 0)
            page = 1;
        if (page < 1 || page > $scope.response.data.pages) {
            toastr.error("页码错误");
            return;
        }
        if (!$scope.keyWord) {
            toastr.error("关键字不能为空");
            return;
        }
        $http({
            method: "GET",
            url: BASE_URL+"repo/searchIndex.form?keyWord=" + $scope.keyWord
            + "&page=" + page + "&orderBy=" + $scope.orderBy + "&order=" + $scope.order,
        }).then(function successCallback(response) {
            if (response.data.data.pages > 0) {
                $scope.response = response.data;
                $scope.displayResult = true;
                var pagers = [];
                var pageNum = $scope.response.data.pageNum;
                var totalPages = $scope.response.data.pages;
                for (var i = -4; i < 5; i++) {
                    if (pageNum + i > 0 && pageNum + i <= totalPages)
                        pagers.push(pageNum);
                }
                $scope.pagers = pagers;
                $scope.jumpToPage = pageNum;
            } else {
                toastr.info("未查找到结果");
            }

        }, function errorCallback(response) {
            toastr.error("数据加载失败");
        });
    };
    jQuery('#keyWord').typeahead({
        source: function (keyWord, process) {
            /*jQuery.getJSON(BASE_URL+'repo/getInputHint.form', , function (response) {
                process(response.data);
            });*/
            $.ajax({
                type: "GET",
                url: BASE_URL+"repo/getInputHint.form",
                data: {"keyWord": keyWord},
                dataType: "json",
                headers: {"Current-UserId": JSON.parse(window.sessionStorage.getItem("currUser")).id},
                success: function (response) {
                    process(response.data);
                }
            });
        },
        updater: function (item) {
            return item.replace(/<a(.+?)<\/a>/, ""); //这里一定要return，否则选中不显示
        },
        /*            afterSelect: function (item) {
         alert(item);
         },*/
        items: 6, //显示6条
        delay: 500 //延迟时间
    });
}]);