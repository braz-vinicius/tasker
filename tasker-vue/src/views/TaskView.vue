<template>
  <div class="taskView">
    <task-grid></task-grid>
  </div>
</template>

<script>
import TaskGrid from "@/components/TaskGrid.vue"

export default {
  name: 'TaskView',
  components: {
    TaskGrid
  },
  
  created() {
    this.$store.dispatch("loadTasks");
  },
}
</script>
