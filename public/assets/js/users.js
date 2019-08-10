// 主要是用于操作用户的 
var userArr = new Array();
// 将用户列表展示出来 
$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        userArr = res;
        render(userArr);
    }
})

//用户添加功能
$('#usersAdd').on('click', function() {
    //获取表单信息
    let formData = $('#usersForm').serialize();
    //向服务器端发送ajax请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(res) {
            userArr.push(res);
            //渲染页面
            render(userArr);
        },
        // error: function(attr) {
        //     alert('用户添加失败');
        //     return;
        // }
    })
});

//用户图像文件上传功能
$('#avatar').on('change', function() {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
    //向服务器发送ajax请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉ajax不要解析请求参数
        processData: false,
        //告诉ajax不要设置请求参数的类型
        contentType: false,
        success: function(res) {
            //图片地址添加到表单
            $('#preview').attr('src', res[0].avatar);
            //将图片信息保存到隐藏域的value
            $('#hiddenAvatar').val(res[0].avatar);
        }
    })
});

// 用户编辑功能
var usersId;
$('tbody').on('click', '.edit', function() {
    //获取用户的id
    usersId  = $(this).parent().attr('data-id');
    //用户修改
    $('#usersForm > h2').text('用户修改');
    let trObj = $(this).parents('tr');
    //获取图片地址
    let imgSrc = trObj.children(1).children('img').attr('src');
    //将图片地址写入隐藏域
    $('#hiddenAvatar').val(imgSrc);
    if (imgSrc) {
        $('#preview').attr('src', imgSrc);
    } else {
        $('#preview').attr('src', '../assets/img/default.png');
    };
    //将对应的内容写入输入框
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());

    //判断用户激活状态
    let status = trObj.children().eq(4).text();
    if (status == '激活') {
        $('#jh').prop('checked', true);
    } else {
        $('#wjh').prop('checked', true);
    };
    //判断用户角色
    let role = trObj.children().eq(5).text();
    if (role == '超级管理员') {
        $('#admin').prop('checked', true);
    } else {
        $('#normal').prop('checked', true);        
    };
    $('#usersAdd').hide();
    $('#usersEdit').show();
});

//完成用户修改功能
$('#usersEdit').on('click', function() {
    //获取表单信息
    console.log($('#usersForm').serialize());
    $.ajax({
        type: 'put',
        url: '/users/'+usersId,
        data: $('#usersForm').serialize(),
        success: function(res) {
            //根据用户的id来修改数组的值
            let index = userArr.findIndex(item => item._id == usersId);
            userArr[index] = res;
            //渲染页面
            render(userArr);
        }
    })
})

//用户点击删除功能
$('tbody').on('click', '.del', function() {
    if(window.confirm('你确定要删除吗?')) {
        let id = $(this).parent().attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/'+id,
            success: function(res) {
                let index = userArr.findIndex(item => item._id = id);
                userArr.splice(index, 1);
                render(userArr);
            }
        })
    }
});

//用户全选功能
$('thead input').on('change', function() {
    let flag = $(this).prop('checked');
    $('tbody').find('input').prop('checked', flag);
    if (flag) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});
//用户反选功能
$('tbody').on('change', 'input', function() {
    if($('tbody').find('input').length == $('tbody').find('input').filter(':checked').length) {
        $('thead input').prop('checked', true);
    } else {
        $('thead input').prop('checked', false);
    };
    //实现全部删除的显现
    if ($('tbody').find('input').filter(':checked').length >= 2) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});

//用户批量删除功能
$('#deleteMany').on('click', function() {
    var ids = [];
    //获取选中的用户
    var checkedUser = $('tbody input:checked');
    // var checkedUser = $('tbody').find('input').filter(':checked');
    
    //遍历复选框 获取data-id
    checkedUser.each(function(index, element) {
        
        ids.push(element.parentNode.parentNode.children[6].getAttribute('data-id'));
    });
    
    if (confirm('你确定要删除选中的信息吗?')) {
        $.ajax({
            type: 'delete',
            url: '/users/'+ids.join('-'),
            success: function(res) {
                location.reload();
            }
        })
    }
})


function render(str) {
    let html = template('usersInp', {list: str});
    $('tbody').html(html);
};

