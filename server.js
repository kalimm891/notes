
//initialization
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

//inconming data handlers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const Note = require('./src/models/Note');

// nodejs connect to mongodb
const mongoUrl = 'mongodb+srv://kalimm891:Kalim123@cluster0.b4rif7y.mongodb.net/notes';
mongoose.connect(mongoUrl).then(
    function(){
        
// app route 
app.get('/', (req, res)=>{
    console.log("this is home page");
    res.json({message: "api work" });
});

//all data find
app.get('/notes/list', async function(req, res){

    const notes = await Note.find();
    console.log("this is notes page");
    res.json(notes);
});


//find data by id 
app.get('/notes/list/:userid',async function(req, res){

    var notes = await Note.find({ userid:req.params.userid});
    res.json(notes);
    
});

//add data
app.post('/notes/add', async function(req, res){
    await Note.deleteOne({ id: req.body.id});

    const newnotes = Note(
        {
        id:req.body.id,
        userId :req.body.userId,
        title:req.body.title,
        content:req.body.content,
        }
    );
   const noteData = await newnotes.save();
    const response = {
         message: "added", };
    res.json(response);   
});
    }
);


//delete notes
app.post('/notes/delete',async function(req, res){
    await Note.deleteOne({ id: req.body.id});
    const response = {
        message: "deleted", };
    res.json(response);
    
});




//server created
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log('server started');
});







