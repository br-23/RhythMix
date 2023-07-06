let buttonClicked=0;
let audio=new Audio('./audios/attention.mp3');
let play=document.getElementById("masterplay");
let progressBar=document.getElementById("bar");
let gif=document.getElementById('gif');

//array of objects having key-value pairs
var song=[
    {name:'Attention - Charlie Puth',path:'./audios/attention.mp3'},
    {name:'Die For You - The Weeknd',path:'./audios/dieforyou.mp3'},
    {name:'God is a woman - Ariana Grande',path:'./audios/godwoman.mp3'},
    {name:'Havana - Camila Cabello, Young Thug',path:'./audios/havana.mp3'},
    {name:'Late Night Talking - Harry Styles',path:'./audios/latenighttalk.mp3'},
    {name:'One Dance - Drake, Wizkid, Kyla',path:'./audios/onedance.mp3'},
    {name:'Senorita - Shawn Mendes, Camila Cabello',path:'./audios/senorita.mp3'},
    {name:"When You're Gone - Shawn Mendes",path:"./audios/whenyougone.mp3"},
    {name:'Need to Know - Doja Cat',path:'./audios/needtoknow.mp3'},
    {name:'Souvenir - Selena Gomez',path:'./audios/souvenir.mp3'}
]

//handle play/pause click
play.addEventListener('click',function(){

    //the play button clicked -> when the song is paused or not started
    if(audio.paused || audio.currentTime<=0){
        audio.play();

        //converting play icon to pause
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
        //displaying gif
        gif.style.opacity=1;
    }    
    
    //the audio is playing -> we need to pause it
    else{
         audio.pause();
         //exchanging icons
         play.classList.remove('fa-circle-pause');
         play.classList.add('fa-circle-play');
         //removing gif
         gif.style.opacity=0;
    }
});

//updating the progress bar
//timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
audio.addEventListener('timeupdate',function(){

        //calculating the progress in % 
        //parseInt not necessary
        //duration is the total time of song
        progress=parseInt((audio.currentTime/audio.duration)*100);
        progressBar.value=progress;   //updating the value attribute
        
        //automatically playing the next song when previous one is completed
        if(audio.currentTime===audio.duration){
            if(buttonClicked===song.length-1)
            buttonClicked=0;
            else
            buttonClicked++;
            
            setTimeout(function(){
                commonSteps(buttonClicked);
            },2000);
        }
});

//audio gets updated accordingly when the user clicks anywhere on progress bar
progressBar.addEventListener('change',function(){
    //convert % back to currentTime
    audio.currentTime=((progressBar.value*audio.duration)/100);
});

//playing songs for each button
$('button').click(function(e){
        buttonClicked=parseInt(e.target.id);

        //adding animation on button click
        $('#'+e.target.id).removeClass('btn-lg');
        $('#'+e.target.id).css('backgroundColor','#FA9884');
        setTimeout(function(){
            $('#'+e.target.id).addClass('btn-lg');
            $('#'+e.target.id).css('backgroundColor','rgb(203, 201, 201)');
        },200);

        commonSteps(buttonClicked);

});

//giving behaviour to prev button
$('#prev').click(function(){
    if(buttonClicked===0)
        buttonClicked=song.length-1;
    else
        buttonClicked--;

        //adding animation to the prev button
        $('#'+buttonClicked).removeClass('btn-lg');
        $('#'+buttonClicked).css('backgroundColor','#FA9884');
        setTimeout(function(){
            $('#'+buttonClicked).addClass('btn-lg');
            $('#'+buttonClicked).css('backgroundColor','rgb(203, 201, 201)');
        },200);

    commonSteps(buttonClicked);
});

//giving behaviour to next button
$('#next').click(function(){
    if(buttonClicked===song.length-1)
        buttonClicked=0;
    else
        buttonClicked++;

        //adding animation to the next button
        $('#'+buttonClicked).removeClass('btn-lg');
        $('#'+buttonClicked).css('backgroundColor','#FA9884');
        setTimeout(function(){
            $('#'+buttonClicked).addClass('btn-lg');
            $('#'+buttonClicked).css('backgroundColor','rgb(203, 201, 201)');
        },200);

    commonSteps(buttonClicked);
});


//common button animations, gif and audio plays
function commonSteps(buttonClicked){
    audio.src= song[buttonClicked].path;
    audio.currentTime=0;
    audio.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    gif.style.opacity=1; 

    $('#songName').text(song[buttonClicked].name);

    //button animation
}

//adding keydown event
$(document).keydown(function(e){
     if(e.key===' '){
        if(audio.paused || audio.currentTime<=0){
            audio.play();
    
            //converting play icon to pause
            play.classList.remove('fa-circle-play');
            play.classList.add('fa-circle-pause');
            //displaying gif
            gif.style.opacity=1;
        }    
        
        //the audio is playing -> we need to pause it
        else{
             audio.pause();
             //exchanging icons
             play.classList.remove('fa-circle-pause');
             play.classList.add('fa-circle-play');
             //removing gif
             gif.style.opacity=0;
        }
    }
    else if(e.key==="ArrowRight"){
        if(buttonClicked===song.length-1)
        buttonClicked=0;
    else
        buttonClicked++;

        //adding animation to the next button
        $('#'+buttonClicked).removeClass('btn-lg');
        $('#'+buttonClicked).css('backgroundColor','#FA9884');
        setTimeout(function(){
            $('#'+buttonClicked).addClass('btn-lg');
            $('#'+buttonClicked).css('backgroundColor','rgb(203, 201, 201)');
        },200);

    commonSteps(buttonClicked);
    }
    else if(e.key==="ArrowLeft"){
        if(buttonClicked===0)
        buttonClicked=song.length-1;
    else
        buttonClicked--;

        //adding animation to the prev button
        $('#'+buttonClicked).removeClass('btn-lg');
        $('#'+buttonClicked).css('backgroundColor','#FA9884');
        setTimeout(function(){
            $('#'+buttonClicked).addClass('btn-lg');
            $('#'+buttonClicked).css('backgroundColor','rgb(203, 201, 201)');
        },200);

    commonSteps(buttonClicked);
    }
});


//responsive behaviour
if($(window).width()<=770)
{
    for(let i=0;i<5;i++){
     song.pop();
    }
}
