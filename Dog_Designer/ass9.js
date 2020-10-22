class dog {
    constructor(name, color, size, direction) {
        this.name = name;
        this.color = color;
        if (size == "small" || size == "medium" || size == "large") {
            this.size = size;
        }
        if (direction == "up" || direction == "down" || direction == "left" || direction == "right") {
            this.direction = direction;
        }

    }

    // o	based on the properties of the object returns string, which draws a dog
    // 	inside an SVG container
    // 	at location x and y
    render(x, y) {
        let angle = '0 500 500';
        if (this.direction == 'up') {
            angle = '90 500 500';
        } else if (this.direction == 'down') {
            angle = '-90 500 500';
        } else if (this.direction == 'left') {
            angle = '180 500 500';
        }
        if (this.size == 'small') return `<use id="${this.name}" xlink:href="#wh" transform="translate(${x}, ${y}) scale(0.019, -0.019) rotate(${angle})"  fill="${this.color}" stroke="none" />`;
        if (this.size == 'medium') return `<use id="${this.name}" xlink:href="#wh" transform="translate(${x}, ${y}) scale(0.029,-0.029) rotate(${angle})"  fill="${this.color}" stroke="none" />`;
        if (this.size == 'large') return `<use id="${this.name}" xlink:href="#wh"  transform="translate(${x}, ${y}) scale(0.04,-0.04) rotate(${angle})" fill="${this.color}" stroke="none"/>`;
    }

    description() {
        return `Name: ${this.name}, Color: ${this.color}, Size: ${this.size}, Direction: ${this.direction}`;
    }
}
let newdog = [];

function add() {
    let name = document.querySelector("#names").value;
    let color = document.querySelector("#colors").value;
    let size = document.querySelector("#sizes").value;
    let direction = document.querySelector("#directions").value;
    newdog.push(new dog(name, color, size, direction));

    showDogList();
}
let dogList = document.querySelector("#dogList");

function showDogList() {
    dogList.innerHTML = '';
    newdog.forEach(element => {
        dogList.innerHTML += `<li>${element.name} <button>X</button></li>`;
    });
}



dogList.addEventListener("click", handleList, false);

function handleList(e) {
    // console.log(e.target);
    if (e.target.localName == "li") {
        newdog.forEach(element => {
            if (element.name.trim() == e.target.childNodes[0].nodeValue.trim()) {
                console.log(`rendered`);
                let img = document.querySelector("#dogsvg");
                img.innerHTML = element.render(500, 500);
            }
        });

    }
    if (e.target.localName == "button") {
        // delete the element
        var toDeleteIndex = -1;
        newdog.forEach(element => {
            // console.log(`${element.name} == ${e.target.parentNode.childNodes[0].nodeValue}`);
            // console.log(element.name == e.target.parentNode.childNodes[0].nodeValue);
            // console.log(element.name.trim() == e.target.parentNode.childNodes[0].nodeValue.trim());

            if (element.name.trim() == e.target.parentNode.childNodes[0].nodeValue.trim()) {
                // pop the current element
                toDeleteIndex = newdog.indexOf(element);
            }
        });
        if (toDeleteIndex > -1) {
            newdog.splice(toDeleteIndex, 1);
        }
        let img = document.querySelector("#dogsvg");
        img.innerHTML = '';
        showDogList();
    }
}