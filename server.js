const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000 ;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine' , 'hbs');

app.use(express.static( __dirname + '/public')) ; 


app.use((req,res,next)=>
{
	var now = new Date().toString(); 
	var log = now + req.method + req.url;
	console.log(log);

	fs.appendFileSync( 'server.log' , log+ '\n' ,(err) =>
	{
		if(err)
			{ console.log('Unable to append to server.log')}
	});

	next();

}     );

// app.use((req,res,next)=>

// {

// 	res.render('middle.hbs');
	
// }

//      );




hbs.registerHelper( 'getcurrentYear' , () =>{
return new Date().getFullYear()
	});

hbs.registerHelper('screamIt' , (text) => 
{
	return text.toUpperCase();
});

app.get('/' , (req,res) =>
{
res.render('home.hbs' , {
	pagetitle : 'Home Page',
	welcome: 'welcome to my website'
	


})

});


app.get('/about' , (req,res) =>
{
res.render('about.hbs' , {
	pagetitle : 'about Page'
	

})

});



app.listen(port , ()=>
	{
		console.log("Sever is working on " + port);
	});