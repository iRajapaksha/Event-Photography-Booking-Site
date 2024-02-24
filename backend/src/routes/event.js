const express = require('express')
const router = express.Router()
const eventController = require('../controllers/event')

const verifyToken = require('../middlewears/verifyToken')

router.post('/',eventController.create) //working
//router.put('/:id',eventController.update)  not using
router.delete('/:id',eventController.delete) //working
router.get('/all',eventController.getAll) //working
//router.get('/:id',eventController.getOne) //working
//router.get('searchResult',eventController.search)
router.get('/:email', eventController.getEventByEmail);

module.exports = router