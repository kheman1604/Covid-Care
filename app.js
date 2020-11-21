var express=require('express');
var app=express();
var path=require('path');
var bodyparser=require('body-parser');
var mongoose=require('mongoose');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var User=require('./models/user');
var Hospital=require('./models/hospital.js');
var nodemailer = require('nodemailer');
mongoose.connect("mongodb+srv://divesh:dev123456789@cluster0.l6u2q.mongodb.net/covid_care?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true });

app.use(express.static(path.join(__dirname, '/public')));
//passport config
app.use(require("express-session")({
	secret:"divesh abhishek kheman",
	resave:false,
	saveUninitialized: false
}));

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'covidcare96@gmail.com',
	  pass: 'covidop123'
	}
  });

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()) );
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({extended:true,limit: '50mb'}));
var port=process.env.PORT || 3000;
app.listen(port,process.env.IP,function(){
	console.log("server started.");
});

app.get("/",function(req,res){
	res.render("index.ejs",{currentUser:req.user});
});
app.get("/login",function(req,res,next){
	res.render("login.ejs",{currentUser:req.user});
});
app.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),function(req,res){
	res.redirect('/dash');
});
app.get("/reghos",function(req,res,next){
	res.render("reghos.ejs");
});
app.post("/reghos",function(req,res){
    var newhosp={name:req.body.name,pattern:req.body.pattern,address:req.body.address,phone:req.body.phone,beds:req.body.beds,ventilators:req.body.ventilators};
   
    Hospital.create(newhosp,function(err,newlycreated){
		if(err)
			console.log(err);
		else{
			console.log(newlycreated);
			res.redirect("/");
            
		}
			
	});
});

app.get("/signup",function(req,res){
    Hospital.find({},function(err,hospitals){
        if(err)
        console.log(err);
        else
        res.render('signup.ejs',{currentUser:req.user,hospitals:hospitals});
    });

});
app.post("/signup",function(req,res){
	var newUser= new User({username:req.body.username,ename:req.body.ename,hospitalid:req.body.hospital});
	User.register(newUser,req.body.password,function(err,user){
		if(err)
			{
				console.log(err);
				res.redirect('/signup');
			}
		else{
			var mailOptions = {
				from: 'covidcare96@gmail.com',
				to:req.body.username ,
				subject: 'Sign Up Confirmation',
                text: "You can now access the portal."
			  };
			  
 transporter.sendMail(mailOptions, function(error, info){
	if (error) {
	  console.log(error);
	} else {
	  console.log('Email sent: ' + info.response);
	}
  });
  
			res.redirect('/login');
		}
	});
});
app.get("/dash",function(req,res){
	Hospital.findOne({_id:req.user.hospitalid},function(err,hospital){
	if(err)
	console.log(err);
	else{
		console.log(hospital)
		res.render("dash.ejs",{currentUser:req.user,hospital:hospital});
	}

	});
});

