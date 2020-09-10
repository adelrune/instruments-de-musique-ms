
var pos_rect = {};

document.addEventListener("click", function(e) {
    var image = e.target;
    image_rect = image.getBoundingClientRect();
    if (pos_rect.x1 === undefined) {
        pos_rect.x1 = e.clientX - image_rect.x;
        pos_rect.y1 = e.clientY - image_rect.y;
    } else {
        pos_rect.x2 = e.clientX - image_rect.x;
        pos_rect.y2 = e.clientY - image_rect.y;
        console.log(pos_rect);
        pos_rect = {};
    }
    return true;
});
