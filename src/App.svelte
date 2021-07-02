<script lang="ts">
    import {dueToday, Todo} from "./lib/Todo";

    import "./lib/index.css";
    import {element, loop_guard} from "svelte/internal";
    let name = JSON.parse(localStorage.getItem("name") ?? null)
    let todoJSON = JSON.parse(localStorage.getItem("todos"))
    let todos: Todo[] = [];
        todoJSON?.forEach(element => todos.push(element))
    const cols = 6

    let newTask;
    let newDue;

    let newName;

    const submitTodo = () => {
        todos = [...todos, new Todo(newTask ?? "Unnamed Task", new Date(newDue))]
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    const deleteTodo = (index) => {
        todos = todos.filter(todo => todo != todos[index])
        localStorage.setItem("todos", JSON.stringify(todos))
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
        <div class="card bg-indigo-500 text-indigo-100 shadow-xl">
            <h2 class="text-white">
                Welcome back{name != null ? `, ${name}` : ""}.
            </h2>
            <p>You have <b>{todos.length} {todos.length !== 1 ? "todos" : "todo"}</b>
                remaining{#if todos.length !== 0}, {todos.length === dueToday(todos) ? "All" : dueToday(todos)} of them are due today{:else}. 🎉{/if}</p>
        </div>
            <div class="card bg-indigo-200 shadow-xl flex flex-col gap-4">
                <label>
                    <span class="text-gray-700">What is your name?</span>
                    <input bind:value={newName} type="text" class="transition-all duration-100 ease-in-out mt-1 block w-full rounded-md bg-indigo-100 border-transparent hover:border-gray-200 focus:border-gray-500 focus:bg-white focus:ring-0">
                </label>
                <button on:click={() => submitName()} class="bg-indigo-500 text-white px-4 py-2 rounded-md">
                    Submit
                </button>
            </div>
            <div class="card bg-indigo-200 shadow-xl flex flex-col gap-4">
                <label>
                    <span class="text-gray-700">What is your new task?</span>
                    <input bind:value={newTask} type="text" class="transition-all duration-100 ease-in-out mt-1 block w-full rounded-md bg-indigo-100 border-transparent hover:border-gray-200 focus:border-gray-500 focus:bg-white focus:ring-0">
                </label>
                <label>
                    <span class="text-gray-700">When is it due?</span>
                    <input bind:value={newDue} type="date" class="transition-all duration-100 ease-in-out mt-1 block w-full rounded-md bg-indigo-100 border-transparent hover:border-gray-200 focus:border-gray-500 focus:bg-white focus:ring-0">
                </label>
                <button on:click={() => submitTodo()} class="bg-indigo-500 text-white px-4 py-2 rounded-md">
                    Add
                </button>
            </div>
            {/if}
        {#each todos as todo, index}
            {#if (index%cols) === col}
            <div class="flex gap-4 card shadow-md hover:shadow-xl {todo.dueToday() === true ? 'bg-indigo-100' : 'bg-white'}">
                <div class="flex gap-4 flex-col flex-1">
                    <p>{todo.task}
                    <p>
                        {todo.formatDate()}
                </div>


                <button class="my-auto rounded border-indigo-500 text-indigo-500 form-checkbox focus:ring-indigo-500" on:click={() => deleteTodo(index)}>delete</button>
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