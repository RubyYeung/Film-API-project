const express = require("express")
const router = express.Router()
const filmcontroller = require("./filmcontroller.js")


router.get('/infofilm/:title', filmcontroller.OMBDFilm)
router.get('/list', filmcontroller.listAllFilm)
router.get('/film/:imdbID', filmcontroller.searchID)
router.post('/imfilm', filmcontroller.addFilmASYNC)
//router.post('/imfilm', filmcontroller.verifyToken)
router.put('/film/:imdbID', filmcontroller.updateFilmInfo)
router.delete('/removefilm/:imdbID', filmcontroller.removeFilm)
router.delete('/removeuser/:email', filmcontroller.removeUser)
router.put('/update/:email', filmcontroller.updateUserInfo)
router.post('/apply', filmcontroller.registerUser)
router.post('/auth', filmcontroller.authenticate)
router.use((req, res, next) => {
  console.log('Invalid access~')
  res.status(404).send({'status':404, 'description': 'Endpoint not found'})  
})

module.exports = router