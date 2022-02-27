const express = require('express');
var bodyParser = require('body-parser')
const TodoModel = require("./TodoModel");

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.status(200);
    res.send("This is todolist server");
});

app.get("/todos", async (req, res) => {
    const todo = await TodoModel.find({});
    res.json(todo);
  });

app.post('/savetodo',async (req,res)=>{
    let error = {}
    if(req.body.id === ''){
        error.id = "id must not be empty"
    }
    if(req.body.text === ''){
        error.text = "text must not be empty"
    }
    if(error.text || error.id){
        res.send(error)
    }
    else{
    const todo = new TodoModel({
        id:req.body.id,
        text:req.body.text
    })
	await todo.save()
	res.send(todo)
    }
})

app.patch("/patchTodo",async(req,res)=>{
    try{
    const port = await TodoModel.findOne({id:req.body.id})
    port.text = req.body.text
    await port.save();
    res.send(port)
    }catch {
		res.status(404)
		res.send({ error: "Todo doesn't exist!" })
	}
})

app.delete('/deleteTodo',async(req,res)=>{
    try{
        await TodoModel.deleteOne({id : req.body.id})
        res.status(204).send()
    }catch{
        res.status(404)
		res.send({ error: "Todo doesn't exist!" })
    }
})


module.exports = app
