
const { Router } = require('express')
const { buscar } = require('../controllers/buscar')

const router = Router()

router.get('/:coleecion/:termino', buscar)
module.exports = router