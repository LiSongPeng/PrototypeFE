var detail = angular.module("detail", ['globalconfig']);

function getParameter(name) {
    var str = window.location.href;
    return str.substr(str.indexOf(name) + name.length + 1, str.length);
}

var detailController = detail.controller("detailController", ["$scope", "$http", "$sce", function ($scope, $http, $sce) {
    var detailId = getParameter("detailId");
    if (!detailId) {
        toastr.error("没有输入查询的知识ID");
        return;
    }
    $scope.getTrustedHtml = function (html) {
        return $sce.trustAsHtml(html);
    };
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    $http({
        method: "GET",
        url: BASE_URL+"repo/getKnowledgeDetail.form?id=" + detailId,
    }).then(function successCallback(response) {
        if (response.data.flag == 200) {
            $scope.response = response.data.data;
            $scope.response.createTime = new Date($scope.response.createTime).Format("yyyy-MM-dd hh:mm:ss");
            $scope.response.kApprTime = new Date($scope.response.kApprTime).Format("yyyy-MM-dd hh:mm:ss");
        } else {
            toastr.info("未查找到结果");
        }

    }, function errorCallback(response) {
        toastr.error("数据加载失败");
    });
}]);