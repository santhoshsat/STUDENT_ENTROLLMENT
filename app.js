const express = require('express');
const app =express()
const PORT=3500
app.get('/',(req,res)=>{
  res.send("welcome to student entrolment")
})
app.listen(PORT,console.log("server start"))