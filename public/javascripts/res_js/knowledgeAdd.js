/**
 * Created by Letg4 on 2017/9/11.
 */

var knlgAdd=angular.module('knlgAdd',['globalconfig',['wangEditor']]);

knlgAdd.controller('knlgAddCtrl',knlgAddCtrl);
function knlgAddCtrl($scope) {

var E = window.wangEditor
var editor1 = new E('#div1')  // 两个参数也可以传入 elem 对象，class 选择器

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
]

editor1.create()

document.getElementById('submit').addEventListener('click', function () {
    // document.getElementById("kAnswer").value=editor1.txt.text();  //获取纯文本
    document.getElementById("kAnswer").value=editor1.txt.html();       //获取带格式的文本
    var a = editor1.txt.html();
    alert(a)


}, false)


$(function(){
    $("#knowledge").submit(function(){
        var data = $(this).serialize(); //序列化表单数据
        $.ajax({
            type: "GET",
            url: BASE_URL+"kno/addKnowledge.form",
            data:data,
            headers: {"Current-UserId": JSON.parse(window.sessionStorage.getItem("currUser")).id},
            success: function (data) {

                // document.getElementById("kTitle").innerText = data.kTitle;
                // document.getElementById("aa").innerHTML = data.kAnswer;
                // document.getElementById("kUseCount").innerText = data.kUseCount;
                // document.getElementById("kUseTimeLast").innerText=data.kUseTimeLast;


                var msg = '';

                msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："

                alert("添加成功！");
                location.href="#!/knowledgeRepo/knowledgeList.html";


//                $("#myform").after(msg); //将返回信息插入页面对应的元素后
            }
        });

//            $.getJSON(BASE_URL+"addKnowledge.form",data,function(json){
//                var msg = '';
//
//                    msg = "<div id='result'><strong>提交成功！</strong><br/>姓名："
//
//
////                $("#myform").after(msg); //将返回信息插入页面对应的元素后
//            });

    });
});

$("#back").click(function () {
        location.href="#!/knowledgeRepo/knowledgeList.html";
    }
)
};