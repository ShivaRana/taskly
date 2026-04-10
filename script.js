let taskLists = [];

const handleOnSubmit = (e) => {
    // accessing FormData() 
    const newForm = new FormData(e);

    // getting data from FormData() 
    const task = newForm.get("task");
    const hr = newForm.get("hr");
    const taskObj = {
        task,
        hr,
        id: randomIdGenerator(),
        type: "entry"
    }

    taskLists.push(taskObj);
    displayEntryList();
}

const displayEntryList = () => {
    let str = "";
    // console.log(taskLists);
    const entryElm = document.getElementById("entryList");

    const entryList = taskLists.filter((list) => list.type === "entry");
    entryList.map((list, i) => {
        str += `<tr>
            <td>${i + 1}</td>
            <td>${list.task}</td>
            <td>${list.hr}</td>
            <td class="text-end">
                <button onclick="handleOnDelete('${list.id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                <button onclick="switchTask('${list.id}', 'bad')" class="btn btn-success"><i class="fa-solid fa-arrow-right"></i></button>
            </td>
        </tr>`;
    })

    entryElm.innerHTML = str;
};

const displayBadList = () => {
    let str = "";
    console.log(taskLists);
    const badElm = document.getElementById("badList");

    const badList = taskLists.filter((list) => list.type === "bad");
    badList.map((list, i) => {
        str += `<tr>
            <td>${i + 1}</td>
            <td>${list.task}</td>
            <td>${list.hr}</td>
            <td class="text-end">
            <button onclick="switchTask('${list.id}', 'entry')" class="btn btn-warning"><i class="fa-solid fa-arrow-left"></i></button>
            <button onclick="handleOnDelete('${list.id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;
    })

    badElm.innerHTML = str;
};

const randomIdGenerator = (length = 6) => {
    const str = "xuyfWpou985321sFCvhmbjdGwuqomczPa8561093wgrQpmnbgdxcuYshja856043";
    let id = "";

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * str.length);
        id += str[randomIndex];
    }
    return id;
}

const handleOnDelete = (id) => {
    if (window.confirm("Do you want to delete this list?")) {
        taskLists = taskLists.filter((list) => list.id !== id);
        displayEntryList();
        displayBadList();
    }
}

const switchTask = (id, type) => {
    taskLists = taskLists.map((list, i) => {
        if (list.id === id) {
            list.type = type
        }
        return list;
    })
    displayEntryList();
    displayBadList();
};