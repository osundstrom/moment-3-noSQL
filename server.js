
const express = require("express"); 
const cors = require("cors"); //CORS (cross orgin resource sharing) så vi kan hämta informationen från webbsidan.

const app = express(); 
const port = process.env.PORT || 3000; //Port


app.use(cors()); 

app.use(express.json()); 

const mongoose = require("mongoose"); //Mongoose


let url =  "mongodb+srv://ossu2300:Password123@cluster0.ucubphd.mongodb.net/workexperience?retryWrites=true&w=majority&appName=workexperience/workexperiences";

//connection till MongoDB
mongoose.connect(url).then(() => {
    console.log("Connected")
}) 
.catch((error) => {
    console.log("failed" + error)
})

//Get för /api med  meddelande
app.get("/api", async (request, response) => {
    response.json({message: "Welcome to API"})
});

//skapar ett schema
const workexperienceSchema = new mongoose.Schema({
    companyname: {
        type: String, //typ
        required: [true, "Måste ha med företagsnamn"] //Måste ha, text för egen error
    },

    jobtitle: {
        type: String, //typ
        required: [true, "Måste ha med roll"] //Måste ha, text för egen error
    },

    location: {
        type: String, //typ
        required: [true, "Måste ha med plats"]//Måste ha, text för egen error
    },
    startdate: {
        type: Date, //typ
        required: [true, "Måste ha med startdatum"]//Måste ha, text för egen error
    },
    enddate: {
        type: Date, //typ
        required: [true, "Måste ha med slutdatum"]//Måste ha, text för egen error
    }
});

//Skapar en model
const workexperience = mongoose.model("Workexperience", workexperienceSchema);

//-------------------------------------------------------------//
//-------------------------------------------------------------//
//-------------------------GET------------------------------------//

app.get("/workexperiences", async(request, response) =>{ //GET
    try { //try
        let results = await workexperience.find({}, {__v: 0 })//hämtar allt utom __v i workexperience

        return response.json(results); //Returnera som json
    }
    catch(error) { //Cahch för error
        response.json({message: "failed to get workexperiences"}) //Skriver ut
        console.log(error) //Loggar error
    }
});

//-------------------------------------------------------------//
//-------------------------------------------------------------//
//--------------------------POST-----------------------------------//


app.post("/workexperiences", async (request, response) => { //Post
    try { //Try 

        let results = await workexperience.create(request.body); //Skapar 

        
        return response.json({message: "Added to workexperiences", results}) //Json meddelande
    } catch(error) { //Catch för error
        return response.status(400).json(error); //status 400 med error meddelande
    }

});


//-------------------------------------------------------------//
//-------------------------------------------------------------//
//--------------------------DELETE-----------------------------------//


app.delete("/workexperiences:id", async (request, response) => { //DELETE
    let idData = request.params.id; //Hämtar id till idDATA

    //console.log(idData);

    try { //try
        await workexperience.findByIdAndDelete(idData);  //Tar bort med id
        return response.json({ message: "Workexperience deleted" }); //Meddellande
    } catch (error) { //Cache error
        response.status(400).json({message: "failed delete"}); //Skrive rut
        console.log(error); //loggar error
    }
})    


//-------------------------------------------------------------//
//-------------------------------------------------------------//
//--------------------------PUT-----------------------------------//

app.put("/workexperiences:id", async (request, response) => { //PUT
    let idData = request.params.id;//Hämtar id till idDATA

    //console.log(idData);

    try {
        await workexperience.findByIdAndUpdate(idData, request.body); //Updaterar med id
        return response.json({ message: "Workexperience updated" }); //Meddelande
    } catch (error) { //Cahch error
        response.status(400).json({message: "failed update"}); //error meddelande
        console.log(error);//loggar error
    }
})   


//startar
app.listen(port, () => {
    console.log("Server started on: " + port)
});
