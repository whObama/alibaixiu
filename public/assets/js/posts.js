
// 获取到所有的分类
var c = $('#category').val();
var s = $('#states').val();

//查询文章列表
function render( c = 'all', s = 'all', page = 1) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page || 1,
            category: c, // 分类名称
            state: s // 状态
        },
        success: function(res) {
            // console.log(res);
            //把当前页码暴露在全局作用域里
            window.currentPage = res.page;

            let html = template('postsTem', res);
            $('tbody').html(html);

            let page = template('pageTem', res);
            $('#pageUl').html(page);
        }
    });
}
//显示所有的分类状态
render();

//创建formateDate用来处理时间格式
function formateDate(date) {
    //将日期格式转换为日期字符串格式
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2,0) + '-' + date.getDate().toString().padStart(2,0);

}

//页码显示功能
function pageChange(page) {
    render(c, s, page);
};

//搜索模块的展示功能
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // console.log(res);
        let html = template('categoryTpl', {data: res});
        $('#category').append(html);
    }
})

//用户筛选功能
$('#filterForm').on('click', '#cSearch', function() {
    //获取到分类id 与状态
    c = $('#category').val();
    s = $('#states').val();
    render(c, s);
    
});

// 用户点击删除功能
$('tbody').on('click', '.delete', function() {
    //获取id
    let id = $(this).parent().attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/posts/' + id,
        success: function(res) {
            // render(c, s, currentPage);
            // 如果tbody标签下面的有标签 这个时候我们就让它在当前页码 如果已经已经不大于1  我们应该它让回到前一页
            if ($('tbody').children().length > 1) {
                //当删除到了第一页是,就不让页面跳转到前一页
                if (currentPage == 1) {
                    render(c, s, currentPage);
                } else {
                    render(c, s, currentPage - 1);
                }
            } else {
                render(c, s, currentPage - 1);
            }
        }
    })
});


