import  express  from "express";
import mysql from 'mysql';
import cors from 'cors';

const app = express()

app.use(express.json())
app.use(cors())


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"test"
})

app.post('/register', (req,res)=>{
    const login = req.body.login
    const passwd = req.body.password
    db.query("INSERT INTO user(`login`, `pass`) VALUES (?,?)",
    [login, passwd], 
    (err, result)=>
    {
         console.log(err);
    })
})

app.post('/count', (req,res)=>{
    const login = req.body.login
    db.query("Select count(*) liczba from user where login = ?",
    [login], (err, result)=>
    {
        if(err)
        {
            res.send({err: err})
        }
        else  
        {
            res.send(result)
            console.log(result)
        }
    }) })



app.post('/login', (req,res)=>
{
    const login = req.body.loginn
    const passwd = req.body.passwordd
    db.query("SELECT * from user where login = ? and pass =?",
    [login, passwd], 
    (err, result)=>
    {
        if(err)
        {
            res.send({err: err})
        }
        if(result.length>0)
        {
            res.send(result)
        }
         else 
        {
            res.send({message: "Wpisano zle dane"})
        }
        
    })
}
)

app.listen(3001, () => {
    console.log("ruinng")
})

