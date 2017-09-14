/**
 * Created by Letg4 on 2017/9/5.
 */

var userAdd=angular.module('userAdd',['globalconfig','ui.router']);
// userAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });
userAdd.controller("userAddCtrl",userAddCtrl);
function userAddCtrl ($scope,$http,$state,$location) {
    $scope.user={};
    $scope.editflag=$location.search().edit||false;
    $scope.title="新建用户";
    if ($scope.editflag==="true"||$scope.editflag===true){
        $scope.title="编辑用户";
        $scope.editId=$location.search().editId;
        $http({
            method: "POST",
            url: BASE_URL + "user/userUpdate/queryById.form",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            data: $.param({
                id:$scope.editId,
                search:true,
                currentPage:1,
                pageSize:1
            })
        }).then(function success(response){
            console.log(response);
            $scope.user=response.data;
            toastr.success("获取用户信息成功");
        },function error(response) {
            if(response.status===401){
                toastr.warning("您所在的用户组没有权限！");
            }else {
                toastr.error("获取要编辑的用户信息失败,错误代码:" + response.status);
            }
            $state.go('用户管理');
        });
    }else {
        $http({
            method: "GET",
            url: BASE_URL + "user/userAdd/check.form"
        }).then(function success(response){
        },function error(response) {
            if(response.status===401){
                toastr.warning("您所在的用户组没有权限！");
            }else {
                toastr.error("权限验证出错:" + response.status);
            }
            $state.go('用户管理');
        });
    }

    $scope.submitAdd=function () {
        $('#userAddForm').bootstrapValidator('validate');
       if (!$("#userAddForm").data("bootstrapValidator").isValid()){
            toastr.warning("输入不合法");
           return;
       }
       var tourl="user/userAdd/add.form";
       if ($scope.editflag==="true"){
           tourl="user/userUpdate/update.form";
       }
       var uRole=$('#role-selector').val();
       var uRoleList= null;
       if (uRole!=null){
           uRoleList=uRole.toString();
       }
       $scope.currUser=JSON.parse(window.sessionStorage.getItem("currUser"));
       console.log(uRoleList);
        $http({
            method:"POST",
            url:BASE_URL+tourl,
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                createUserId:$scope.currUser.id,
                id:$scope.user.id,
                uName:$scope.user.uName,
                uPassword:$scope.user.uPassword,
                uDescription:$scope.user.uDescription
            })
        }).then(function (data) {
            $scope.user={};
            if ($scope.editflag==="true"){
                toastr.success("修改用户成功");
            }else{
                toastr.success("创建用户成功");
            }
            $state.go("用户列表");
        },function (data) {
            if ($scope.editflag==="true") {
                toastr.error("修改用户失败");
            }else{
                toastr.error("创建用户失败:"+data.status);
            }
        });
    }
}

