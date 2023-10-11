
import { fetchLoader } from "./functions/api.js";
import { AttributElement } from "./functions/dom.js";
import { TodoList } from "./components/TodoList.js";


try {

    const todoInStorage = localStorage.getItem('todos')?.toString()

    //let todos = await fetchLoader('https://jsonplaceholder.typicode.com/todos?_limit=8')

    let todos =  []

    if(todoInStorage){
       todos = JSON.parse(todoInStorage)
    }


    const list = new TodoList(todos)
    list.appendTo(document.querySelector('#todolist'))


    
} catch (e) {
    
    const alert = AttributElement('div',{
        class:'alert alert-danger',
        role:'alert'
    })

    alert.innerText='Impossible de Charger les Tâches'
    document.querySelector('main').prepend(alert)

}