
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


app.get("/api", async (request, response) => {
    response.json({message: "Welcome to API"})
});

//skapar en mall
const workexperienceSchema = new mongoose.Schema({

    
    companyname: {
        type: String, 
        required: true
    },

    jobtitle: {
        type: String, 
        required: true 
    },

    location: {
        type: String, 
        required: true
    },
    startdate: {
        type: Date, 
        required: true
    },
    enddate: {
        type: Date, 
        required: true
    }
});

//Skapar en tabell
const workexperience = mongoose.model("Workexperience", workexperienceSchema);

//-------------------------------------------------------------//
//-------------------------------------------------------------//
//-------------------------GET------------------------------------//

app.get("/workexperiences", async(request, response) =>{
    try {
        let results = await workexperience.find({}, {__v: 0 })//hämtar allt utom __v i workexperience

        return response.json(results);
    }
    catch(error) {
        response.json({message: "failed to get workexperiences"})
        console.log(error)
    }
});

//-------------------------------------------------------------//
//-------------------------------------------------------------//
//--------------------------POST-----------------------------------//


app.post("/workexperiences", async (request, response) => {
    try {

        let results = await workexperience.create(request.body);

        
        return response.json({message: "Added to workexperiences", results})
    } catch(error) {
        return response.status(400).json(error);
    }

});


//-------------------------------------------------------------//
//-------------------------------------------------------------//
//-------------------------------------------------------------//

    




app.listen(port, () => {
    console.log("Server started on: " + port)
});
