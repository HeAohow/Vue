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
          @keyup.enter="addTodo()"/>
      </header>
      <section class="main" v-show="todos.length">
        <transition-group
          name="staggered-fade"
          tag="ul"
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          class="todo-list">
          <li
            v-for="todo in computedTodos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed }">
            <todo-item
              v-bind:title.sync="todo.title"
              v-bind:completed.sync="todo.completed"
              @delete="removeTodo(todo)"/>
          </li>
        </transition-group>
        <footer class="footer" v-show="todos.length">
          <span class="todo-count">
            <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
          </span>
          <ul class="filters">
            <li>
              <router-link :to="{query: {state: ''}}"
                active-class="selected" exact>
                All
              </router-link>
            </li>
            <li>
              <router-link :to="{query: {state: 'active'}}"
                active-class="selected" exact>
                Active
              </router-link>
            </li>
            <li>
              <router-link :to="{query: {state: 'completed'}}"
                active-class="selected" exact>
                Completed
              </router-link>
            </li>
          </ul>
          <button class="clear-completed"
            @click="removeCompleted" v-show="todos.length > remaining">
            Clear completed
          </button>
        </footer>
      </section>
    </section>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
import TodoItem from '../components/TodoItem.vue'
let id = 1
export default {
  components: { 'todo-item': TodoItem },

  data () {
    return {
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      newTodo: ''
    }
  },

  watch: {
    // 侦听todos的变化
    todos (newVal) {
      localStorage.setItem('todos', JSON.stringify(newVal))
    }
  },

  computed: {
    remaining () {
      return this.todos.filter(x => !x.completed).length
    },
    computedTodos () {
      const state = this.$route.query.state
      const filterTodos = this.todos.filter(x => {
        if (state === 'active') {
          return !x.completed
        } else if (state === 'completed') {
          return x.completed
        } else {
          return true
        }
      })
      return filterTodos.filter(item => {
        return (
          item.title.toLowerCase().indexOf(this.newTodo.toLowerCase()) !== -1
        )
      })

      // 根据内容去重，成功
      // const res = new Map()
      // return this.todos.filter(x => !res.has(x.title.toLowerCase()) && res.set(x.title.toLowerCase(), 1))
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

    removeTodo (todo) {
      const index = this.todos.findIndex(x => x.id === todo.id)
      this.todos.splice(index, 1)
    },

    removeCompleted () {
      this.todos = this.todos.filter(x => !x.completed)
    },
    // 动画效果实现
    beforeEnter (el) {
      el.style.opacity = 0
      el.style.height = 0
    },

    enter (el, done) {
      const delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(el, { opacity: 1, height: '58px' }, { completed: done })
      }, delay)
    },

    leave (el, done) {
      const delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(el, { opacity: 0, height: 0 }, { completed: done })
      }, delay)
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
  @import 'https://unpkg.com/todomvc-app-css@2.1.0/index.css';
  *, ::after, ::before {
    box-sizing: inherit;
}
</style>
