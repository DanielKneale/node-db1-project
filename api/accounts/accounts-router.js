const router = require('express').Router()
const Account = require("./accounts-model")
const {checkAccountPayload, checkAccountNameUnique, checkAccountId, trimming} = require("./accounts-middleware")

router.get('/', async(req, res, next) => {
  try{
    const data = await Account.getAll()
    res.json(data)
  }catch(err) {
    next(err)
  }
})

router.get('/:id',checkAccountId, async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload , checkAccountNameUnique, async (req, res, next) => {
  try {
    const data = await Account.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id',checkAccountId,checkAccountNameUnique, async (req, res, next) => {
  try {
    const data = await Account.updateById(req.params.id, req.body)
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id',checkAccountId,  async(req, res, next) => {
  try {
    const data = await Account.deleteById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
