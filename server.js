'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { response } = require('express');

const mongoose = require('mongoose');
const server = express();
server.use(cors());

const PORT = process.env.PORT || 3001;

server.get('/test', (request, response) => {

  response.send('test request received')

}) 

mongoose.connect('mongodb://localhost:27017/books-database', {useNewUrlParser: true, useUnifiedTopology: true}); 

const BookSchema = new mongoose.Schema({  // define schema
title: String,
description:String,
status:String
});


const BookModel = mongoose.model('Book', BookSchema); //compile the schem into a model

//seed data (insert initial data)
async function seedData(){
  const firstBook = new BookModel({
    title:"the forty Rules of Love" ,
    description:"Two parallel tales, one in contemporary times and the other in the thirteenth century, when Rumi encounters his spiritual guide, the traveling dervish known as “Shams of Tabrizi” and how they together embody the eternal message of love poetry ",
    status:" pending"
  })

  const secondBook= new BookModel({
    title: "the alchemist ",
    description:" the story of the young Spanish shepherd Santiago on his journey to achieve his dream, which has been repeated more than once, which revolves around a treasure buried in the pyramids in Egypt. ",
    status:"pending"
  })

  const thirdBook = new BookModel({
    title: " The Da Vinci Code" ,
    description:"A fictional police mystery and suspense novel by American author Dan Brown published in 2003. The novel has sold 60.5 million copies and is ranked at the top of the New York Times bestseller list " ,
    status:" pending"
  })

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}

  seedData(); 


//Routes
server.get('/',homeHandler);
server.get('/test',testHandler);
server.get('/books',getBooksHandler); 
server.post('/addbook',addBookHandler);
server.delete('/deleteBook/:id',deleteBookHandler);

server.get('*',defualtHandler);


// http://localhost:3000/
function homeHandler(req,res) {
  res.send("Hi from the home route");
}

// http://localhost:3000/test
function testHandler(req,res) {
  res.status(200).send("You are requesting the test route");
}

// http://localhost:3000/*
function defualtHandler(req,res) {
  res.status(404).send("Sorry, Page not found");
}

//http://localhost:3001/books

function getBooksHandler(req,res) {
  BookModel.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          console.log(result);
          res.send(result);
      }
  })
}



async function addBookHandler(req,res) {
  console.log(req.body);
  const { title,description,status } = req.body;
  await BookModel.create({
      title:title ,
      description :description,
      status:status
      
  });
 

  BookModel.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          // console.log(result);
          res.send(result);
      }
  })
}


function deleteBookHandler(req,res) {
  const bookId = req.params.id;
  BookModel.deleteOne({_id:bookId},(err,result)=>{
      
      BookModel.find({},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              // console.log(result);
              res.send(result);
          }
      })

  })
  
}








server.get('*', (req,res)=>{
  res.send("page not found");
})
server.listen(PORT, () => console.log(`listening on ${PORT}`));
