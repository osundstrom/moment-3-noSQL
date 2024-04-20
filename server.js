
const express = require("express"); 
const cors = require("cors"); //CORS (cross orgin resource sharing) så vi kan hämta informationen från webbsidan.

const app = express(); 
const port = 3000;


app.use(cors()); 

app.use(express.json()); 

const mongoose = require("mongoose");


let url =  "mongodb://127.0.0.1:27017/workexperience";

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
        require: true, 
    },

    jobtitle: {
        type: String, 
        require: true, 
    },

    location: {
        type: String, 
        require: true,
    },
    startdate: {
        type: Date, 
        require: true,
    },
    enddate: {
        type: Date, 
        require: true,
    }
});

//Skapar en tabell
const workexperience = mongoose.model("Workexperience", workexperienceSchema);


app.get("/workexperiences", async(request, response) =>{
    try {
        let results = await workexperience.find({});       

        return response.json(results);
    }
    catch(error) {
        return response.json({message: "failed to get workexperiences"})
    }
})



app.post("/workexperiences", async (request, response) => {
    let companyname = request.body.companyname;
    let jobtitle = request.body.jobtitle;
    let location = request.body.location;
    let startdate = request.body.startdate;
    let enddate = request.body.enddate;

    if (!companyname || !jobtitle || !location || !startdate || !enddate) {
        response.status(400).json({ error: "You have to fill in all fields" }); 
        return;
    }

    try {
    let newWork = new workexperience({
        companyname,
        jobtitle,
        location,
        startdate,
        enddate
    });

    await newWork.save()
        response.json({message: "workexperience added"});
    } catch (error) {
        return response.json({message: "failed to post to workexperiences" + error})
    }
});




app.listen(port, () => {
    console.log("Server started on: " + port)
});
