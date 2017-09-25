/**
 * Created by Letg4 on 2017/8/14.
 */
var vbool = false;
$(".left-top-container").mousedown(function (e) {
    vbool = true;
    vHeight = e.pageY;
    vWidth = e.pageX;
    cHeight = vHeight - $(".left-container").offset().top;
    cWdith = vWidth - $(".left-container").offset().left;
    //alert("divshow" + $(".left-container").offset().top + " divvHeight" + vHeight);
    //alert("高" + cHeight + " 宽" + cWdith);
});
$(document).mouseup(function () {
    vbool = false;
});
var my_showWidth = $(".left-container").width();
var my_showHeight = $(".left-top-container").height();
var documentWidth = $(document).width();
var documentHeight = $(document).height();
$(document).mousemove(function (e) {
    if (vbool) {
        var divheight = e.pageY - cHeight;//窗口要移动到的位置
        var divwidth = e.pageX - cWdith;//窗口要移动到的位置
        if (divwidth < 5) {
            divwidth = 5;
        }
        if (divheight < 10) {
            divheight = 10;
        }
        if (divwidth > documentWidth - my_showWidth) {
            divwidth = documentWidth - my_showWidth - 5;
        }
        if (divheight > documentHeight - my_showHeight ) {
            divheight = documentHeight - my_showHeight - 20;
        }
        $(".left-container").css({ "left": divwidth, "top": divheight });
    }
});
var map= new BMap.Map("map-container");
var point=new BMap.Point(117.041,39.108);
const YYAPIH="http://yingyan.baidu.com/api/v3/fence/";
map.centerAndZoom(point,11);
map.enableScrollWheelZoom();
map.addControl(new BMap.NavigationControl());
var overlays=null;

