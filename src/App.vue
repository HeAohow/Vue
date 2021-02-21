<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="你接下来要做什么?"
          v-model="newTodo"
          v-autofocus
          @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length">
        <ul class="todo-list">
          <li
            v-for="todo in todos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo.id == editedTodo.id }">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="editedTodo.title"
              v-autofocus
              v-if="todo.id == editedTodo.id"
              @blur="doneEdit(editedTodo)"
              @keyup.enter="doneEdit(editedTodo)"
              @keyup.esc="cancelEdit()"
            />
          </li>
          <!-- <li v-for="todo in todos" class="todo"
            :key="todo.id" :class="{completed: todo.completed}">
            <todo-item
              v-bind:title.sync="todo.title"
              v-bind:completed.sync="todo.completed"
              @delete="removeTodo(todo)"/>
          </li> -->
        </ul>
        <footer class="footer" v-show="todos.length">
          <span class="todo-count">
            <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
          </span>
          <button
            class="clear-completed"
            @click="removeCompleted"
            v-show="todos.length > remaining">
            clear completed
          </button>
        </footer>
      </section>
    </section>
  </div>
</template>

<script>
// import TodoItem from './components/TodoItem.vue'
let id = 1
export default {
  // components: { 'todo-item': TodoItem },

  data () {
    return {
      todos: [],
      newTodo: '',
      editedTodo: {}
    }
  },

  computed: {
    remaining () {
      return this.todos.filter(x => !x.completed).length
    }
  },

  filters: {
    pluralize (num) {
      return num > 1 ? 'items' : 'item'
    }
  },

  methods: {
    addTodo () {
      if (!this.newTodo) {
        return
      }
      this.todos.unshift({
        id: id++,
        title: this.newTodo,
        completed: false
      })
      // 添加成功后清空输入框
      this.newTodo = ''
    },

    editTodo (todo) {
      this.editedTodo = { ...todo }
    },

    doneEdit (todo) {
      this.todos = this.todos.map(x => {
        return todo.id === x.id ? { ...todo } : { ...x }
      })
      this.editedTodo = {}
    },

    cancelEdit () {
      this.editedTodo = {}
    },

    removeTodo (todo) {
      const index = this.todos.findIndex(x => x.id === todo.id)
      this.todos.splice(index, 1)
    },

    removeCompleted () {
      this.todos = this.todos.filter(x => !x.completed)
    }
  },

  directives: {
    autofocus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
<style>
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>
