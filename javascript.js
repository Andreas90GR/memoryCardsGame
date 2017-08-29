//store name of each image
var images =["photo0","photo1","photo2","photo3","photo4","photo5","photo6","photo7","photo8","photo9"];
var playing =false;
var action;
var timer;
var openPictures;
var openCardsTitle = [];
var openCardsImage =[];
var openCardsCover =[];
var findCards = 0;
 

//if we push start-reset button
document.getElementById("startReset").onclick = function(){
    //if the game is in progress
    if(playing == true){
        location.reload();
        document.getElementById("startReset").innerHTML = "Start Game";
        playing = false;
     
     //if the game is not in progress    
    }else{
        playing = true;
        findCards = 0;
        hide("gameOver");
        hide("congratulations");
        //all the boxes are not clicked
        document.getElementById("boxes").style.pointerEvents ="none";
        document.getElementById("startReset").innerHTML = "Reset Game";
        ShuffleImages(); //place images into divs
        showAllCards(); 
        hideAllCards();
       
        //after 3 sec timer start the countdown
        setTimeout(function(){
            show("timer");
            timer = 60;
            startCountdown();
            //all boxes are clicked
            document.getElementById("boxes").style.pointerEvents ="auto";
        },3000);
         
        
    }
    
}

//if i click on cover photos
for(i=1;i<=20;i++){
    document.getElementById("box" + i).onclick = function(){
        //if i'm playing
        if (playing == true){
       
            //take the elements of the cover and image
            var cover = this.firstChild.getAttribute('id');
            var image = this.lastChild.getAttribute('id');
            
            //push elements in arrays
            openCardsImage.push(image);
            openCardsCover.push(cover);
            openCardsTitle.push(this.lastChild.getAttribute('title'));
//            window.console.log(openCardsCover);
            
            //display image;
            hide(cover);
            show(image);
            //if number of images is even but not zero 
            if((openCardsTitle.length % 2 == 0) && (openCardsTitle.length != 0)){
        
                
                //if last two elements of openCardsTitle array is the same
                if(openCardsTitle[openCardsTitle.length-1] == openCardsTitle[openCardsTitle.length-2]){
                    findCards++;
                    //change the opacity of two cards
                    document.getElementById(openCardsImage[openCardsImage.length-1]).style.opacity = "0.5";
                    document.getElementById(openCardsImage[openCardsImage.length-2]).style.opacity = "0.5";
                    //take the number of two boxes
                    var firstBox = openCardsCover[openCardsCover.length-1].slice(5,7);
                    var secondBox = openCardsCover[openCardsCover.length-2].slice(5,7);
                   
                    //these two boxes are not clicked anymore
                    document.getElementById("box"+firstBox).style.pointerEvents = "none";
                    document.getElementById("box"+secondBox).style.pointerEvents = "none";
                    
                    //if we have found all cards
                    if(findCards == 10){
                        show("congratulations");
                        var time = stopCountdown();
                        hide("timer");
                        document.getElementById("finalScore").innerHTML = (60-time) + " seconds";
                       
                        document.getElementById("startReset").innerHTML = "Play Again";
                        playing = true;
                    }
                }
                //if images are not the same
                else{
                    //disable all the boxes
                     document.getElementById("boxes").style.pointerEvents = "none";
                    
                    //wait 0.5 sec and hide again images
                    setTimeout(function(){
                        hide(openCardsImage[openCardsImage.length-1]);
                        show(openCardsCover[openCardsCover.length-1]);
                        hide(openCardsImage[openCardsImage.length-2]);
                        show(openCardsCover[openCardsCover.length-2]);
                        
                        //enable all the boxes 
                        document.getElementById("boxes").style.pointerEvents = "auto";

                }, 500);
                 
                }
            
            }
                

        }//if i don't play no action
    }
    
}
    
//functions

//place images in ramdom divs 
function ShuffleImages(){
    var reserved = []; //store divs in which has already an image
    for(y=1;y<=2;y++){
        for(i=0; i<10;i++){
        
        //produce a random number between 1-20 which is not used (div)   
        do{
            var boxNumber = Math.round(Math.random()*19)+1; 
            
        }while(reserved.indexOf(boxNumber) > -1);
            
        document.getElementById("box" + boxNumber).innerHTML += "<img src =images/photo" + i +".jpg id =image" + boxNumber + " title = pocketmon" + i + " class = images>";
    
        document.getElementById("image" + boxNumber).style.display ="none";  
        reserved.push(boxNumber);
        }
    }
    
}

//show all cards
function showAllCards(){
    for(i=1;i<21;i++){
            document.getElementById("cover"+i).style.display = "none"; 
            document.getElementById("image"+i).style.display = "block"; 
            
        }  
}

//hide all cards after 3 seconds
function hideAllCards(){
    firstShow = setTimeout(function(){
        for(i=1;i<21;i++){
         document.getElementById("cover"+i).style.display = "block"; 
         document.getElementById("image"+i).style.display = "none";  
        

        }  
    },3000);
   
}

//countdount 
function startCountdown(){
    action = setInterval(function(){
        timer -=1;
        document.getElementById("remaining time").innerHTML = timer;
        if(timer == 0){
            stopCountdown();
            show("gameOver");
            document.getElementById("boxes").style.pointerEvents = "none";
            hide("timer");
            playing = true;
        }
    },1000);
}

function stopCountdown(){
    clearInterval(action);
    return timer;
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
    document.getElementById(id).style.display = "block";
}



