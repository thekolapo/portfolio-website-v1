var overlayHeight = '0%';
var tweening = false;
var scrollId = 0;
var divToScroll = 0;
var divIds = ["#home-row", "#first-project", "#second-project", "#third-project", "#fourth-project", "#fifth-project", "#sixth-project", "#about-section"]
var divIds_ = ["home-row", "first-project", "second-project", "third-project", "fourth-project", "fifth-project", "sixth-project", "about-section"]
var projectBackgroundColors = ['#ffffff', '#e5f0fe', '#6F2F8B', '#2f3790', '#6F2F8B', '#e5f0fe', '#43478b'];
var scrollTextCounterColors = ['#ed483f', '#6a9ff9', '#eede8e', '#eede8e', '#eede8e', '#444986'];
// #c44c53

var menuIcon = null;
var cantscroll = false;

var reqVal = 60;

window.addEventListener("wheel", function(e){
    if(tweening || overlayHeight != '0%' || scrollId == 7 ||  $(window).width() < 1024){
        return;
    }

   if(e.wheelDeltaY < -reqVal){
       scrollId+=1; 
       divToScroll = (scrollId == 7) ? 6 : scrollId-1;

       if(scrollId == 7){
        scrollId = 1; 
       }


       tweening = true;
       new TweenMax.to(divIds[divToScroll], 0.4, {opacity: '0', onComplete: onTweenComplete});   

   }
   else if(e.wheelDeltaY > reqVal){
       if(scrollId == 0){
           return;
       }

       scrollId -= 1;
       divToScroll = (scrollId == 0) ? 1 : scrollId+1;

       if(scrollId == 0){
        scrollId = 6; 
       }

     tweening = true;
     new TweenMax.to(divIds[divToScroll], 0.4, {opacity: '0', onComplete: onTweenComplete});   

   }

}, false)

var onTweenComplete = function () {
    document.getElementById(divIds_[divToScroll]).style.display = 'none';
    var newBackgroundColor =  (scrollId == 0)? '#051830' : projectBackgroundColors[scrollId - 1];
    new TweenMax.to('body', 0.4, {backgroundColor: newBackgroundColor});
    document.getElementById(divIds_[scrollId]).style.opacity = '0';
    document.getElementById(divIds_[scrollId]).style.display = 'block';
    new TweenMax.to(divIds[scrollId], 3, {opacity: '1'});
    document.getElementById("scroll-arrow").style.display = (scrollId == 0)? 'block' : 'none';
    document.getElementById("project-scroll-count").style.display = (scrollId == 0)? 'none' : 'block';
    document.getElementById("project-scroll-count").style.color = scrollTextCounterColors[scrollId - 1];
    document.getElementById('project-text-counter').style.color = scrollTextCounterColors[scrollId - 1];
    document.getElementById('project-text-counter').innerHTML = scrollId + '|';

    if(scrollId == 1 || scrollId == 2 || scrollId == 6){
        changeMenuBarColor('#0b0b0f');
    }
    else{
        changeMenuBarColor('#ffffff');

        if(scrollId == 7){
            document.getElementById("project-scroll-count").style.display = 'none';
        }
    }

    document.getElementById('projects-text').style.color = '#0b0b0f';

    if(scrollId == 3 || scrollId == 4 || scrollId == 5 ){
        document.getElementById('projects-text').style.color = '#ffffff';
    }
    else if(scrollId == 6){
        document.getElementById('projects-text').style.color = '#444986';
    }

    setTimeout(setTweeningToFalse, 700);
};

function setTweeningToFalse(){
    tweening = false;
}

function scrollToFirstProject(){
    scrollId = 1;
    divToScroll = 0;
    tweening = true;
    new TweenMax.to(divIds[divToScroll], 0.4, {opacity: '0', onComplete: onTweenComplete});   
}

function changeMenuBarColor(color){
    document.getElementById("bar1").style.backgroundColor = color;
    document.getElementById("bar2").style.backgroundColor = color;
    document.getElementById("bar3").style.backgroundColor = color;
}

function goToSection(section){
    menuIcon.classList.toggle("change");
    toggleNav();

    if(scrollId == section){
        return;
    }
    else if(scrollId > 0 && scrollId < 7 && section < 7 && section != 0){
        return;
    }

    divToScroll = scrollId
    scrollId = section;
    tweening = true;
    new TweenMax.to(divIds[divToScroll], 0.4, {opacity: '0', onComplete: onTweenComplete});   
}

function menuIconClick(x) {
    menuIcon = x;
    x.classList.toggle("change");
    toggleNav();
}

function toggleNav() {
    document.getElementById("myNav").style.height = (overlayHeight == "100%")? "0%" : "100%";
    overlayHeight = document.getElementById("myNav").style.height;
}

window.onload = function() {
    if ($(window).width() < 1024) {
        document.getElementById("home-row").style.display= 'none';
        document.getElementById("about-section").style.display= 'block';
        document.getElementById("about-section-view-work").style.display= 'block';
        document.getElementById("menu-icon").style.display= 'none';
        document.getElementById("scroll-arrow").style.display = 'none';

        cantscroll = true;
        document.body.style.backgroundColor = (scrollId == 0)? projectBackgroundColors[6] : projectBackgroundColors[scrollId - 1];
     }
     else {
        document.getElementById("about-section-view-work").style.display= 'none';
        document.getElementById("menu-icon").style.display= 'block';

        cantscroll = false;
     }

    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        reqVal = 2;        
    }
    
};


$(window).resize(function() {
    if ($(window).width() < 1024) {
        document.getElementById("about-section-view-work").style.display= 'block';
        document.getElementById("menu-icon").style.display= 'none';
        document.body.style.backgroundColor = projectBackgroundColors[6];

        if(scrollId == 7){
            return;
        }

        cantScroll = true;
        document.getElementById(divIds_[scrollId]).style.display = 'none';
        document.getElementById("about-section").style.opacity = 1;
        document.getElementById("about-section").style.display = 'block';
        document.getElementById("scroll-arrow").style.display = 'none';
        document.getElementById("project-scroll-count").style.display = 'none';
     }
     else {
        document.getElementById("about-section-view-work").style.display= 'none';
        document.getElementById("menu-icon").style.display= 'block';

        if(scrollId == 7){
            return;
        }
        else if(scrollId == 0){
            document.getElementById("scroll-arrow").style.display = 'block';
        }

        cantScroll = false;
        document.getElementById(divIds_[scrollId]).style.display = 'block';
        document.getElementById("about-section").style.display = 'none';
        document.getElementById("project-scroll-count").style.display = (scrollId == 0)? 'none' : 'block'; 
        document.body.style.backgroundColor = (scrollId == 0)? '#051830' : projectBackgroundColors[scrollId - 1];
     }
    
});
