import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    SAVE_TASKS(state, tasks) {
      state.tasks = tasks
    }
  },
  getters: {
    getTaskByCategory: (state) => (nome) => {
      return state.tasks.find(task => task.category === nome)
    },
  },
  actions: {
    loadTasks({ commit }) {
      this.defaultTasks = [
        {
          name: "Design solution architecture",
          category: "Architecture",
          description: "Create component diagrams",
          duedate: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Implement user stories",
          category: "Development",
          description: "Implement US 1",
          duedate: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Code Review",
          category: "Development",
          description: "Verify pull request #2323",
          duedate: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Create unit tests",
          category: "Testing",
          description: "Unit tests must have at least 70% code coverage",
          duedate: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Create integration tests",
          category: "Testing",
          description: "Integration tests must have at least 90% code coverage",
          duedate: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Deploy solution in Production",
          category: "Delivery",
          description: "Must create automated release pipeline",
          duedate: new Date().toISOString().substr(0, 10),
        },
        {
          name: "Deploy solution in Staging",
          category: "Delivery",
          description: "Must create automated release pipeline",
          duedate: new Date().toISOString().substr(0, 10),
        }
      ];
        commit('SAVE_TASKS', this.defaultTasks)
    },
  },
  modules: {
  }
})
