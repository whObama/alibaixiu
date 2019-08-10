//用于用户列表的展示功能
var categoryArr = [];
//向服务器发送ajax请求
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        categoryArr = res;
        render(categoryArr);
    }
});

//添加用户分类功能
$('#addCategory').on('click', 'button', function() {
    //获取变淡信息
    let formdata = $('#addCategory').serialize();
    //向服务器发送请求
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formdata,
        success: function(res) {
            categoryArr.push(res);
            render(categoryArr);
        }
    })
});

var cid;
//用户编辑功能
$('tbody').on('click', '.edit', function() {
    //获取id
    cid = $(this).parent().attr('data-id');
    $('#addCategory > h2').text('修改用户');
    let  title = $(this).parents('tr').children().eq(1).text();
    var className = $(this).parents('tr').children().eq(2).text();
    $('#title').val(title);
    $('#className').val(className);
    $('#cAdd').hide();
    $('#cEdit').show();
});

//用户修改功能
$('#cEdit').on('click', function() {
    $.ajax({
        type: 'put',
        url: '/categories/' + cid,
        data: $('#addCategory').serialize(),
        success: function(res) {
            let index = categoryArr.findIndex(item => item._id == cid);
            categoryArr[index] = res;
            render(categoryArr);
            $('#title').val('');
            $('#className').val('');
            $('#cAdd').show();
            $('#cEdit').hide();
        }
    });
});

//点击删除功能
$('tbody').on('click', '.delete', function() {
    //获取id 
    let id = $(this).parent().attr('data-id');
    $.ajax({
        type: 'delete',
        url: "/categories/" + id,
        success: function(res) {
            let index = categoryArr.findIndex(item => item._id == id);
            categoryArr.splice(index, 1);
            render(categoryArr);
        }
    })
})

function render(str) {
    let html = template('categroyInp', {list: str});
    $('tbody').html(html);
};