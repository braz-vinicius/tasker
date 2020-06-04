<template>
  <v-data-table :headers="headers" :items="tasks" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Tasks</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Task</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row>
                    <v-text-field v-model="editedItem.name" :rules="[rules.required]" label="Name"></v-text-field>
                  </v-row>
                  <v-row>
                    <v-select
                      :items="taskCategories"
                      label="Category"
                      v-model="editedItem.category"
                      :rules="[rules.required]"
                    ></v-select>
                    <!-- <v-text-field v-model="editedItem.category" label="Category"></v-text-field> -->
                  </v-row>
                  <v-row>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="editedItem.duedate"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.duedate"
                          label="Due Date"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.duedate" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(editedItem.duedate)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-row>
                  <v-row>
                    <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "TaskGrid",
  data: () => ({
    taskCategories: ["Architecture", "Development", "Testing", "Delivery"],
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    dialog: false,
    valid: false,
    rules: {
      required: value => !!value || "Required."
    },
    headers: [
      { text: "Task", value: "name", align: "start", },
      { text: "Category", value: "category" },
      { text: "Description", value: "description" },
      { text: "Due Date", value: "duedate" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    tasks: [],
    editedIndex: -1,
    editedItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Task" : "Edit Task";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.tasks = this.$store.state.tasks;
    },

    editItem(item) {
      this.editedIndex = this.tasks.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tasks.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.tasks.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      var validated = this.$refs.form.validate();

      if (!validated) return;

      if (this.editedIndex > -1) {
        Object.assign(this.tasks[this.editedIndex], this.editedItem);
      } else {
        this.tasks.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>