/**
 * Created by Administrator on 2017/1/18.
 */

var sequelizeModel =require('./sequelizeModel');
const Sequelize = require('sequelize');

var Pet = sequelizeModel.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

module.exports=Pet