// 用户文章搜索功能
//获取地址栏中的key值
let key = getUrlParams('key');

$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(res) {
        // console.log(res);
        let html = template('searchTpl', {list: res});
        $('.panel').html(html);
    }
})