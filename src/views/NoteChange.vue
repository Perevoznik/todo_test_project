<template>

    <div>
        <div class="title-block">
            <h2 class="note-title" v-if="!editNoteTitle">{{note.title}}</h2>

            <input type="text" @change="addToHistory" v-model="note.title" v-if="editNoteTitle">

            <a href="#" @click="editNoteTitle = !editNoteTitle">
                <i class="fa fa-pencil" v-if="!editNoteTitle"></i>    
                <i class="fa fa-save" v-if="editNoteTitle"></i>    
            </a>
        </div>

        <button class="btn btn-green" @click="addNewTodo"><i class="fa fa-plus"></i> Добавить задачу</button>
        <button class="btn btn-blue" @click="saveChanges"><i class="fa fa-save"></i> Сохранить изменения</button>
        
        <button class="btn btn-red" @click="openCancelConfirm = true"><i class="fa fa-ban"></i> Отменить</button>
        <span> | </span>
        <button class="btn btn-blue" @click="historyUndo"><i class="fa fa-undo"></i> Вернуть </button>
        <button class="btn btn-blue" @click="historyRepeat"><i class="fa fa-repeat"></i> Повторить</button>

        <div class="container">
            
            <p v-if="!note.todos.length" class="p-info">Список задач пуст</p>

            <todo-item v-else v-for="todo of note.todos" :addToHistoryMethod="addToHistory"
            :key="todo.id" :todo="todo" @remove-todo="removeTodo"></todo-item>

        </div>

        <confirm v-if="openCancelConfirm" @confirm-ok="cancelChanges"
            :description="confirmText" @confirm-cancel="openCancelConfirm = false"></confirm>
    </div>

</template>

<script>

import {globalData} from '../main';
import {historyProp} from '../main';
import TodoItem from '../components/TodoItem.vue';
import Todo from '../models/Todo.js';
import Note from '../models/Note.js';
import ConfirmDialog from '../components/Dialog.vue';

export default {

    data(){
        return {
            STORAGE_KEY: globalData.STORAGE_KEY,
            globalData,
            historyProp,
            historyPosition: 0,
            editNoteTitle: false,
            allNotes: globalData.getAllNotes(),
            note: {},
            openCancelConfirm: false,
            confirmText: `Отменить все изменения ?`,
        }
    },


    created(){

        let id = this.$route.params.id;

        if(id != 0){
            this.note = this.allNotes.find(note => note.id == id);
        }
        else{

            this.note = new Note(0, "Новая заметка");
        }

        this.historyProp.add(this.note, this.historyPosition);
    },


    components: {
        'todo-item': TodoItem,
        'confirm': ConfirmDialog
    },

    methods: {

        addNewTodo(){
            
            let newId = this.getMaxId(this.note.todos) + 1;
            this.note.todos.push(new Todo(newId, 'Новая задача'));

            this.addToHistory();
        },

        addToHistory(){

            this.historyPosition++;
            this.historyProp.add(this.note, this.historyPosition);
        },

        getMaxId(array){
            
            if(!array.length)
                return 0;

            let maxId = 0;
            array.map(obj => {

                if(obj.id > maxId)
                    maxId = obj.id;
            });

            return maxId;
        },

        removeTodo(id){

            let index = this.note.todos.findIndex(t => t.id == id);
            this.note.todos.splice(index, 1);
        },

        saveChanges(event){

            if(this.note.id != 0){
                let noteIndex = this.allNotes.findIndex(note => note.id == this.note.id);
                this.allNotes[noteIndex] = this.note;
            }
            else{

                this.note.id = this.getMaxId(this.allNotes) + 1;
                this.allNotes.push(this.note);
            }

            this.globalData.setNotesData(this.allNotes);


            // ***************
            let btnText = event.target.innerHTML;
            event.target.classList.remove('btn-blue');
            event.target.classList.add('btn-green');
            event.target.innerHTML = "Успешно сохранено";
            setTimeout(function(){
                event.target.classList.remove('btn-green');
                event.target.classList.add('btn-blue');
                event.target.innerHTML = btnText;

            }, 1500)
        },

        historyUndo(){

            let undoNote = this.historyProp.undo(this.historyPosition);

            if(undoNote){
                this.note = undoNote;
                this.historyPosition--;
            }
        },

        historyRepeat(){

            let repeatNote = this.historyProp.repeat(this.historyPosition);

            if(repeatNote){
                this.note = repeatNote;
                this.historyPosition++;
            }
        },

        cancelChanges(){

            this.note = this.historyProp.getFirstElement();
            this.$router.push('/');
        }
    },

}

</script>

<style>

.note-title{

    color: rgb(107, 107, 107);
    margin: 20px;
}

.title-block{
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-block a{
    font-size: 20px;
    color: rgb(65, 65, 255);
}

.title-block input{
    margin: 20px;
}


</style>