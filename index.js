const express=require('express')
const cors=require('cors')
const db =require('./db')


const app=express();
const port=5000

app.use(cors())
app.use(express.json())

//Create To-Do
app.post('/api/addtodo',(req,res)=>{
    const{task,completed}=req.body
    const create='INSERT INTO todos (task,completed) VALUES (?,?)';
    db.run(create,[task,completed],(err)=>{
        if(err){
            return res.status(500).json({error:err.message})
        }else{
            res.status(200).json({message:'Task Created'});
        }
    })
})

// Fetch the tasks
app.get('/api/tasks',(req,res)=>{
    const tasks='SELECT * FROM todos';
    db.all(tasks,[],(err,rows)=>{
        if(err){
            return res.status(500).json({error:err.message})
        }
        res.json(rows)
    })

})
//Update the task/completed 
app.put('/api/edit',(req,res)=>{
    const id=req.query.id;
    const{task,completed}=req.body
    const edit='UPDATE todos SET task=?,completed=? WHERE id=?'
    db.run(edit,[task,completed,id],(err)=>{
        if(err){
            return res.status(400).json({error:"Unable to update the data"})
        }
        res.json({message:`To-Do with ID ${id} updated Successfully`})
    })
})
//Delete the To-Do
app.delete('/api/delete',(req,res)=>{
    const id =req.query.id;
    const remove  ='DELETE FROM todos WHERE id=? '
    db.run(remove,[id],(err)=>{
        if(err){
            return res.status(400).json({error:"The Task is not Found!"})
        }
        res.status(200).json(`To-Do with id=${id} Successfully Deleted`)
    })
})

// Search 
app.get('/api/search/:key',(req,res)=>{
    const {key}=req.params;
    const search="SELECT * FROM todos where task like ?";
    const value=`%${key}%`;
    db.all(search,[value],(err,rows)=> {
        if (err) {
            return res.status(400).json({ error: err.message });
            }
            res.json(rows);
            
    })
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });