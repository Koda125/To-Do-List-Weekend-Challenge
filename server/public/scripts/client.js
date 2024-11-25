

console.log('JS is sourced!');
onReady()

function onReady() {
    console.log('Welcome to my to do list!')
    // Axios to pull data from DB
    axios({
        method: 'GET',
        url: '/todos'
    })
    .then((response) => {
        console.log('getting our list!')
        //render function will initiate here:
        renderToDos(response.data)
        // .catch((error) => {
        //     console.log('There has been an error, please send this to the FBI for further analysis')
        //     app.sendStatus(500)
        // })
    })
    

}


function renderToDos(toDoList) {
    console.log('Where is my tasks at?')
 //Variable attached to the table body in HTML:
    let addToTable = document.getElementById("toDos")
    //Clear preexisting data before re sending the database data.
    addToTable.innerHTML = ''
    // New inputs to get sent into HTML
    
    for (let toDo of toDoList){
        let btnClass = "bg-red"
        if(toDo.isComplete === 'true'){
            btnClass = "bg-green"
        }
    addToTable.innerHTML += `
    <tr data-testid="toDoItem">
        <td>${toDo.text}</td>
        <td>
        <button data-testid="completeButton" id="buttonColor" class="${btnClass}" onClick="toggleComplete(event, ${toDo.id})">
        ${toDo.isComplete}
        </button></td>
        <td><button data-testid="deleteButton" onClick="deleteToDo(${toDo.id})">Delete</button></td>
    </tr>
    `
    }
}
    function addToDo( event ) {
        console.log('Time to add to my list!')
    //    let nextToDo = document.getElementById('addInput').value
    //    console.log(nextToDo)
        let newToDo = {
            text: document.getElementById('addInput').value,
            isComplete: 'False'
        }
        console.log(`Whats the new To Do?`, newToDo)

        axios({
            method: 'POST',
            url: '/todos',
            data: newToDo
        })
        .then((response) => {
            console.log('POST new To Do', newToDo)
            onReady()
        })
        .catch((error) =>{
            console.log('Error has occured', error)
            // alert('Warning, crital meltdown near. Please refer to your end of times handbook under your desk.')
            app.sendStatus(500)
        })
    }

    //Delete Function:
    function deleteToDo(toDoText) {
        console.log('In delete function')
        const confirmDelete = confirm(`Is this done?`)
        if (confirmDelete) {
            const toDo = { id: toDoText}
        axios({
            method: "DELETE",
            url: '/todos',
            data: toDo
        })
        .then((response) => {
            console.log('Deleting to Do', response.data)
            onReady()
        })
        .catch((error) =>{
            console.log('AN error has occured in deletion ', error)
            app.sendStatus(500)
        })
        }

    }

    function toggleComplete(event, toDoId){
        console.log('Using the togggleComplete function')
        
        const button = event.target
        let toDoComplete;
        if (button.innerText === 'true') {
            button.innerText = 'false'
            button.setAttribute("class", "bg-red")
            toDoComplete = false
            
        } else {
            button.innerText = 'true'
            button.setAttribute("class", "bg-green")
            toDoComplete = true
            
        }
        const newToDoList = { id: toDoId, isComplete: toDoComplete}
        console.log('Object to send: ', newToDoList)
        axios({
            method: "PUT",
            url: '/todos',
            data: newToDoList
        })
        .then((response) => {
            console.log('/todos update request recieved', response.data)
            onReady()
        })
        .catch((error) => {
            console.log('error on the PUT request', error)
            alert(error)
        })
    }

   