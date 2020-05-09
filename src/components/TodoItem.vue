<template>

<div :class="[{completed: todo.completed}, 'todo-card']">
    <span>
        <input type="checkbox" @change="addToHistoryMethod" v-model="todo.completed">
        <span v-if="!isEdit">{{todo.text}}</span>
        <input type="text" @change="addToHistoryMethod" v-else v-model="todo.text">
    </span>

    <div>
        <button class="btn btn-yellow btn-sm" v-if="!isEdit" @click="isEdit = true">Редактировать</button>
        <button class="btn btn-yellow btn-sm" v-else @click="isEdit = false">Сохранить</button>

        <button class="btn btn-gray btn-sm" @click="openConfirm = true">Удалить</button>
    </div>

    <confirm v-if="openConfirm" :description="confirmText" 
        @confirm-ok="$emit('remove-todo', todo.id)" @confirm-cancel="openConfirm = false"></confirm>
</div>

</template>

<script>

import ConfirmDialog from '../components/Dialog.vue';

export default {

    data(){
        return {
            openConfirm: false,
            confirmText: `Вы уверены, что хотите удалить "${this.todo.text.substr(0, 15)} ..." ?`,
            isEdit: false
        }
    },
    props: ['todo', 'addToHistoryMethod'],

    components: {
        'confirm': ConfirmDialog
    },
}

</script>

<style>

.todo-card{

    background-color: #f44336;
    color: white;
    box-shadow: 3px 4px 6px -5px black;
    padding: 20px;
    border-radius: 2px;
    width: 250px;
    word-wrap: break-word;
    transition: 0.2s;
    margin: 20px;
}

.completed{
    background-color: #4caf50;
}

.completed span{
    text-decoration: line-through;
}

</style>