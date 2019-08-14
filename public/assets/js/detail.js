
// 获取地址栏的id
let postId = getUrlParams('id');

//根据id获取文章信息
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function(res) {
        let html = template('postTpl', res);
        $('.article').html(html);
        
    }
});

// 实现文章点赞功能
$('.article').on('click', '#like', function() {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function(res) {
            alert('点赞成功, 感谢您的支持');
        }
    })
});

var review;
// 获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(res) {
        review = res.review;
        // 判断管理员是否开启了评论功能
        if (res.comment) {
            let html = template('commentTpl');
            //渲染评论模板
            $('#comment').html(html);
        }
        
    }
});

// 创建文章评论功能
$('#comment').on('click', '#commentBtn',function() {
    alert('ok');
    // 获取用户信息输入的评论内容
    let content = $(this).siblings('textarea').val();
    // 代表评论的状态
    var state;
    if (review) {
        state = 0;
    } else {
        state = 1;
    }
    //向服务器端发送请求,执行添加评论操作
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state 
        },
        success: function (res) {
            alert('评论成功');
            location.reload();   
        },
        error: function() {
            alert('评论失败');
        }
    })
})