//获取地址栏中的categoryId参数
let categoryId = getUrlParams('categoryId');

//根据分类id获取文章列表
$.ajax({
    type: 'get',
    url: '/posts/category/'+ categoryId,
    success: function(res) {
        // console.log(res);
        let html = template('newTpl', {list: res});
        $('.panel').append(html);
    }
});

//根据分类id获取分类信息
$.ajax({
    type: 'get',
    url: '/categories/'+ categoryId,
    success: function(res) {
        console.log(res);
    }
})