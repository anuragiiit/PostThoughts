const express=require('express');
const cors=require('cors');
const monk=require('monk');



const app=express();
const db =monk('mongodb+srv://Anurag_Mishra:8839852999@cluster0.xd9so.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const mews= db.get('mews');



app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>
{
    res.send('hello aum verma');
});




app.get('/mews',(req,res)=>
{
    mews
    .find()
    .then(mews =>{
        res.json(mews);
    });
});


function isValid(mew)
{
    return mew.name&&mew.name.toString().trim()!==''&&
    mew.content&&mew.content.toString().trim()!=='';
}






app.post('/mews',(req,res)=>{
    if(isValid(req.body)){
        const mew={
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };
mews
.insert(mew)
.then(createMew=>{
res.json(createMew);
});

       // console.log(mew);
    }
    else
    {
        res.status(422);
        res.json({
            message: 'hey! name and content are required'
        });
    }
});


app.listen(5000,()=>
{
console.log('listening to 5000....');
});