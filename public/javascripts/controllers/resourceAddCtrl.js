/**
 * Created by Letg4 on 2017/9/5.
 */

var userAdd=angular.module('resourceAdd',['globalconfig','ui.router',["select2","toastr","bootstrap-validator"]]);
// userAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });
userAdd.controller("resourceAddCtrl",resourceAddCtrl);
function resourceAddCtrl ($scope,$http,$state,$location) {
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
        var tform = $("#userAddForm");
        tform.bootstrapValidator({
            submitButtons: null,

        });

        // 修复bootstrap validator重复向服务端提交bug
        tform.on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();
        });
        $('#sType').select2({
            minimumResultsForSearch: -1
        });
    });

    $scope.resource={};
    $scope.editflag=$location.search().edit||false;
    $scope.title="新建资源";
    if ($scope.editflag==="true"||$scope.editflag===true){
        $scope.title="编辑资源";
        $scope.editId=$location.search().editId;
        $http({
            method: "POST",
            url: BASE_URL + "resource/resourceUpdate/selectById.form",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data: $.param({
                id:$scope.editId,
                currentPage:1,
                pageSize:1
            })
        }).then(function success(response){
            $scope.resource=response.data;
            initParentSelect();
            $('#sType').val($scope.resource.sType).trigger('change');
            toastr.success("获取资源信息成功");
        },function error(response) {
            if(response.status===401){
                toastr.warning("您所在的用户组没有权限！");
            }else {
                toastr.error("获取要编辑的资源信息失败,错误代码:"+response.status);
            }
            $state.go("资源管理");
        });
    }else {initParentSelect()}
    function initParentSelect() {
        var tourl="resource/resourceAdd/getResOptions.form";
        if ($scope.editflag==="true"){
            tourl="resource/resourceUpdate/getResOptions.form";
        }
        $http({
            method:"GET",
            url: BASE_URL + tourl,
        }).then(function (response) {
            var resOptions= response.data.resOptions;
            if ($scope.editflag==="true") {
                for (var i in resOptions) {
                    if (resOptions[i].id ===$scope.resource.id){
                        resOptions.splice(i,1);
                        break;
                    }
                }
            }
            resOptions.splice(0,0,{id:"-1",text:"设置父资源为空"});
            console.log(resOptions);
            $('#sParentId').select2({
                data: resOptions
            });
            if ($scope.resource.sParentId!=null&&""!=$scope.resource.sParentId){
                $('#sParentId').val($scope.resource.sParentId).trigger('change');
            }
        },function (response) {
            toastr.warning("资源父级资源列表失败");
        });
    }



    $scope.submitAdd=function () {

       var tourl="resource/resourceAdd/add.form";
       if ($scope.editflag==="true"){
           tourl="resource/resourceUpdate/update.form";
       }
        var sparentid=$('#sParentId').select2('data')[0];
        var sType=$('#sType').select2('data')[0];
        if (sparentid.id=="-1"){sparentid.id=null;}
        $scope.currUser=JSON.parse(window.sessionStorage.getItem("currUser"));
        $http({
            method:"POST",
            url:BASE_URL+tourl,
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                createUserId:$scope.currUser.id,
                id:$scope.resource.id,
                sName:$scope.resource.sName,
                sParentId:sparentid.id,
                sUrl:$scope.resource.sUrl,
                sType:sType.id,
                sIcon:$scope.resource.sIcon
            })
        }).then(function (data) {
            if ($scope.editflag==="true"){
                toastr.success("修改资源成功");
            }else{
                toastr.success("创建资源成功");
            }
            $state.go("资源管理");
        },function (data) {
            toastr.error("创建资源失败:"+data.status);
        });
    }
}

