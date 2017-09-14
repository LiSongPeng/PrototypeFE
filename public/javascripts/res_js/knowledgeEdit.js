/**
 * Created by Letg4 on 2017/9/11.
 */
var knlgEdit=angular.module('knlgEdit',['globalconfig',['wangEditor']]);

knlgEdit.controller("knlgEditCtrl",knlgEditCtrl);
function knlgEditCtrl($scope) {

        $(function() {
            var str=location.href; //取得整个地址栏
            var num=str.indexOf("?");
            str=str.substr(num+1);

            var url=BASE_URL+"kno/queryKnowledgeById.form?"+str;

            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                headers: {"Current-UserId": JSON.parse(window.sessionStorage.getItem("currUser")).id},
                success: function (data) {
                    document.getElementById("kTitle").value=data.kTitle;
                    document.getElementById("id").value=data.id;
                    document.getElementById("createUserId").value=data.createUserId;
                    //document.getElementsByTagName("p").innerHTML=data.kAnswer;
                    document.getElementById("aa").innerHTML=data.kAnswer;

                    var msg = '';

                    msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："


//                $("#myform").after(msg); //将返回信息插入页面对应的元素后
                }
            });

//        $.getJSON(url,function(data){
//
//                document.getElementById("kTitle").value=data.kTitle;
//                document.getElementById("id").value=data.id;
//                document.getElementById("createUserId").value=data.createUserId;
//                //document.getElementsByTagName("p").innerHTML=data.kAnswer;
//                document.getElementById("aa").innerHTML=data.kAnswer;
//
//            var msg = '';
//
//            msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："
//
//
////                $("#myform").after(msg); //将返回信息插入页面对应的元素后
//        });


        });
//    function UrlSearch()
//    {
//        var name,value;
//        var str=location.href; //取得整个地址栏
//        alert(str);
//
//
//
//        location.href=BASE_URL+"kno/queryKnowledgeById.html?id="+str
//
//
//
////        var num=str.indexOf("?")
////        str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
////
////        var arr=str.split("&"); //各个参数放到数组里
////        for(var i=0;i < arr.length;i++){
////            num=arr[i].indexOf("=");
////            if(num>0){
////                name=arr[i].substring(0,num);
////                value=arr[i].substr(num+1);
////                this[name]=value;
////            }
////        }
//    }


    var E = window.wangEditor;
    var editor1 = new E('#div1');  // 两个参数也可以传入 elem 对象，class 选择器

    editor1.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色

        'justify',  // 对齐方式
        'quote',  // 引用

        'undo',  // 撤销
        'redo'  // 重复
    ];

    editor1.create();

    document.getElementById('submit').addEventListener('click', function () {
        // document.getElementById("kAnswer").value=editor1.txt.text();  //获取纯文本
        document.getElementById("kAnswer").value=editor1.txt.html();   //获取带格式的文本

    }, false)


    $(function(){
        $("#knowledge").submit(function(){
            var data = $(this).serialize(); //序列化表单数据

            $.ajax({
                type: "GET",
                url: BASE_URL+"kno/updateKnowledge.form",
                dataType: "json",
                data: data,
                headers: {"Current-UserId": JSON.parse(window.sessionStorage.getItem("currUser")).id},
                success: function (data) {
                    var msg = '';

                    msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："


//                $("#myform").after(msg); //将返回信息插入页面对应的元素后
                }
            });


//            $.getJSON(BASE_URL+"updateKnowledge.form",data,function(json){
//                var msg = '';
//
//                    msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："
//
//
////                $("#myform").after(msg); //将返回信息插入页面对应的元素后
//            });
            alert("编辑成功！")
            location.href="home.html#!/knowledgeRepo/knowledgeList.html"

        });
    });

    $("#back").click(function () {
        location.href="index.html#!/knowledgeRepo/knowledgeList.html";
    })




};