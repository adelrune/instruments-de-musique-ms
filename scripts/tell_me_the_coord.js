
var pos_rect = {sound:"", link:""};

visualiser = null;

document.addEventListener("click", function(e) {
    var image = document.getElementById("img");
    var image_rect = image.getBoundingClientRect();
    if (pos_rect.x1 === undefined) {
        pos_rect.x1 = e.clientX - image_rect.x;
        pos_rect.y1 = e.clientY - image_rect.y;
    } else {
        pos_rect.x2 = e.clientX - image_rect.x;
        pos_rect.y2 = e.clientY - image_rect.y;
        xmin = Math.min(pos_rect.x1, pos_rect.x2);
        xmax = Math.max(pos_rect.x1, pos_rect.x2);
        ymin = Math.min(pos_rect.y1, pos_rect.y2);
        ymax = Math.max(pos_rect.y1, pos_rect.y2);
        pos_rect.x1 = xmin;
        pos_rect.x2 = xmax;
        pos_rect.y1 = ymin;
        pos_rect.y2 = ymax;
        // navigator.clipboard.writeText(JSON.stringify(pos_rect));
        pos_rect = {sound:"", link:""};

        (visualiser != null) && (visualiser.style.display = "none");
    }
    return true;
});

vis_mode = false;

document.addEventListener("keydown", function(e) {
    if (event.code == "Escape") {
        pos_rect = {sound:"", link:""};
        (visualiser != null) && (visualiser.style.display = "none");
    }
    if (event.code != "Digit1" || vis_mode) {
        return;
    }
    visualiser = document.createElement("div");
    visualiser.style.display = "none";
    document.body.appendChild(visualiser);
    vis_mode = true;

    document.addEventListener("mousemove", function(e) {
        if(pos_rect.x1 === undefined) {
            return;
        }
        var image_rect = image.getBoundingClientRect();
        visualiser.style = {};
        visualiser.style.display = "block";
        visualiser.style.backgroundColor = "rgb(0, 239, 232)";
        visualiser.style.position = "absolute";
        visualiser.style.opacity = "24%";
        visualiser.style.zIndex = 2;
        visualiser.style.width = e.clientX - (image_rect.x + pos_rect.x1) + "px";
        visualiser.style.height = e.clientY - (image_rect.y + pos_rect.y1) + "px";
        visualiser.style.left = image_rect.x + pos_rect.x1 + "px";
        visualiser.style.top = image_rect.y + pos_rect.y1 + "px";

    });

});
