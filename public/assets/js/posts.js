//查询文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        // console.log(res);
        let html = template('postsTem', res);
        $('tbody').html(html);
    }
});
//创建formateDate用来处理时间格式
function formateDate(date) {
    //将日期格式转换为日期字符串格式
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2,0) + '-' + date.getDate().toString().padStart(2,0);

}