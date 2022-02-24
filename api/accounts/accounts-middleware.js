const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const {name, budget} = req.body
  if(name && budget){
    next();
  }else{
    res.status(400).json({ message: "name and budget are required" })
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const dbName = await Account.getByName(req.body.name)
  if(dbName){
    res.status(400).json({ message: "that name is taken" })
  }else{
    res.status(200)
    next()
  }
  }catch(err){
    next(err)
  } 
}

exports.checkAccountId = async (req, res, next) => {
  try{
    const account = await Account.getById(req.params.id)
    if(account){
      req.account = account
      next()
    }else{
      res.status(404).json({message: "account not found"})
    }
  }catch(err){
    next(err)
  }
}

// exports.trimming = async (req,res,next) => {
//   const name = req.body.name.trim()
//   const budget = req.body.budget.trim()
//   const trimmedData = {name,budget}
//   return trimmedData
// }

