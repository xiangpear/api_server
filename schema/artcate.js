const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()


// 添加文章分类的验证规则对象
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 根据id删除文章分类的验证规则对象
exports.delete_cate_schema = {
    params: {
        id
    }
}

// 根据id获取文章分类的验证规则对象
exports.get_cate_schema = {
    params: {
        id
    }
}

// 根据Id更新文章分类的验证规则对象
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}