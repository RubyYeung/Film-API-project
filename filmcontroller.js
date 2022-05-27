const mongoClient = require("mongodb").MongoClient
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
var config = require('./config');

const mongo_username = 'xxxxxxxx001'  // update your username
const mongo_password = 'xxxxxxxx1' // update your password

const CONNECTION_URI = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.oazfg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`  
//Update the path
const DATABASE_NAME = "filmstore" // Update your database name here
const FILMSCOLLECTION = "film" // Update your collection name here
const USERSCOLLECTION = "user"




const filmcontroller = {
  OMBDFilm (req, res)  {
    const URL = "https://www.omdbapi.com/"
    const APIkey = "94317f55"
    const title = req.params.title
    console.log(`Someone request a film with ${title} from OMDb API`)
    request.get(`${URL}?t=${title}&apikey=${APIkey}`),(err,r,body)=>{
    
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const j = JSON.parse(body)
        res.status(200).send({
          "title": j.Title,
          "year":j.Year,
          "release": j.Released,
          "runtime": j.Runtime,
          "language": j.Language,
          "genre":j.Genre,
          "director":j.Director,
          "poster":j.Poster,

        })
      }
    }
  },
  
  listAllFilm (req, res)  {
    console.log(`Someone request all films`)
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)
        collection.find({}).toArray((err, result) => {
          if(err) {
            res.status(500).send({"status":500, "description":err})
          } else {
            res.send(result)
          }
        })
        db.close()
      }
    })
  },

  searchID (req, res)  {  
    const imdbID = req.params.imdbID
    console.log(`Someone query the film with ${imdbID}`)
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)      
        collection.find({'imdbID': imdbID}).toArray((err, result) => {
          if(err) {
            res.status(500).send({"status":500, "description":err})
          } else {
            res.send(result)
          }
        })
        db.close()
      }
    })
  },

  //verifyTokenALL = function(b, a){
  verifyToken(req, res ) {
  var token = req.headers['token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    else{
    //res.status(200).send(decoded);
    return //filmcontroller.addFilm1(req, res)
    //return filmcontroller.DoSomething(a)
    }
  });
  },
  //},

  addFilm (req, res){
    filmcontroller.verifyToken(req, res)
    const imdbID = req.body.imdbID
    console.log('someone going to insert a new film')
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)      
        
        collection.findOne(({'imdbID': imdbID}), (err, result) =>{
        if(result) {
            res.status(500).send({"status":500, "description":"imdbID exist in DataBase already"})
          } else {
         
        collection.insertOne(req.body, (err) => {
          if(err) {
            res.status(500).send({"status":500, "description": err})
          } else {
            res.status(201).send({"status":201, "description": "Data insert successfully"})
          }
        })
          }
        })

        db.close()
      }
    })
    
  },

  //verifyAndDoSomething(f) {
  addFilm1(req,res){
  
    //filmcontroller.verifyToken(req, res)
    const imdbID = req.body.imdbID
    console.log('someone going to insert a new film')
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } 
      else{
      const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION) 
        collection.findOne(({'imdbID': imdbID}), (err, result) =>{
        if(result) {res.status(500).send({"status":500,                 "description":"imdbID exist in DataBase already"})
          } 
         
        // 
        collection.insertOne(req.body, (err, result) => {
          if(err) {
            res.status(500).send({"status":500, "description": "1"+ err})
          }
            res.status(201).send({"status":201, "description": "Data insert successfully"})
        })
          //
        })
      }
    db.close()
    })  
   
  },
  //},    

/*verifyAndDoSomething(f, a) {
    // Call `caller`, who will in turn call `f`
    this.verifyToken( a)
    //function DoSomething (a)
},

function DoSomething(a){
  a()
},*/

//async function addFilmASYNC1(){
 addFilmASYNC (req,res){
  
    //filmcontroller.verifyToken(req, res)
    const imdbID = req.body.imdbID
    console.log('someone going to insert a new film')
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
    const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)  
      
      
      async function getGroupInfo() {
      
      try{// 代表等到第一筆資料回傳後，才印出結果和請求第二筆資料
      //mongoClient.connect(CONNECTION_URI, (err, db)=>{
      //const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)
      const firstInfo = await getFirstInfo()
      console.log(firstInfo)
      // 代表等到第二筆資料回傳後，才印出結果
      const secondInfo = await getSecondInfo()
      console.log(secondInfo)
      //})
      }
       catch(error){
        res.status(500).send({"status": 500, "description": err})
      }
      }

      /*function getFirstInfo() {
        //return new Promise((resolve, reject) => {
        collection.findOne(({'imdbID': imdbID}), (err, result) =>{
        if(result) 
        
        return {res.status(500).send({"status":500,                 "description":"imdbID exist in DataBase already"})
        //console.log("imdbID exist in DataBase already")
        }
        })
      //})
      }*/

      function getFirstInfo() {
        //return new Promise((resolve, reject) => {
        const result = collection.findOne({'imdbID': imdbID}),
        return result {
        res.status(500).send({"status":500,                 "description":"imdbID exist in DataBase already"})
        }
        //})
      }
      
      function getSecondInfo() {
        //return new Promise((resolve, reject) => {
        const result1 = collection.insertOne(req.body)
        if (result1){
        (res.status(201).send({"status":201, "description": "Data insert successfully"}))
        }
        //})
      }
      
      /*function getSecondInfo() {
        collection.insertOne(req.body, (err, result) => {
          if(result) return {
            res.status(201).send({"status":201, "description": "Data insert successfully"})
            //console.log("Data insert successfully")
          }
        })
      }*/

      
      /*async function getGroupInfo() {
      
      try{// 代表等到第一筆資料回傳後，才印出結果和請求第二筆資料
      //mongoClient.connect(CONNECTION_URI, (err, db)=>{
      //const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)
      const firstInfo = await getFirstInfo()
      //console.log(firstInfo)
      // 代表等到第二筆資料回傳後，才印出結果
      const secondInfo = await getSecondInfo()
      //console.log(secondInfo)
      //})
      }
       catch(error){
        res.status(500).send({"status": 500, "description": err})
      }
      }*/
      getGroupInfo()
      db.close()
    })  
  }, 
  //},

 addFilm2 (req, res){
    //filmcontroller.verifyToken(req, res)
    const imdbID = req.body.imdbID
    console.log('someone going to insert a new film')
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } 
      else{
      const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION) 
        collection.findOne(({'imdbID': imdbID}), (err, result) =>{
        if(err) {
          collection.insertOne(req.body, (err, result) => {
          if(err) {
            res.status(500).send({"status":500, "description": "1"+ err})
          }
            res.status(201).send({"status":201, "description": "Data insert successfully"})
          })
          } 
          {res.status(500).send({"status":500, "description":"imdbID exist in DataBase already"})
          }
        // 
        //
        })
      }
    //db.close()
    }) 
  },   
    
  

//original addfilm (Works)
  /*addFilm (req, res){
    console.log('someone going to insert a new film')
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": "1"+ err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)      
        collection.insertOne(req.body, (err) => {
          if(err) {
            res.status(500).send({"status":500, "description":"RU"+err})
          } else {
            res.status(201).send({"status":201, "description": "Data insert successfully"})
          }
        })
        db.close()
      }
    })
  },*/

  updateFilmInfo (req, res){
    const imdbID = req.params.imdbID
    console.log(`someone going to update the film with imdbID: ${imdbID}`)
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)      
        collection.findOneAndUpdate({'imdbID': imdbID},
          {$set: req.body},
          {},
          (err) => {
            if(err) {
              res.status(500).send({"status":500, "description":err})
            } else {
              res.status(201).send({"status":201, "description":"Data update successfully"})
            }
          })
        db.close()
      }
    })    
  },

  updateUserInfo (req, res){
    filmcontroller.verifyToken(req, res)
    const email = req.params.email
    console.log(`someone going to update the user with email: ${email}`)
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(USERSCOLLECTION)      
        collection.findOneAndUpdate({'email': email},
          {$set: req.body},
          {},
          (err, result) => {
            if(result==null) {
              res.status(500).send({"status":500, "description":"no such email exist"})
            } else {
              res.status(201).send({"status":201, "description":"Data update successfully" + result})
            }
            
          })
        db.close()
      }
    })    
  },

  removeFilm (req, res){
    filmcontroller.verifyToken(req, res)
    const imdbID = req.params.imdbID
    console.log(`someone going to delete the film with imdbID: ${imdbID}`)
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)      
        
        collection.findOne(({'imdbID': imdbID}), (err, result) =>{
        if(!result) {
            res.status(500).send({"status":500, "description":"imdbID doesn't exist in DataBase"})
          } else {
              
        collection.deleteOne({'imdbID': imdbID},
         (err, result) => {
            if(!result) {
              console.log(result)
              res.status(500).send({"status":500, "description": err})
            } else {
              res.status(201).send({"status":201, "description":"Data delete successfully"})
            }
          })
          }
        })
        db.close()
      }
    })    
  },

removeUser (req, res){
    filmcontroller.verifyToken(req, res)
    const email = req.params.email
    console.log(`someone going to delete the user with email: ${email}`)
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(USERSCOLLECTION)      
        
        collection.findOne(({'email': email}), (err, result) =>{
        if(!result) {
            res.status(500).send({"status":500, "description":"email doesn't exist in DataBase"})
          } else {
              
        let user = collection.deleteOne({'email': email},
         (err, result) => {
            if(err) {
              
              res.status(500).send({"status":500, "description": err})
            } else {
              res.status(201).send({"status":201, "description":"Data delete successfully"})
            }
          })
          }
        })
        db.close()
      }
    })    
  },

    /*removeFilm (req, res){
    filmcontroller.verifyToken(req, res)
    const imdbID = req.params.imdbID
    console.log(`someone going to delete the film with imdbID: ${imdbID}`)
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(FILMSCOLLECTION)     
                              
        collection.findOneAndDelete({'imdbID': imdbID},
        {$set: req.body},
         {},
          (err, result) => {
            if(err) {
              res.status(500).send({"status":500, "description":"imdbID doesn't exist in DataBase"})
            } else {
              res.status(201).send({"status":201, "description":"Data delete successfully"})
            }
          })
          
        db.close()
      }
    })    
    },*/



registerUser (req, res){
    console.log('someone going to add a new user')
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(USERSCOLLECTION)      
        collection.insertOne(req.body, (err) => {
          if(err) {
            res.status(500).send({"status":500, "description":err})
          } else {
            res.status(201).send({"status":201, "description": "Data insert successfully"})
          }
        })
        db.close()
      }
    })
  },


  
    authenticate (req, res){
    const email = req.body.email
    const password = req.body.password
    console.log(`someone going to login with email: ${email}`)
    mongoClient.connect(CONNECTION_URI, (err, db)=>{
      if(err){
        console.log(err)
        res.status(500).send({"status": 500, "description": err})
      } else {
        const collection = db.db(DATABASE_NAME).collection(USERSCOLLECTION)      
            collection.findOne(({'email': email,'password': password}), (err, result) =>{
            if(result){   
              var token = jwt.sign({id: result.email}, config.secret);
              res.status(201).send({"status":201, "description":"login successfully","token":token})
          } 
          else {
              res.status(400).send({"status:":400,"description":"Invalid user ID or password"})
           
          }})
         
         db.close()
        } 
        })
        
      }

}

module.exports = filmcontroller

