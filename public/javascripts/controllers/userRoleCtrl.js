/**
 * Created by Letg4 on 2017/9/8.
 */
var userRoleApp=angular.module('userRoleApp',['ui.router','globalconfig']);
userRoleApp.controller("userRoleCtrl",userRoleCtrl);
function userRoleCtrl($scope,$state,$http,$location) {
    $scope.editId=$location.search().editId;
    $http({
        method: "GET",
        url: BASE_URL+"user/userRole/getUserRole.form",
        headers : {
            'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
        },
        params:{
            uid:$scope.editId
        }
    }).then(function (response) {
        $scope.roletree=[];
        var resdata=response.data;
        for(var i in resdata.allRole){
            var role={
                text:resdata.allRole[i].rName,
                roleId:resdata.allRole[i].id,
                state:{
                    selected: false
                }
            };
            $scope.roletree.push(role);

            for(var i in $scope.roletree){
                for (var j in resdata.userRole){
                    if($scope.roletree[i].roleId==resdata.userRole[j]){
                        $scope.roletree[i].state.selected=true;
                    }
                }
            }
            $('#roleTree').treeview({
                data:$scope.roletree,
                nodeIcon: "glyphicon glyphicon-unchecked",
                selectedIcon: "glyphicon glyphicon-check",
                multiSelect:true
            })

        }
    },function (response) {
        if(response.status===401){
            toastr.warning("您所在的用户组没有权限！");
        }else {
            toastr.error("获取角色列表失败");
        }
    });



    $scope.userroleSubmit=function () {
        var sellist=$('#roleTree').treeview('getSelected');
        var rids=[];
        for(var i in sellist){
            rids.push(sellist[i].roleId);
        }
        $http({
            method:"POST",
            url:BASE_URL+"user/userRole/setUserRole.form",
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                uid:$scope.editId,
                rids: JSON.stringify(rids)
            })
        }).then(function (data) {
            toastr.success("用户角色设置成功");
            $state.go("用户管理");
        },function (data) {
            toastr.error("用户角色设置失败");
        });
    };

    $scope.userroleBack=function () {
        $state.go("用户管理");
    };

}