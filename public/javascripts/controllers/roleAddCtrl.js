/**
 * Created by Letg4 on 2017/9/5.
 */

var roleAdd=angular.module('roleAdd',['globalconfig','ui.router',['bootstrap-validator']]);
// roleAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });
roleAdd.controller("roleAddCtrl",roleAddCtrl);
function roleAddCtrl ($scope,$http,$state,$location) {

    (function($) {
        //自定义表单验证规则
        $.fn.bootstrapValidator.validators = {
            confirm_pass : {
                validate: function(validator, $field, options) {
                    return $("#uPassword").val() === $field.val();
                }
            },
            size_valid:{
                validate: function (validator,$field,options) {
                    var len=$field.val().length;
                    if(len<options.minLen){
                        return false;
                    }
                    if(len>options.maxLen){
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        };
    }(window.jQuery));
    $(function() {
        // validate form
        var tform = $("#roleAddForm");
        tform.bootstrapValidator({
            submitButtons: null,
            fields:{
                rName:{
                    enabled:true,
                    message:'输入不合法',
                    container: null,
                    // 定义每个验证规则
                    validators: {
                        notEmpty: {message: '角色名不能为空'},
                        size_valid: {minLen:0,maxLen:50,message: '角色名长度在6-50之间'}
                    }
                },
                rrDescription:{
                    enabled:true,
                    message:'输入不合法',
                    validators:{
                        size_valid: {minLen:0,maxLen:200,message: '描述长度不能超过200'}

                    }
                }
            }
        });
        // 修复bootstrap validator重复向服务端提交bug
        tform.on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();
        });

    });


    $scope.role={};
    $scope.editflag=$location.search().edit||false;
    $scope.title="新建角色";
    if ($scope.editflag==="true"||$scope.editflag===true){
        $scope.title="编辑角色";
        $scope.editId=$location.search().editId;
        $http({
            method: "POST",
            url: BASE_URL + "role/roleUpdate/query.form",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data: $.param({
                id:$scope.editId,
                currentPage:1,
                pageSize:1
            })
        }).then(function success(response){
            console.log(response);
            $scope.role=response.data.content[0];
            toastr.success("获取角色信息成功");
        },function error(response) {
            if(response.status===401){
                toastr.warning("您所在的用户组没有权限！");
            }else {
                toastr.error("获取要编辑的角色信息失败,错误代码:" + response.status);
            }
            $state.go('角色管理');
        });
    }else {
        $http({
            method: "GET",
            url: BASE_URL + "role/roleAdd/check.form"
        }).then(function success(response){
        },function error(response) {
            if(response.status===401){
                toastr.warning("您所在的用户组没有权限！");
            }else {
                toastr.error("权限验证出错:" + response.status);
            }
            $state.go('角色管理');
        });
    }
    $scope.submitAdd=function () {
       if (!$("#roleAddForm").data("bootstrapValidator").isValid()){
            toastr.warning("输入不合法");
           return;
       }
       var tourl="role/roleAdd/add.form";
       if ($scope.editflag==="true"){
           tourl="role/roleUpdate/update.form";
       }
        $scope.currUser=JSON.parse(window.sessionStorage.getItem("currUser"));
        $http({
            method:"POST",
            url:BASE_URL+tourl,
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                createUserId:$scope.currUser.id,
                id:$scope.role.id,
                rName:$scope.role.rName,
                rDescription:$scope.role.rDescription
            })
        }).then(function (data) {
            $scope.role={};
            if ($scope.editflag==="true"){
                toastr.success("修改角色成功");
            }else{
                toastr.success("创建角色成功");
            }
            $state.go("角色管理");
        },function (data) {
            toastr.error("创建角色失败:"+data.status);
        });
    }
}

