const db = require('../db/index')
const bcrypt = require('bcryptjs')
const { off } = require('../db/index')

// 获取用户信息的处理函数
exports.getUserInfo = (req, res) => {
    const sqlStr = `select id, username, nickname, email, user_pic from ev_users where id=?`
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.err('获取用户信息失败')
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

// 更新用户信息的处理函数
exports.updateUseInfo = (req, res) => {
    const sqlStr = `update ev_users set ? where id=?`
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败')
        res.cc('更新用户信息成功', 0)
    })
}

// 重置密码的处理函数
exports.updatePassword = (req, res) => {
    const sqlStr = `select * from ev_users where id=?`
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')

        // 判断用户输入的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误')

        // 更新数据库中的密码
        const sqlStr = `update ev_users set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
            res.cc('更新密码成功', 0)
        })
    })
}

// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    const sqlStr = 'update ev_users set user_pic=? where id=?'
    db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更换头像失败')
        res.cc('更换头像成功', 0)
    })
}