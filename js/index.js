function allowDrop(ev) {
  ev.preventDefault();
}

var data = undefined;

function drag(ev) {
  data = $(`#${ev.target.id}`).clone();
}

const frame = $("#output")[0].contentDocument;

function drop(ev) {
  ev.preventDefault();
  $(frame.body).append(data);
}

frame.body.designMode = 'on';
frame.body.ondragover = allowDrop;
frame.body.ondrop = drop;

var selected = undefined;

$(frame).dblclick(function (e) { 
  e.preventDefault();
  if (selected) return;
  selected = e.target;
  $(selected).toggleClass("csi");
});

$("#deselect").click(function (e) { 
  $(selected).toggleClass("csi");
  $(selected).attr("contentEditable","false");
  selected = undefined;
});

function add_class(name) {
  $(selected).toggleClass(`${name}`);
}

$("#delete").click(function (e) { 
  $(selected).remove();
  selected = undefined;
});

$("#edit").click(function (e) { 
  $(selected).attr("contentEditable","true");
});

$('#createTag').click(function (e) { 
  let tag = $('#tag').val();
  $(frame.body).append($(`<${tag}>${tag}</${tag}>`));
  $('#tag').val("")
});

$('#apply-attr').click(function (e) { 
  let attr = $('#attr').val();
  let val = $('#attr-value').val();
  $(selected).attr(attr, val);
  $('#attr,#attr-value').val("")
});

// function copied() {
//     document.querySelector('.toast').classList.toggle("active");
//     setTimeout(() => {
//         document.querySelector('.toast').classList.toggle("active");
//     }, 1000);
// }

// document.querySelector(`.bold`).onclick = () => {
//     document.querySelector('.preview .value').classList.toggle("bold");
// }

// document.querySelector(`.italic`).onclick = () => {
//     document.querySelector('.preview .value').classList.toggle("italic");
// }

// var textSize = 16;

// document.querySelector(`.plus`).onclick = () => {
//     textSize++;
//     document.querySelector('.preview .value').style.fontSize = `${textSize}px`;
// }

// document.querySelector(`.minus`).onclick = () => {
//     textSize--;
//     document.querySelector('.preview .value').style.fontSize = `${textSize}px`;
// }