<script lang="ts">
    import {dueToday, Todo} from "./lib/Todo";

    import "./lib/index.css";

    let name: string = null;
    let dates: Date[] = []
    let tasks: String[] = []
    let todos: Todo[] = []

    name = JSON.parse(localStorage.getItem("name")) ?? []
    dates = JSON.parse(localStorage.getItem("dates")) ?? []
    tasks = JSON.parse(localStorage.getItem("tasks")) ?? []

    for (let index = 0; index < tasks.length; index++) {
        todos.push(new Todo(tasks[index], new Date(dates[index])))
    }

    let settingsOpen: boolean = name == null

    const cols = 6

    let newTask;
    let newDue;

    let newName;

    const submitTodo = () => {
        todos = [...todos, new Todo(newTask ?? "Unnamed Task", new Date(newDue))]
        localStorage.setItem("dates", JSON.stringify(todos.map(todo => todo.due)))
        localStorage.setItem("tasks", JSON.stringify(todos.map(todo => todo.task)))
    }
    const deleteTodo = (index) => {
        todos = todos.filter(todo => todo != todos[index])
        localStorage.setItem("dates", JSON.stringify(todos.map(todo => todo.due)))
        localStorage.setItem("tasks", JSON.stringify(todos.map(todo => todo.task)))
    }
    const submitName = () => {
        name = newName
        localStorage.setItem("name", JSON.stringify(name))
    }

</script>

<main class="flex p-4 gap-4 w-screen">
    {#each Array(cols) as _, col }
        <div class="flex-1 flex flex-col gap-4">
            {#if col === 0}
                <div class="card bg-indigo-500 text-indigo-100 shadow-xl flex flex-col gap-4">
                    <div>
                        <div class="flex">
                            <h2 class="text-white flex-1">
                                Welcome back{name != null ? `, ${name}` : ""}.
                            </h2>
                            <svg on:click={() => settingsOpen = !settingsOpen} xmlns="http://www.w3.org/2000/svg"
                                 width="16" height="16" fill="currentColor" class="bi bi-gear my-auto"
                                 viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </div>
                        <p>You have <b>{todos.length} {todos.length !== 1 ? "todos" : "todo"}</b>
                            remaining
                            {#if todos.length !== 0}, {todos.length === dueToday(todos) ? "All" : dueToday(todos)} of
                                them
                                are due today (or before).
                            {:else}. 🎉
                            {/if}
                        </p>
                    </div>
                    <div on:click={() => window.open("https://github.com/hiluw/to-doot-list", '_blank').focus()}
                         class="cursor-pointer flex gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-github"
                             viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        <span class="my-auto">See the source.</span></div>
                </div>
                {#if settingsOpen}
                    <div class="card bg-indigo-200 shadow-xl flex flex-col gap-4">
                        <label>
                            <span class="text-gray-700">What is your name?</span>
                            <input bind:value={newName} type="text" on:keyup={(event) => {
                                if (event.keyCode === 13) {submitName()}
                            }}
                                   class="transition-all duration-100 ease-in-out mt-1 block w-full rounded-md bg-indigo-100 border-transparent hover:border-gray-200 focus:border-gray-500 focus:bg-white focus:ring-0">
                        </label>
                        <button on:click={() => submitName()} class="bg-indigo-500 text-white px-4 py-2 rounded-md">
                            Submit
                        </button>
                    </div>
                {/if}
                <div class="card bg-indigo-200 shadow-xl flex flex-col gap-4">
                    <label>
                        <span class="text-gray-700">What is your new task?</span>
                        <input bind:value={newTask} type="text"
                               class="transition-all duration-100 ease-in-out mt-1 block w-full rounded-md bg-indigo-100 border-transparent hover:border-gray-200 focus:border-gray-500 focus:bg-white focus:ring-0">
                    </label>
                    <label>
                        <span class="text-gray-700">When is it due?</span>
                        <input bind:value={newDue} type="date"
                               on:keyup={(event) => {if (event.keyCode === 13) {submitTodo()}}}
                               class="transition-all duration-100 ease-in-out mt-1 block w-full rounded-md bg-indigo-100 border-transparent hover:border-gray-200 focus:border-gray-500 focus:bg-white focus:ring-0">
                    </label>
                    <button on:click={() => submitTodo()} class="bg-indigo-500 text-white px-4 py-2 rounded-md">
                        Add
                    </button>
                </div>
            {/if}
            {#each todos as todo, index}
                {#if (index % cols) === col}
                    <div class="flex gap-4 card shadow-md hover:shadow-xl {todo.dueToday() === true ? 'bg-indigo-100' : 'bg-white'}">
                        <div class="flex gap-4 flex-col flex-1">
                            <p>{todo.task}
                            <p>
                                {todo.formatDate()}
                        </div>


                        <button class="my-auto rounded border-indigo-500 text-indigo-500 form-checkbox focus:ring-indigo-500"
                                on:click={() => deleteTodo(index)}>delete
                        </button>
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
</main>

<style>
    :root {
        @apply bg-gray-100;
    }

    .card {
        @apply px-6 py-4 rounded-lg transition-all duration-100 ease-in-out;
    }
</style>