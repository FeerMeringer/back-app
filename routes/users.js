import express from 'express'
import User from '../models/User.js';
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users creation. */
router.post('/', async(req, res) => {
  try{
    req.body.is_online = false
    req.body.is_admin = false
    req.body.is_author = false
    req.body.is_company = false
    req.body.is_verified = false
    req.body.verify_code = false

    let user = await User.create(req.body)
    return res.status(201).json({ // 201 se creo correctamente
      success: true,
      user: user,
      id: user._id
    })
  }catch(error){
    console.log(error)
    return res.status(400).json({
      success: false,
      message: 'no se pudo crear'
    }
    )
  }
}
);

router.post('/', async (req,res) =>{
  try {
    let user = await User.create(req.body)
    return res.status(201).json({
      response: 'created',
      user
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      path: req.url,
      response: error.message
    })
  }
})


export default router
