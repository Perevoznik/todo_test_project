import Vue from 'vue'
import App from './App.vue'
import router from './router';

export const globalData = {

  STORAGE_KEY: "notes-data",
  getAllNotes(){
    let allNotes = JSON.parse(localStorage.getItem(this.STORAGE_KEY));

    return allNotes ? allNotes : []; 
  },
  setNotesData(notesArr) {localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notesArr))},
}

export const historyProp = {

  KEY: "history-key",
  getAll(){return JSON.parse(localStorage.getItem(this.KEY))},

  add(note, position){

    let notes = this.getAll();

    if(!notes)
      notes = [];
    
    if(position == notes.length){
      notes.push(note);
    }
    else{
      notes[position] = note;
      notes.splice(position + 1, notes.length);
    }

    localStorage.setItem(this.KEY, JSON.stringify(notes));
  },

  undo(position){

    if(position > 0)
      return this.getAll()[position - 1];
  },

  repeat(position){
    
    if(this.getAll()[position + 1] != undefined){
      return this.getAll()[position + 1];
    }
  },

  getFirstElement(){
    return this.getAll()[0];
  }
}


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
