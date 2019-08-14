//当管理员选择logo图片
$('#logo').on('change', function() {
    //创建二级制文件对象
    let formData = new FormData();
    formData.append('logos', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
            //将图片信息保存到隐藏域
            $('#hiddenLogo').val(res[0].logos);
            //将图片添加到页面
            $('#preview').attr('src', res[0].logos)
        }
    })
});

// 当网站设置表单提交
$('.form-horizontal').on('click', '#addBtn', function() {
    //获取表单信息
    let formData = $('.form-horizontal').serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(res) {
            // console.log(res);
            location.reload();
        }
    })
});

// 获取网站配置
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(res) {
        // console.log(res);
        $('#hiddenLogo').val(res.logo);
        $('#preview').attr('src', res.logo);
        $('#site_name').val(res.title);
        $('#site_description').val(res.description);
        $('#site_keywords').val(res.keywords);
        $('#comment_status').prop('checked', res.comment);
        $('#comment_reviewed').prop('checked', res.review);
    }
})