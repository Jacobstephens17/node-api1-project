const express = require("express")
const generate = require("shortid").generate


const server = express();
server.use(express.json())


let allUsers = [
  { id:generate(), name: 'Ed Carter', bio: 'hero' },
  { id:generate(), name: 'Mary Edwards', bio: 'super hero' },
]


server.get("/api/users", (req,res)=>{
  res.status(200).json(allUsers)
})


server.get("/api/users/:id", (req,res)=>{
  const indivId = req.params.id
  const indivEmp = allUsers.find(user => user.id === indivId)

  if(!indivEmp){
    res.status(404).json({message: `id: ${indivId} does not exist`})
  }else{
    res.status(200).json(indivEmp)
  }
})


server.put("/api/users/:id", (req,res) => {
    const id = req.params.id
    const {name, bio} = req.body
    const userIndex = allUsers.findIndex(user => user.id === id)

    try{
      if(userIndex != -1 ){
        allUsers[userIndex] = {id,name,bio}
            res.status(200).json({id,name,bio})
      }else{
        res.status(404).json({ id,name,bio })
      }
    }catch (e){
      res.status(500).json({message: `Server error: ${e}`})
    }
})


server.post("/api/users", (req,res) => {
  const {name, bio} = req.body
  if(!name || !bio){
    res.status(400).json({message: 'Name and bio required'})
  }else{
    const newUser = {id:generate(), name, bio}
        allUsers.push(newUser)
        res.status(201).json(newUser)
  }
})


server.delete("/api/users/:id", (req,res) => {
  const idVar = req.params.id
    try{
      if(!allUsers.find(user => user.id === idVar)){
        res.status(404).json({message: `User with id: ${idVar} not found`})
      }else{
        allUsers = allUsers.filter(user => user.id !== idVar)
        res.status(200).json({message: `User id: ${idVar} was successfully deleted!`})
      }
    }catch(e){
      res.status(500).json({message: `Server error: ${e}`})
    }
})



server.use("*",(req,res)=>{
    res.status(404).json({message:"404 Not found"})
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
