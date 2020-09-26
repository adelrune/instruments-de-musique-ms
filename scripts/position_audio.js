image = document.getElementById("img");

if (typeof popups === 'undefined'){
    popups = [];
}

var dimmer = null;

var params = new URLSearchParams(window.location.search);

function showOverlay(link) {
    var docrect = document.body.getBoundingClientRect();
    var iframe = document.createElement("iframe");
    dimmer = document.createElement("div");
    dimmer.classList.add("dimmer");
    document.body.appendChild(dimmer);
    setTimeout(function(){dimmer.classList.add("dark");}, 20);
    dimmer.style.width = window.innerWidth +"px";
    dimmer.style.height = window.innerHeight+"px";
    window.addEventListener("resize", function(){
        dimmer.style.width = window.innerWidth +"px";
        dimmer.style.height = window.innerHeight+"px";
    });
    dimmer.onclick = function() {
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
    iframe.onload = function(){
        var that = this;
        function refresh_style() {
            var image_rect = image.getBoundingClientRect();
            iframe.style.border="none";
            iframe.style.zIndex=3;
            iframe.scrolling="no";
            iframe.allowSameO3rigin = 1;
            iframe.style.position= "absolute";
            iframe.style.display = "none";
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
        window.addEventListener("resize", function(){
            refresh_style();
        });
    };
    iframe.src = link;
    document.getElementById("container").appendChild(iframe);
}

var regions = ["afrique", "amerique_du_nord", "oceanie", "amerique_latine", "europe", "asie_du_sud", "moyen_orient", "asie_du_sud_est", "asie_centrale_et_orientale"];
if (regions.includes(params.get("region"))){
    showOverlay(params.get("region")+".html");
}

var all_the_divs = [];

function position_divs() {
    function give_me_a_div(rect_and_properties) {
        var div = document.createElement("div");
        div.rect_and_properties = rect_and_properties;
        div.restyle = function() {
            var image_rect = image.getBoundingClientRect();
            div.style = {};
            div.style.cursor='pointer';
            div.style.display = "block";
            div.style.position = "absolute";
            div.style.width = rect_and_properties.x2 - rect_and_properties.x1 + "px";
            div.style.height = rect_and_properties.y2 - rect_and_properties.y1 + "px";
            div.style.left = image_rect.x + rect_and_properties.x1 + "px";
            div.style.top = image_rect.y + rect_and_properties.y1 + "px";

        };
        document.body.appendChild(div);
        div.restyle();
        all_the_divs.push(div);
        return div;
    }

    for (var i = 0; i < links.length; i++) {
        let div = give_me_a_div(links[i]);
        div.onclick = function() {
            if (this.rect_and_properties.link[0] == "@") {
                // @ is a magic char that tells this thing to replace the current iframe with the link
                var instrument_name = prefix.split("/").slice(0,-1).pop();
                var internal_links = this.rect_and_properties.links;
                var snds = this.rect_and_properties.sounds;
                internal_links = internal_links === undefined ? null: internal_links;
                snds = snds === undefined ? null: snds;
                var link = this.rect_and_properties.link.slice(1,);
                link = "generic_image_link.html?img=" + prefix + instrument_name + link + ".png" + "&prefix=" + prefix + "&links=" + JSON.stringify(internal_links) + "&sounds=" + JSON.stringify(snds);
                window.location.href = link;
                return;
            } else if (regions.includes(this.rect_and_properties.link) && window.carte === undefined) {
                window.top.location.href = "instruments_du_monde.html?region="+this.rect_and_properties.link;
                return;
            }
            window.top.location.href = this.rect_and_properties.link + ".html";
        };
    }
    for (var i = 0; i < sounds.length; i++) {
        let div = give_me_a_div(sounds[i]);
        div.onclick = function() {
            window.top.audio && window.top.audio.pause();
            window.top.audio = new Audio('assets/'+ prefix + div.rect_and_properties.sound + suffix + '.mp3');
            window.top.audio.play();
        };
    }
    for (var i = 0; i < popups.length; i++) {
        let div = give_me_a_div(popups[i]);
        div.onclick = function() {
            if (regions.includes(div.rect_and_properties.link)) {
                showOverlay(div.rect_and_properties.link+".html");
                return;
            }
            var link = div.rect_and_properties.link;
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

            var p_links = div.rect_and_properties.links;
            var p_sounds = div.rect_and_properties.sounds;
            p_links = p_links === undefined ? null: p_links;
            p_sounds = p_sounds === undefined ? null: p_sounds;

            link = "generic_image_link.html?img=" + prefix + instrument_name + link + "&prefix=" + prefix + "&links=" + JSON.stringify(p_links) + "&sounds=" + JSON.stringify(p_sounds);
            showOverlay(link);
        };
    }
}

if (!image.complete) {
    image.onload = function (){position_divs();};
} else {
    console.log("was complete");
    position_divs();
}

window.addEventListener("resize", function(){
    all_the_divs.forEach(function(it){
        it.restyle();
    });
});
