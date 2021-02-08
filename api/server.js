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


server.use("*",(req,res)=>{
    res.status(404).json({message:"404 Not found"})
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
