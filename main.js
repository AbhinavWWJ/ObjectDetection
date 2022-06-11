status="";
objects=[];
function setup(){
    canvas=createCanvas(640, 420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: Detecting Objects";
    video= createCapture(VIDEO)
    video.size(380,380);
    video.hide();

}
function modelLoaded(){
    console.log("model Loaded!")
    status=true;
    
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video, 0,0, 640, 420);
   if(status !=""){ 
    objectDetector.detect(video, gotResult);
    r=random(255);
    g=random(255);
    b=random(255)
       for(i=0; i<objects.length;i++){
           document.getElementById("status").innerHTML="status: Objects Detected";
           document.getElementById("no_of_objects").innerHTML="Number Of Objects are: "+objects.length;
           fill(r,g,b);
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+ " " + percent+"%", objects[i].x+15, objects[i].y+15);
           noFill();
           stroke(r,g,b);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
   }
}
