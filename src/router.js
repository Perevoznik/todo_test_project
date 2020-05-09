import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NoteChange from './views/NoteChange.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/note-change/:id', component: NoteChange}
    ]
});