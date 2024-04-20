
const express = require("express"); 
const cors = require("cors"); //CORS (cross orgin resource sharing) så vi kan hämta informationen från webbsidan.

const app = express(); 
const port = 3000;


app.use(cors()); 

app.use(express.json()); 

const mongoose = require("mongoose");


let url =  "mongodb+srv://ossu2300:Imdb1337@cluster0.ucubphd.mongodb.net/workexperience?retryWrites=true&w=majority&appName=workexperience/workexperiences";

//connection till MongoDB
mongoose.connect(url).then(() => {
    console.log("Connected")
}) 
.catch((error) => {
    console.log("failed" + error)
})


//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//



//Ta bort collectionen
mongoose.connection.dropCollection("workexperiences");
  


//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//
//---------------------------------------------------------//

app.listen(port, () => {
    console.log("Server started on: " + port)
});
