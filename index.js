let express=require('express')
let app=express()
let mongoose=require('mongoose')
let bodyParser=require('body-parser')
let book=require('./schemaa')

let db='mongodb://localhost/neel'
mongoose.connect(db);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended:true
}))

app.get('/',(req,res)=>{
	res.send("jai ho")
})
app.get('/books',(req,res)=>{
	console.log('getting all books');
	book.find({})
	  .exec((err,books)=>{
	  	if(err){
	  		res.send('error has occured')
	  	}else{
	  		console.log(book)
	  		res.json(book)
	  	}
	  })
})

app.post('/book',(req,res)=>{
	let newbook=new book();
	newbook.title=req.body.title;
	newbook.author=req.body.author;
	newbook.url=req.body.url;
	newbook.save((err,book)=>{
		if(err){
			res.send('error saving book')
		}else{console.log(book)
			res.send(book)}
	})
})
app.post('/book2',()=>(req,res)=>{
	book.create(req.body,(err,book)=>{
		if(err){
			res.send('error in saving')
		}else{console.log(book);
			res.send(book) }
	}
})
})
app.put('/book/:id',(req,res)=>{
book.findOneAndUpdate({
	_id:req.params.id
},{$set:{title:req.body.title}},
	{upsert:true},
	(err,newbook)=>{
		if(err){console.log('error occured');
			else{console.log(newbook)
				res.send(newbook)
			}}
	})
})
app.delete('/book/:id',(req,res){
	book.findOneAndRemove({
		_id:req.params.id
	},(err,book)=>{
		if (err) {res.send('error deleting')}
			else{
				console.log(book);
				res.status(204)
			}
	})
})
let port=3000
app.listen(port,()=>{
	console.log('app running on port'+port)
})