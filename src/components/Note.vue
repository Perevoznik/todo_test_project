<template>

    <div class="card">
        <h2>{{note.title}}</h2>
        <ul class="todo-list-item">
            <li v-for="todo in todos.slice(0, 3)" :key="todo">{{todo.text}}</li>

            <p class="p-info" v-if="todos.length > 3">. . .</p>
            <p class="p-info" v-if="!todos.length">Список задач пуст</p>
        </ul>

        <hr>

        <div class="btn-control-container">
            <div>
                <router-link :to="'/note-change/' + note.id" class="btn btn-blue btn-sm">Изменить</router-link>
                <button class="btn btn-red btn-sm" @click="openConfirm = true">Удалить</button>
            </div>
        </div>

        <confirm v-if="openConfirm" @confirm-ok="$emit('remove-note', note.id)"
         :description="confirmText" @confirm-cancel="openConfirm = false"></confirm>

    </div>

</template>

<script>

import ConfirmDialog from '../components/Dialog.vue';

    export default {

        data(){
            return {
                openConfirm: false,
                confirmText: `Вы уверены, что хотите удалить "${this.note.title}" ?`,
            }
        },

        props: ['note', 'todos'],

        components: {
            "confirm": ConfirmDialog
        }
    }

</script>

<style>

.btn-control-container{
    display: flex;
    align-items: center;
    justify-content: space-around;
}


</style>