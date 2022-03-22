// 这是路由处理函数模块

const db = require('../db/index')

// 获取文章分类列表的处理函数
exports.getArticleCates = (req, res) => {
    const sqlStr = `select * from ev_article_cate where is_delete=0 order by id asc`
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results
        })
    })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    const sqlStr = `select * from ev_article_cate where name=? or alias=?`
    db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试')

        // 分类别名和分类名称都可用，执行添加的操作
        const sqlStr = `insert into ev_article_cate set ?`
        db.query(sqlStr, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功', 0)
        })
    })
}

// 根据id删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
    const sqlStr = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败')
        res.cc('删除文章分类成功', 0)
    })
}

// 根据id获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
    const sqlStr = `select * from ev_article_cate where id=?`
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败')
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results[0]
        })
    })
}

// 根据Id更新文章分类的处理函数
exports.updateCateById = (req, res) => {
    const sqlStr = `select * from ev_article_cate where Id!=? and (name=? or alias=?)`
    db.query(sqlStr, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试')

        // 更新操作
        const sqlStr = `update ev_article_cate set ? where Id=?`
        db.query(sqlStr, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败')
            res.cc('更新文章分类成功', 0)
        })
    })
}