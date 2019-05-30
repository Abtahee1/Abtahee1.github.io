let name2=document.getElementById("name")
let scoreboard = { }
let direction_h
let direction_v
let direction_h2
let direction_v2
let x
let y
let score 
let level
let radius
let enemy
let speed
let time
let n 
let m
let z
let v
let c
let b
let l
let k
let r
let i
let h
let j
let direction




  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDgE4nFIUo5LqwyJB5FLLgiM7oGf0g_uUs",
    authDomain: "final-project-9861f.firebaseapp.com",
    databaseURL: "https://final-project-9861f.firebaseio.com",
    projectId: "final-project-9861f",
    storageBucket: "final-project-9861f.appspot.com",
    messagingSenderId: "768847699650",
    appId: "1:768847699650:web:7cf6284f0370515f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()


function setup() {
  score=0
  createCanvas(windowWidth, windowHeight);
  s = width/718
  x=40
  y=40
  b=100
  c=300
  n=600
  m=50
  z=500
  v=40
  c=300
  b=100
  l=500
  k=300
  r=250
  i=100
  h=300
  j=250
  o=[300,550,550,200,150,225,500,450]
  p=[200,170,500,250,345,100,215,230]
  direction_h2 = [-1,-1,1,-1,-2,1.75,-2,0.5]
  direction_v2 = [-1,1,-1,1,-2,1.5,-2,3]
  direction_h = 1
  direction_v = 1
  direction = 1
  level = 1
  radius=30
  enemy= 3
  speed=2.5
  time=150
}

function draw() {
  if (time > 0) {
  background(96, 147, 86);
  
  
  
  fill(60,120,200)
  
 
  circle(x*s,y,30*s)
  fill(50,200,110)
  
  if(m>height){
    m=0
  }
  

  fill(50,160,210)
  textSize(30)
  text("time:" + time.toFixed(0),100,45)
  text("score:" + score.toFixed(0),485*s,45)
  if(keyIsDown(LEFT_ARROW)){
    x = x - 5.5
}
if (touches.length == 0) {	  
   if(keyIsDown(RIGHT_ARROW)){
     x = x + 5.5
 }
   if(keyIsDown(UP_ARROW)){
     y = y - 5.5
 }
   if(keyIsDown(DOWN_ARROW)){
     y = y + 5.5
 }
}
else {
     x = touches[0].x
     y = touches[0].y
}
  time= time-1
  b = b + 5*direction_h
  c = c + 5*direction_v
  if (b*s>width || b*s<0){
    direction_h = direction_h* -1
  }
  if (c>height || c<0){
    direction_v = direction_v* -1
  }
   if(dist(x*s,y,b*s,c)<30*s+30*s){
    score =score +0.2
   }
  
  if (level < 4 || level > 4) {
    fill(0,255,0)
      circle(b*s,c,30*s)
   
      for (i=0; i<enemy; i=i+1) {

        if (o[i]*s>width || o[i]*s<0){
          direction_h2[i] = direction_h2[i]* -1
        }
        if (p[i]>height || p[i]<0){
          direction_v2[i] = direction_v2[i]* -1
        }
        fill(0,0,0)
        circle(o[i]*s,p[i],radius*s)
        o[i] = o[i] + speed*direction_h2[i]
        p[i] = p[i] + speed*direction_v2[i]
          if(dist(x*s,y,o[i]*s,p[i])<30*s+30*s){
          score =score -0.15
  
       }
      }
    if(dist(x*s,y,n*s,m)<30*s+128*s){
    score =score -0.5
   }
  }
  
  if (level==4) {
      fill(220,20,60)
      circle(n*s,m,55*s)
      
    n = n + 0
    m = m + 5
    
    fill(169,169,169)
    circle(z*s,v,12*s)
    
    z = z - 35
    v = v + 0
    
    fill(0,255,0)
      circle(b*s,c,30*s)
    
    if( z<0 ){
      z=n
      v=m
    }
  }
  
  if(score > 5 && level == 1) {
    direction_v2 = [4,4,4,4,4,4,4]
    level = 2
  }
  if(score > 10 && level == 2) {
    radius = radius + 7.5
    level = 3
  }
  if(score > 10 && level == 3) {
    level = 4
  }

  if(score > 15 && level == 4) {
    enemy = enemy + 3
    level = 5
  }
  if(score > 20 && level == 5) {
    speed = speed + 2
    level = 6
  }
  
  

 }
  else {
    name2.innerHTML = "Name? <input id='NAME'><button onclick='restart()'>Restart</button><button onclick='generate all time leaderboard'>All-time leaderboard</button>"
    noLoop()
  }

}
 function restart() {
   let NAME = document.getElementById("NAME")
   name = NAME.value
	 database.ref(name).set(score.toFixed(0))
   if (name != "") {
     scoreboard[name] = score.toFixed(0)

   }
   
   alert("scoreboard:"+JSON.stringify(scoreboard,null,1))
   time=150
   score=0
   loop()
   name2.innerHTML = ""
   generate_leaderboard()
 }
 

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(JSON.stringify(max))
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

   function generate_alltime_leaderboard() {
		let alltime_leaderboard = { }
		database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
			snapshot.forEach(function(data) {
			alltime_leaderboard[data.key] = data.val()
			});
	    	});
		if (Object.values(alltime_leaderboard).length > 0) {
		  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
	    	}
	}

	

