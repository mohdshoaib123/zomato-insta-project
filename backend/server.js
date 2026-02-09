require('dotenv').config();
const app=require("./src/app.js")
const main=require("./src/db/db.js")


const PORT =8080

main()
.then(()=>console.log("database connected"))
.catch(err => console.log(err));

app.listen((PORT),()=>{
  console.log(`server are listening on port ${PORT}`)
})