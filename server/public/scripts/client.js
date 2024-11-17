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
    </tr>
    `
    }