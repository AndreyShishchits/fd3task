`use strict`;

class List {
    constructor() {
        this.list = {};
    }

    initList(numberOfRows) {
        const onDragOver = (event) => {
            event.preventDefault();
        };

        const onDragStart = (event) => {
            event.dataTransfer.setData("text", event.target.id);
        };

        const onDrop = (event) => {
            event.preventDefault();

            if (event.target.offsetHeight / 2 > event.pageY - event.target.offsetTop) {
                event.target.insertAdjacentElement("beforebegin", document.getElementById(event.dataTransfer.getData("text")));
            } else {
                console.log(`ololo`);
                event.target.insertAdjacentElement("afterend", document.getElementById(event.dataTransfer.getData("text")));
            }

        };

        let ul = document.createElement(`ul`);
        ul.className = `spisochek`;
        ul.innerHTML = `OloloTrololo9lVoditelbNlo`;

        for (let i = 1; i < numberOfRows + 1; i++) {
            let li = document.createElement(`li`);
            li.className = `lishka`;
            li.innerHTML = `${i}`;
            li.id = `${i}`;
            li.setAttribute('draggable', true);
            li.ondragover = onDragOver;
            li.ondragstart = onDragStart;
            li.ondrop = onDrop;
            ul.appendChild(li);
        }

        this.list = ul;
    }

    render() {
        document.body.appendChild(this.list);
    }
}

let spisochek = new List(/*5*/);
spisochek.initList(5);
spisochek.render();