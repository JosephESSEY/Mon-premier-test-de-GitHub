
import { AttributElement } from "../functions/dom.js";

export class TodoList{

    #todos = []
    #list
    constructor(todos){
        this.#todos = todos
    }

    appendTo(element){
        element.innerHTML=`
        <form class="d-flex pb-4">
        <input type="text" class="form-control" required placeholder="Ajouter des tâches" name ="title">
        <button class="btn btn-dark">Ajouter</button>
    </form>

    <article>
        <div class="btn-group mb-4 filter" role="group">

            <button type="button" class="btn btn-outline-info active" data-filter="all"><strong>Toutes</strong> les Tâches</button>

            <button type="button" class="btn btn-outline-info" data-filter="todo">Tâche(s) <strong>à Faire</strong></button>

            <button type="button" class="btn btn-outline-info" data-filter="done">Tâche(s) <strong>Terminée(s)</strong></button>
        </div>

        <ul class="list-group">
            
        </ul>
    
        </article>

        `

        this.#list = element.querySelector('.list-group')

        for (let todo of this.#todos){
            const tache = new TodoListItem(todo)
            tache.append_To(this.#list)
        }

        document.querySelector('form').addEventListener('submit', e => this.onSubmit(e))

        document.querySelectorAll('.btn-group button').forEach(button => {
            button.addEventListener('click', e=> this.activeToggle(e))
        });

        //Personnalisation

        this.#list.addEventListener('delete',({detail:todo})=>{
            this.#todos = this.#todos.filter(tache=> tache !== todo)
            this.onUpdate()
            //console.log(this.#todos)
        })

        this.#list.addEventListener('toggle',({detail:todo})=>{
            todo.completed = !todo.completed
            this.onUpdate()
            //console.log(this.#todos)
        })


        
    }

    onSubmit(e){
        e.preventDefault()

        const form = e.currentTarget
        const title = new FormData(form).get('title').toString().trim()

        if (title === ''){
            return
        }

        const todo={
            id:Date.now(),
            title:title,
            completed:false
        }
        const item = todo
        const list = new TodoListItem(item)
        list.prepend_To(this.#list)
        this.#todos.push(todo)
        this.onUpdate()

        form.reset()
    }

    activeToggle(e){
        e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        //console.log(filter)

        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')

        if(filter === 'done'){
            this.#list.classList.add('hide-todo')
            this.#list.classList.remove('hide-completed')
        }
        else if (filter==='todo'){
            this.#list.classList.remove('hide-todo')
            this.#list.classList.add('hide-completed')
        }else{
            this.#list.classList.remove('hide-todo')
            this.#list.classList.remove('hide-completed')
        }

    }

    onUpdate(){
        localStorage.setItem('todos',JSON.stringify(this.#todos))
    }

}


class TodoListItem{

    #element
    #todo

    constructor(todo){
        this.#todo= todo
        const id = `todo-${todo.id}`

        const li = AttributElement('li',{
            class:'todo list-group-item d-flex align-center'
        })

        this.#element = li

        const checkbox = AttributElement('input',{
            type:'checkbox',
            class:'form-check-input',
            id,
            checked : todo.completed?'':null
        })

        const label = AttributElement('label',{
            class:'ms-2 form-check-label',
            for:id
        })

        label.innerText = todo.title
        label.style.fontWeight ='bold'

        const button = AttributElement('button',{
            class:'ms-auto btn btn-danger btn-sm'
        })

        button.innerHTML='<i class="lni lni-trash-can"></i>'

        li.append(checkbox)
        li.append(label)
        li.append(button)
        this.toggle(checkbox)

        button.addEventListener('click', e => this.remove(e))

        checkbox.addEventListener('change', e => this.toggle(e.currentTarget))

        /*this.#element.addEventListener('delete',e=>{
            console.log(e)
        })*/

    }

    append_To(element){
        element.append(this.#element)
    }

    prepend_To(element){
        element.prepend(this.#element)
    }

    remove(e){
        e.preventDefault()

        //Evènement personnalisés!!!

        const event = new CustomEvent('delete',{
            detail:this.#todo,
            bubbles:true,
            cancelable:true
        })

        this.#element.dispatchEvent(event)

        if(event.defaultPrevented){
            return
        }

        this.#element.remove()

    }

    toggle(checkbox){
        if(checkbox.checked){
            this.#element.classList.add('is-completed')
            this.#element.classList.remove('is-not-completed')
        }else{
            this.#element.classList.remove('is-completed')
            this.#element.classList.add('is-not-completed')
        }
        const event = new CustomEvent('toggle',{
            detail:this.#todo,
            bubbles:true
        })
        this.#element.dispatchEvent(event)

    }
}