image = document.getElementById("img");

if (typeof popups === 'undefined'){
    popups = [];
}


image.addEventListener("mousemove", function(e) {
    var image_rect = image.getBoundingClientRect();
    var rects = links.concat(sounds).concat(popups);
    hovering = false;

    var x = e.clientX - image_rect.x;
    var y = e.clientY - image_rect.y;

    for (var i = 0; i < rects.length; i++) {
        if (x >= rects[i].x1 && x <= rects[i].x2 && y >= rects[i].y1 && y <= rects[i].y2 ) {
            hovering = true;
            break;
        }
    }
    if (hovering) {
        image.style.cursor='pointer';

    } else {
        image.style.cursor='auto';
    }
});

var audio;

var dimmer = null;

function showOverlay(link) {
    var link_splitted = link.split(".");
    var instrument_name = prefix.split("/").slice(0,-1).pop();
    if (link == "notes") {
        link = "notes.html?img="+ prefix + instrument_name + "000f" + ".png" + "&prefix=" + prefix;
    } else {
        link = "generic_image_link.html?img=" + prefix + instrument_name + link + ".png";
    }
    link_prefix = location.protocol;
    var docrect = document.body.getBoundingClientRect();
    var iframe = document.createElement("iframe");
    dimmer = document.createElement("div");
    dimmer.classList.add("dimmer");
    document.body.appendChild(dimmer);
    setTimeout(function(){dimmer.classList.add("dark");}, 20);
    dimmer.style.width = window.innerWidth +"px";
    dimmer.style.height = window.innerHeight+"px";
    dimmer.onclick = function() {
        iframe.remove();
        dimmer.remove();
    };
    iframe.style.border="none";
    iframe.style.zIndex=3;
    iframe.scrolling="no";
    iframe.allowSameO3rigin = 1;
    iframe.style.position= "absolute";
    var image_rect = image.getBoundingClientRect();

    iframe.onload = function(){
        var w = (this.contentWindow.document.body.scrollWidth+20);
        var h = (this.contentWindow.document.body.scrollHeight+20);
        this.style.height= h + 'px';
        this.style.width= w + 'px';
        this.style.left = (image_rect.x + (image_rect.width/2)) - w/2 + "px";
        this.style.top = (image_rect.y + (image_rect.height/2)) - h/2 + "px";
        this.contentDocument.body.style.backgroundColor= "transparent";
        document.body.classList.add("item-fade");
    };
    iframe.src = link;
    document.getElementById("container").appendChild(iframe);
}

image.addEventListener("click", function(e) {
    var image_rect = image.getBoundingClientRect();
    var x = e.clientX - image_rect.x;
    var y = e.clientY - image_rect.y;

    for (var i = 0; i < links.length; i++) {
        if (x >= links[i].x1 && x <= links[i].x2 && y >= links[i].y1 && y <= links[i].y2 ) {
            window.top.location.href = links[i].link + ".html";
            return;
        }
    }
    for (var i = 0; i < sounds.length; i++) {
        if (x >= sounds[i].x1 && x <= sounds[i].x2 && y >= sounds[i].y1 && y <= sounds[i].y2 ) {
            audio && audio.pause();
            audio = new Audio('assets/'+ prefix + sounds[i].sound + suffix + '.mp3');
            audio.play();
            return;
        }
    }
    for (var i = 0; i < popups.length; i++) {
        if (x >= popups[i].x1 && x <= popups[i].x2 && y >= popups[i].y1 && y <= popups[i].y2 ) {
            showOverlay(popups[i].link);
        }
    }
});
