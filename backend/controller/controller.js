const TodoModel = require("../models/TodoModel");
const todoModel = require("../models/TodoModel")

module.exports.getTodos = async (req, res) => {
    const todos = await todoModel.find();
    res.json(todos);
}
module.exports.saveTodos = async (req, res) => {
    const { todo } = req.body
    TodoModel.create({ todo })
        .then(data => {
            console.log("saved Successfully")
            res.status(201).send(data);
        })


        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something Went Wrong" })
        })
}
module.exports.updateTodos = async (req, res) => {
    const { id } = req.params;
    const { todo } = req.body

    todoModel.findByIdAndUpdate(id, { todo })
        .then(() => {

            res.send("update Successfully");
        })


        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something Went Wrong" })
        })
}

module.exports.deleteTodos = async (req, res) => {
    const { id } = req.params;


    todoModel.findByIdAndDelete(id)
        .then(() => {

            res.send("deleted Successfully");
        })

        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something Went Wrong" })
        });
}