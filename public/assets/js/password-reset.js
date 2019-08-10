//用户修改密码功能
$('.form-horizontal').on('submit', function() {
    //获取用户表单信息
    let formData = $(this).serialize();
    //向服务器发出请求
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function () {
			location.href = "/admin/login.html"
        }
    })
    //阻止默认行为
    return false;
});