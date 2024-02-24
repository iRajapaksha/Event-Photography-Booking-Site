const express = require('express')
const router = express.Router();
const photographerConroller = require('../controllers/photographer')

router.post('/',photographerConroller.register) //working
router.post('/create',photographerConroller.create)
 router.post('/login',photographerConroller.login) //working 
// router.get('/:id',photographerConroller.getOne)// working
router.put('/',photographerConroller.update) //working
router.get('/:email',photographerConroller.getOneByEmail)

module.exports = router  