import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";


const app = express();
app.use(express.json());


async function getDBObject(param) {
    const client=new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db =  client.db('react-my-blog-2-db');
    const article = await db.collection('articles').findOne(param);
    return article;
  }

app.get("/api/articles/:name",async(req,resp)=>{
    const {name}=req.params;
    const client=new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db =  client.db('react-my-blog-2-db');
    const article = await db.collection('articles').findOne({name});
    
    if(article){
        resp.json(article);
    }else{
        resp.sendStatus(404);
    }
    
})


app.put("/api/articles/:name/upvote",async (req,resp)=>{
    const {name}=req.params;
    const client=new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db =  client.db('react-my-blog-2-db');
    await db.collection('articles').updateOne({name},{
        $inc:{vote:1}
    });
    
    const article = await db.collection('articles').findOne({name});
    
    if(article){
        resp.json(article);
    }else{
        resp.sendStatus(404);
    }
})


app.post("/api/articles/:name/comments",async (req,resp)=>{
    const {name}=req.params;
    const {postedBy,text}=req.body;

    const client=new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db =  client.db('react-my-blog-2-db');

    console.log(postedBy+" -------------- "+text);

    await db.collection('articles').updateOne({name},{
        $push:{comments:{postedBy,text}},
    });
    
    const article = await db.collection('articles').findOne({name});
    
    if(article){
        resp.json(article);
    }else{
        resp.sendStatus(404);
    }
})



//HARDED CODED API

app.get("/hellow",(req,resp)=>{
    resp.send("Hellow World");
});

app.post("/name",(req,resp)=>{
    // console.log(req.body);
    resp.send(`Hellow ${req.body.name}, how are you....!!`);
});

app.get("/hellow/:name",(req,resp)=>{
    const {name} = req.params;
    resp.send(`${name} bro kaisa hai tu....!!!!`);
});


// app.put("/api/article/:name/upVote",(req,resp)=>{
//     const {name}=req.params;
//     const article=articleInfo.find(a => a.name === name);
//     if(article){
//         article.vote++;    
//         resp.send(`Article named :: ${name} is upvoted by ${article.vote}`)
//     }else{
//         resp.send("ARTICLE DOES'NT EXISTS");
//     }
// });



app.post("/api/article/:name/comment",(req,resp)=>{
    const {name} = req.params;
    const {postedBy,text}=req.body;

    const article = articleInfo.find(a => a.name===name);
    if(article){
        article.comments.push({postedBy,text});
        resp.send(article.comments);
    }else{
        resp.send("ARTICLE DOES'NT EXISTS");
    }
});

app.listen(8000,()=>{
    console.log("Server Listening On Port 8000");
});