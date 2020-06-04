<template>
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
                <v-text-field v-model="editedItem.duedate" label="Due Date" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="editedItem.duedate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(editedItem.duedate)">OK</v-btn>
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
</template>