var styleOptions = {
    strokeColor:"red",    //边线颜色。
    fillColor:"red",            //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 2,       //边线的宽度，以像素为单位。
    strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
    fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
};
var drawingManager = new BMapLib.DrawingManager(map,{
    isOpen: false, //是否开启绘制模式
    drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
        offset: new BMap.Size(5, 5) //偏离值
    },//是否显示工具栏
    enableCalculate: false,
    circleOptions: styleOptions, //圆的样式
    polylineOptions: styleOptions, //线的样式
    polygonOptions: styleOptions, //多边形的样式
    rectangleOptions: styleOptions //矩形的样式
});
drawingManager.addEventListener('overlaycomplete',function (e) {
    overlays=e.overlay;
    // console.log(e.overlay);
    drawingManager.close();
});
var eleApp=angular.module('eleFence',[]);
eleApp.controller('fenceCtrl',['$scope','$http','$rootScope',eleFenceCtrl]);
function eleFenceCtrl($scope,$http,$rootScope) {
    $scope.mapstatus="none";
    $scope.fenceList=[
        {id:1,name:'围栏1',type:'circle',monitor:'#allentity',overlay:{
            center:{lng:117.041,lat:39.108},
            radius:5000.0
        }},
        {id:3,name:'围栏2',type:'circle',monitor:'实体1',overlay:{
            center:{lng:117.041,lat:39.108},
            radius:2500.0
        }},
        {id:4,name:'围栏3',type:'polygon',monitor:'实体2',overlay:{
            path:[{lng:117.1,lat:39.1},{lng:117.2,lat:39.1},{lng:117.2,lat:39.2},{lng:117.1,lat:39.2}]
        }},
        {id:5,name:'围栏4',type:'polygon',monitor:'实体2',overlay:{
            path:[{lng:117.2,lat:39.2},{lng:117.3,lat:39.2},{lng:117.3,lat:39.3},{lng:117.2,lat:39.3}]
        }},
        {id:6,name:'围栏5',type:'polygon',monitor:'实体2',overlay:{
            path:[{lng:117.1,lat:39.1},{lng:117.4,lat:39.2},{lng:117.4,lat:39.4},{lng:117.2,lat:39.4}]
        }}
    ];
    $scope.ctrlbarClps=function(){
        if(!$(".left-bot-container").is(":visible")){
            $(".left-bot-container").slideDown(300,function(){
                $(".new-fence-btn").fadeIn(300);
            });
            $(".toggle-icon i").removeClass("rotated");
        }else {
            $(".new-fence-btn").fadeOut(200);
            $(".left-bot-container").slideUp(300);
            $(".toggle-icon i").addClass("rotated");
        }
    };
    $scope.mapstatusReset=function () {
        if($scope.mapstatus=="new"){
            $("#draw-edit").removeClass("active");
            map.removeOverlay(overlays);
            overlays= null;
            drawingManager.close();
            $(".draw-btn-container .btn-flipper").removeClass('rotated');
        }else if($scope.mapstatus=="show"){
            map.removeOverlay(overlays);
            overlays= null;
            // $(".panel-body .btn-flipper.rotated").removeClass("rotated");
            $(".side-ctrl-btn-group .btn-flipperY.rotated").removeClass("rotated");
            // $(".collapse").slideUp('fast');
            $(".panel").removeClass("slcted");
        }
        $scope.mapstatus="none";
        return true;
    };
    $scope.drawFence=function (e) {
        $scope.mapstatusReset();
        $(".new-fence-btn").addClass("drawing");
        $scope.mapstatus="new";
        $("#draw-type-btn-group>.btn").removeClass("active");
        switch ($(e.target).attr('draw-type')){
            case "circle":
                drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
                break;
            case "rectangle":
                drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
                break;
            case "polygon":
                drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
                break;
            default:
                return;
        }
        $('.btn-flipper').addClass('rotated');
        drawingManager.open();
    };
    $scope.drawCancel=function(e){
        $scope.mapstatusReset();
        $(".new-fence-btn").removeClass("drawing");
    };
    $scope.drawEdit=function(e) {
        if($(e.target).hasClass("active")){
            overlays.disableEditing();
            $(e.target).removeClass("active");
        }else{
            overlays.enableEditing();
            $(e.target).addClass("active");
        }
        console.log(angular.toJson(overlays.getPath()));
    };
    $scope.drawSubmit=function(e) {
        if($("#draw-edit").hasClass("active")){
            overlays.disableEditing();
            $("#draw-edit").removeClass("active");
        }
        var fence=overlays;
        console.log(fence instanceof BMap.Circle);
        if (fence instanceof BMap.Circle){
            var data={
                name:"围栏1",
                monitor:"#allentity",
                overlay:{
                    center:overlays.getCenter(),
                    radius:overlays.getRadius()
                }
            };
            console.log(data);
            $http.post("http://localhost:3000/elecFence/addFence",data,{
                headers:{'Content-Type': 'application/json;charset=utf-8'}
            }).then(function (res) {
                console.log("ok!");
                console.log(res.data);
            },function (res) {
                console.log("wrong!");
                console.log(res.data);
            });
            alert("start!");

        }
    };
    $scope.slctFence=function (e){
        // $("#collapse"+$(e.target).attr('id')).is(":visible")
        if ($(e.target).parents(".panel").hasClass("slcted")) {
            $(e.target).parents(".panel").removeClass("slcted");
            map.removeOverlay(overlays);
            overlays=null;
            return;
        }
        $scope.mapstatusReset();
        $(e.target).parents(".panel").addClass("slcted");
        // $("#collapse"+$(e.target).attr('id')).slideDown('fast');
        $scope.mapstatus="show";
        var fenceid=$(e.target).parents(".fence-item-heading").attr('id');
        for(var i=0;i<$scope.fenceList.length;i++){
            if($scope.fenceList[i].id==fenceid){
                if($scope.fenceList[i].type=='circle'){
                    overlays=new BMap.Circle($scope.fenceList[i].overlay.center,
                        $scope.fenceList[i].overlay.radius,
                        styleOptions);
                    console.log(overlays);
                    map.addOverlay(overlays);
                    map.setViewport(map.getViewport([overlays.getCenter()],{
                        zoomFactor:-6
                    }));
                }else if($scope.fenceList[i].type=='polygon'){
                    var path=$scope.fenceList[i].overlay.path;
                    overlays=new BMap.Polygon(path,styleOptions);
                    map.addOverlay(overlays);
                    map.setViewport(map.getViewport(overlays.getPath()));
                }
            }
        }
    };
    $scope.editFence=function (e) {
        overlays.enableEditing();
        $(e.target).parents(".btn-flipperY").addClass("rotated");
    };
    $scope.cancelEditFence= function (e) {
        map.removeOverlay(overlays);
        overlays = null;
        var id=$(e.target).parents(".fence-item-heading").attr('id');
        $scope.fenceList.forEach(function (value, index, arr) {
            if(value.id==id){
                if(value.type=='circle'){
                    overlays=new BMap.Circle(value.overlay.center,
                        value.overlay.radius,
                        styleOptions);
                }else if(value.type=='polygon'){
                    overlays=new BMap.Polygon(value.overlay.path,styleOptions);
                }
                map.addOverlay(overlays);
            }
        });
        $(e.target).parents(".btn-flipperY").removeClass("rotated");
    };
    $scope.commitEditFence=function (e) {
        overlays.disableEditing();
        var id=$(e.target).parents(".fence-item-heading").attr('id');
        for(var i=0;i<$scope.fenceList.length;i++){
            if($scope.fenceList[i].id==id) {
                if ($scope.fenceList[i].type == 'circle') {
                    $scope.fenceList[i].overlay.center = overlays.getCenter();
                    $scope.fenceList[i].overlay.radius = overlays.getRadius();
                } else if ($scope.fenceList[i].type == 'polygon') {
                    $scope.fenceList[i].overlay.path=overlays.getPath();
                }
            }
        }
        $(e.target).parents(".btn-flipperY").removeClass("rotated");
    }
}
