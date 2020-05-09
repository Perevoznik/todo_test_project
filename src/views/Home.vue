<template>
    <div>
        <router-link to="/note-change/0" class="btn btn-blue"> + Перейти к созданию новой заметки</router-link>

        <div class="container">

            <app-note v-for="note of notes" :key="note.id"
                :note="note" :todos="note.todos" @remove-note="removeNote"></app-note>

            <p class="p-info" v-if="!notes.length">Заметок нету</p>

        </div>

    </div>
</template>

<script>
import NoteComponent from '../components/Note.vue';
import ConfirmDialog from '../components/Dialog.vue';
import {globalData} from '../main';

export default {
  
  data () {
    return {
      
      globalData,
      notes: globalData.getAllNotes(),
      confirm: false
    }
  },

  components: {

    "app-note": NoteComponent,
    "confirm": ConfirmDialog
  },

  methods: {

    removeNote(id){

        this.notes.splice(this.notes.findIndex(note => note.id === id), 1);
        globalData.setNotesData(this.notes);
    },
  },

}
</script>