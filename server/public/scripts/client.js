

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
    for (let toDo of toDoList)
    addToTable.innerHTML += `
    <tr>
        <td>${toDo.text}</td>
        <td>${toDo.isComplete}</td>
        <td><button onClick="deleteToDo(${toDo.id})">Delete</button></td>
    </tr>
    `
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