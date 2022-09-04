const mongoose = require('mongoose');

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
    status:" a novel"
  })

  const secondBook= new BookModel({
    title: "the alchemist ",
    description:" the story of the young Spanish shepherd Santiago on his journey to achieve his dream, which has been repeated more than once, which revolves around a treasure buried in the pyramids in Egypt. ",
    status:" a novel"
  })

  const thirdBook = new BookModel({
    title: " The Da Vinci Code" ,
    description:"A fictional police mystery and suspense novel by American author Dan Brown published in 2003. The novel has sold 60.5 million copies and is ranked at the top of the New York Times bestseller list " ,
    status:" a novel"
  })

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}

seedData(); //call seedData function
server.get('/books',getBooksHandler);

function getBooksHandler(req,res) {
    Model.find({},(err,result)=>{
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
  