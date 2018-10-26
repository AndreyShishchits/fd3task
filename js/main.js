`use strict`;

class List {
    constructor() {
        this.list = {};
    }

    initList(numberOfRows) {
        const onDragOver = (event) => {
            if (event.target.getAttribute(`draggable`) === `false`) return;

            event.preventDefault();
        };

        const onDragStart = (event) => {
            if (event.target.getAttribute(`draggable`) === `false`) return;

            event.dataTransfer.setData("text", event.target.id);
        };

        const onDrop = (event) => {
            event.preventDefault();
            if (event.target.getAttribute(`draggable`) === `false`) return;

            if (event.target.offsetHeight / 2 > event.pageY - event.target.offsetTop) {
                event.target.insertAdjacentElement("beforebegin", document.getElementById(event.dataTransfer.getData("text")));
            } else {
                event.target.insertAdjacentElement("afterend", document.getElementById(event.dataTransfer.getData("text")));
            }
        };

        let ul = document.createElement(`ul`);
        ul.className = `list`;

        for (let i = 1; i < numberOfRows + 1; i++) {
            let li = document.createElement(`li`);
            li.className = `row`;
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

    setDraggable(flag) {
        this.list.childNodes.forEach(li => li.setAttribute(`draggable`, flag));
    }
}

class Toggle {
    constructor() {
        this.toggle = {};
    }

    initToggle() {
        let toggle = document.createElement(`label`);
        toggle.className = `switch`;

        let checkBox = document.createElement(`input`);
        checkBox.className = `checkbox`;
        checkBox.type = `checkbox`;
        toggle.appendChild(checkBox);

        let slider = document.createElement(`span`);
        slider.className = `slider`;
        toggle.appendChild(slider);

        this.toggle = toggle;
    }

    setOnClick(list) {
        let checkBox = this.toggle.getElementsByClassName(`checkbox`)[0];
        list.setDraggable(checkBox.checked);

        checkBox.onclick = (event) => {
            list.setDraggable(checkBox.checked);
        };
    }

    render() {
        document.body.appendChild(this.toggle);
    }


}

let spisochek = new List();
spisochek.initList(5);
spisochek.render();

let toggle = new Toggle();
toggle.initToggle();
toggle.render();
toggle.setOnClick(spisochek);