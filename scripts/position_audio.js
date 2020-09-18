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

var dimmer = null;

function showOverlay(link, links, sounds) {
    links = links === undefined ? null: links;
    sounds = sounds === undefined ? null: sounds;
    var link_splitted = link.split(".");
    var instrument_name = prefix.split("/").slice(0,-1).pop();
    if (link == "notes") {
        link = "000f" + ".png";
    } else if (link == "vues") {
        link = "000v" + ".png";
    } else if (link == "demo") {
        link = "000b" + ".png";
    } else if (link == "aussi") {
        link = "000s" + ".png";
    } else {
        link = "00" + link + "z.png";
    }


    link = "generic_image_link.html?img=" + prefix + instrument_name + link + "&prefix=" + prefix + "&links=" + JSON.stringify(links) + "&sounds=" + JSON.stringify(sounds);

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
        console.log("aaaa");
        ifs = document.querySelectorAll("iframe");
        for (var i = 0; i < ifs.length; i++) {
            ifs[i].remove();
        }
        iframe.remove();
        dimmer.remove();
    };
    iframe.style.border="none";
    iframe.style.zIndex=3;
    iframe.scrolling="no";
    iframe.allowSameO3rigin = 1;
    iframe.style.position= "absolute";
    iframe.style.display = "none";
    var image_rect = image.getBoundingClientRect();

    iframe.onload = function(){
        var that = this;
        function refresh_style() {
            var w = (that.contentWindow.document.getElementById("img").naturalWidth+20);
            var h = (that.contentWindow.document.getElementById("img").naturalHeight+20);
            that.style.height= h + 'px';
            that.style.width= w + 'px';
            that.style.left = (image_rect.x + (image_rect.width/2)) - w/2 + "px";
            that.style.top = (image_rect.y + (image_rect.height/2)) - h/2 + "px";
            that.contentDocument.body.style.backgroundColor= "transparent";
            that.style.display = "inline-block";
        }
        refresh_style();
        // setInterval(refresh_style ,100);

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
            if (links[i].link[0] == "@") {
                // @ is a magic char that tells this thing to replace the current iframe with the link
                var instrument_name = prefix.split("/").slice(0,-1).pop();
                var internal_links = links[i].links;
                var snds = links[i].sounds;
                internal_links = internal_links === undefined ? null: internal_links;
                snds = snds === undefined ? null: snds;
                var link = links[i].link.slice(1,);
                link = "generic_image_link.html?img=" + prefix + instrument_name + link + ".png" + "&prefix=" + prefix + "&links=" + JSON.stringify(internal_links) + "&sounds=" + JSON.stringify(snds);
                window.location.href = link;
                return;
            }
            window.top.location.href = links[i].link + ".html";
            return;
        }
    }
    for (var i = 0; i < sounds.length; i++) {
        if (x >= sounds[i].x1 && x <= sounds[i].x2 && y >= sounds[i].y1 && y <= sounds[i].y2 ) {
            console.log(window.top.audio);
            window.top.audio && window.top.audio.pause();
            window.top.audio = new Audio('assets/'+ prefix + sounds[i].sound + suffix + '.mp3');
            window.top.audio.play();
            return;
        }
    }
    for (var i = 0; i < popups.length; i++) {
        if (x >= popups[i].x1 && x <= popups[i].x2 && y >= popups[i].y1 && y <= popups[i].y2 ) {
            showOverlay(popups[i].link, popups[i].links, popups[i].sounds);
        }
    }
});
