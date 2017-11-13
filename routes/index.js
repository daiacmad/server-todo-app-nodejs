var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	id : Number,
    title : String,
    complete : Boolean
});

var todo = mongoose.model('todo-list', todoSchema);

/* GET home page. */
router.get('/api/getTodoList', function(req, res, next) {
	todo.find({}, function(err , data){
		res.send(data)
	})
});

router.post('/api/addTodoItem', function(req, res, next) {
	var newTodo = new todo(req.body)
	newTodo.save(function(err , data){
		res.send(newTodo)
	})
});

router.put('/api/updateTodoItem/:id', function(req, res, next) {
	todo.update({_id: req.params.id }, {
	    title: req.body.title, 
	    complete: req.body.complete
	}, function(err, numberAffected, rawResponse) {
	    res.send(numberAffected);
	})
});

router.delete('/api/deleteTodoItem/:id', function(req, res, next) {
	todo.findOne({_id : req.params.id}).remove(function(errr){
		res.send("successfully")
	})
});


/* hero */
var heroSchema = mongoose.Schema({
    name : String,
    description : String,
    corporation : String
});

var hero = mongoose.model('hero', heroSchema);


router.get('/api/getHeroes', function(req, res, next) {
	hero.find({}, function(err , data){
		res.send(data)
	})
});

router.get('/api/getHeroDetail/:id', function(req, res, next) {
	hero.findOne({_id : req.params.id}, function(err , data){
		res.send(data)
	})
});

router.post('/api/addHero', function(req, res, next) {
	var newHero = new hero({
		name : "Thor",
	    description : "trùm asgard",
	    corporation : "không biết"
	});
	newHero.save(function(err , data){
		res.send(newHero)
	})
});

// router.put('/api/updateTodoItem/:id', function(req, res, next) {
// 	todo.update({_id: req.params.id }, {
// 	    title: req.body.title, 
// 	    complete: req.body.complete
// 	}, function(err, numberAffected, rawResponse) {
// 	    res.send(numberAffected);
// 	})
// });

// router.delete('/api/deleteTodoItem/:id', function(req, res, next) {
// 	todo.findOne({_id : req.params.id}).remove(function(errr){
// 		res.send("successfully")
// 	})
// });


module.exports = router;
