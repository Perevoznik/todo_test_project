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
        <router-link to="/" class="btn btn-red"><i class="fa fa-ban"></i> Отменить</router-link>
        <span> | </span>
        <button class="btn btn-blue" @click="cancelChanges"><i class="fa fa-undo"></i> Вернуть <em>(Ctrl + Z)</em> </button>
        <button class="btn btn-blue" @click="repeatAction"><i class="fa fa-repeat"></i> Повторить <em>(Ctrl + Y)</em></button>

        <div class="container">
            
            <p v-if="!note.todos.length" class="p-info">Список задач пуст</p>

            <todo-item v-else v-for="todo of note.todos" :addToHistoryMethod="addToHistory"
            :key="todo.id" :todo="todo" @remove-todo="removeTodo"></todo-item>

        </div>

        <p>{{historyPosition}}</p>
    </div>

</template>

<script>

import {globalData} from '../main';
import TodoItem from '../components/TodoItem.vue';
import Todo from '../models/Todo.js';
import Note from '../models/Note.js';

export default {

    data(){
        return {
            STORAGE_KEY: globalData.STORAGE_KEY,
            HISTORY_STORAGE_KEY: globalData.HISTORY_STORAGE_KEY,
            globalData,
            editNoteTitle: false,
            note: {},
            allNotes: globalData.getAllNotes(),
            // history: JSON.parse(localStorage.getItem(this.HISTORY_STORAGE_KEY)),
            historyPosition: -1
        }
    },

    computed: {

        getHistory(){
            return JSON.parse(localStorage.getItem(this.HISTORY_STORAGE_KEY));
        }
    },

    created(){
        this.globalData.clearHistory();

        let id = this.$route.params.id;

        if(id != 0){
            this.note = this.allNotes.find(note => note.id == id);
        }
        else{

            this.note = new Note(0, "Новая заметка");
        }

        this.addToHistory();
    },

    components: {
        'todo-item': TodoItem
    },

    methods: {

        addNewTodo(){
            
            let newId = this.getMaxId(this.note.todos) + 1;
            this.note.todos.push(new Todo(newId, 'Новая задача'));

            this.addToHistory();
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

            this.addToHistory();
        },

        saveChanges(){

            if(this.note.id != 0){
                let noteIndex = this.allNotes.findIndex(note => note.id == this.note.id);
                this.allNotes[noteIndex] = this.note;
            }
            else{

                this.note.id = this.getMaxId(this.allNotes) + 1;
                this.allNotes.push(this.note);
            }

            this.globalData.setNotesData(this.allNotes);
        },

        addToHistory(){
            console.log(this.getHistory);
            this.historyPosition++;
            this.globalData.addToHistory(this.note, this.historyPosition);
        },

        cancelChanges(){

            // if(this.historyPosition > 0){

                this.historyPosition -= 1;
                this.note = this.getHistory[this.historyPosition];
            // }
        },

        repeatAction(){
            
            console.log(this.getHistory);
            if(this.getHistory[this.historyPosition + 1] != undefined){

                this.historyPosition += 1;
                this.note = this.getHistory[this.historyPosition];
            }
        }

        // cancelChanges(){

        //     // if(this.historyPosition > 0){

        //         this.historyPosition -= 1;
        //         this.note = this.history[this.historyPosition];
        //     // }
        // },

        // repeatAction(){
            
        //     console.log(this.history);
        //     if(this.history[this.historyPosition + 1] != undefined){

        //         this.historyPosition += 1;
        //         this.note = this.history[this.historyPosition];
        //     }
        // }
    }
}

</script>

<style>

.note-title{

    color: rgb(107, 107, 107);
    margin-left: 15px;
}

.title-block{
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-block a{
    font-size: 20px;
    margin-left: 20px;
    color: rgb(65, 65, 255);
}


</style>