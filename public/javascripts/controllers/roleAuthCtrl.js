/**
 * Created by Letg4 on 2017/9/8.
 */
var rAuthApp=angular.module('rAuthapp',['globalconfig','ui.router']);
rAuthApp.controller("rAuthCtrl",rAuthCtrl);
function rAuthCtrl($scope,$http,$location,$state) {
    $scope.authRoleId=$location.search().authId;
    $scope.transData=function (a, idStr, pidStr, chindrenStr){
        var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
        for(; i < len; i++){
            hash[a[i][id]] = a[i];
        }
        for(; j < len; j++){
            var aVal = a[j], hashVP = hash[aVal[pid]];
            if(hashVP){
                !hashVP[children] && (hashVP[children] = []);
                hashVP[children].push(aVal);
            }else{
                r.push(aVal);
            }
        }
        return r;
    };
    $scope.treeSetSelected=function (list,textattr,selattr,rolereslist) {
        for(var i in list){
            list[i].text=list[i][textattr];
            if ($.inArray(list[i][selattr],rolereslist)!=-1){
                list[i].state={selected:true};
            }
        }
    };
    $http({
        method: "GET",
        url: BASE_URL+"role/roleAuth/getResources.form",
        headers : {
            'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
        },
        params:{
            roleId:$scope.authRoleId
        }
    }).then(function (response) {
        $scope.restree=[];
        var resdata=response.data;
        var reslist=resdata.allRes;
        $scope.treeSetSelected(reslist,'sName','sId',resdata.roleRes);
        $scope.restree=$scope.transData(reslist,'sId','sParentId','nodes');
        $('#resourceTree').treeview({
            data:$scope.restree,
            // showCheckbox:true,
            selectedBackColor: '#f5f5f5',
            selectedColor: '#171717',
            nodeIcon: "glyphicon glyphicon-unchecked",
            selectedIcon: "glyphicon glyphicon-check",
            multiSelect:true,
            // onNodeChecked: function (event,node) {
            //     // $('#resourceTree').treeview('selectNode',[node.nodeId,{silent:false}]);
            //     var children=node.nodes;
            //     for(var i in children){
            //         $('#resourceTree').treeview('checkNode',[children[i].nodeId]);
            //         // $('#resourceTree').treeview('selectNode',[children[i].nodeId,{silent:false}]);
            //     }
            // },
            // onNodeUnchecked:function (event,node) {
            //     // $('#resourceTree').treeview('unselectNode',[node.nodeId]);
            //     var children=node.nodes;
            //     for(var i in children){
            //         $('#resourceTree').treeview('uncheckNode',[children[i].nodeId,{silent:false}]);
            //         // $('#resourceTree').treeview('unselectNode',[children[i].nodeId,{silent:false}]);
            //     }
            // },
            onNodeSelected: function (event,node) {
                // $('#resourceTree').treeview('selectNode',[node.nodeId,{silent:false}]);
                var children=node.nodes;
                for(var i in children){
                    $('#resourceTree').treeview('selectNode',[children[i].nodeId]);
                    // $('#resourceTree').treeview('selectNode',[children[i].nodeId,{silent:false}]);
                }
            },
            onNodeUnselected:function (event,node) {
                // $('#resourceTree').treeview('unselectNode',[node.nodeId]);
                var children=node.nodes;
                for(var i in children){
                    $('#resourceTree').treeview('unselectNode',[children[i].nodeId,{silent:false}]);
                    // $('#resourceTree').treeview('unselectNode',[children[i].nodeId,{silent:false}]);
                }
            }
        })
    },function (response) {
        if(response.status===401){
            toastr.warning("您所在的用户组没有权限！");
            return $state.go('角色管理');
        }else {
            toastr.error("获取资源列表失败");
        }
    });


    $scope.authSubmit=function () {
        var roleresList=[];
        var sellist=$('#resourceTree').treeview('getSelected');
        for(var i in sellist){
            roleresList.push(sellist[i].sId);
        }
        console.log(sellist);
        console.log(roleresList);
        $http({
            method:"POST",
            url:BASE_URL+"role/roleAuth/setRoleRes.form",
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                roleId:$scope.authRoleId,
                resIds:JSON.stringify(roleresList)
            })
        }).then(function (response) {
            toastr.success("角色授权成功");
            $state.go("角色管理");
        },function (data) {
            toastr.error("角色授权失败:"+data.status);
        });
    };
    $scope.authBack=function () {
        $state.go("角色管理");
    }
}