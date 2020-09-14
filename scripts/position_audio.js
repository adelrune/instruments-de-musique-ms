image = document.getElementById("img");


image.addEventListener("mousemove", function(e) {
    var image_rect = image.getBoundingClientRect();
    var rects = links.concat(sounds);
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

image.addEventListener("click", function(e) {
    var image_rect = image.getBoundingClientRect();
    var x = e.clientX - image_rect.x;
    var y = e.clientY - image_rect.y;

    for (var i = 0; i < links.length; i++) {
        if (x >= links[i].x1 && x <= links[i].x2 && y >= links[i].y1 && y <= links[i].y2 ) {
            window.location.href = links[i].link + ".html";
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
});
