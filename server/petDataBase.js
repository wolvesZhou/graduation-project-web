var router = require('express').Router();
// import pet from './pet'
var pet = require('./pet')

router.get('/onePet',function (req,res) {
    pet.findAll({
        where:{name:req.query.name}
    }).then(function (result) {
        console.log(result)
        // var queryObj={
        //     birth:result[0].dataValues.birth,
        //     gender:result[0].dataValues.gender
        // }
        res.json(result)
    })
});

router.get('/grid',function (req,res) {
    pet.findAll({
        where:{gender:1}
    }).then(function (result) {

        res.json(result)
    })
})

router.post('/grid',function (req,res) {
    console.log('1');
    var a=req.body;
    console.log('2');
    switch (req.body.oper){
        case 'add':
            res.json(pet.create({
                'id':'dasf',
                'name':req.body.name,
                'gender':1,
                'birth':'sadafa',
                'createdAt':12314123,
                'updatedAt':25224234,
                'version':1
            }));
            break;
        case 'del':
            break;

    }
});

module.exports = router;