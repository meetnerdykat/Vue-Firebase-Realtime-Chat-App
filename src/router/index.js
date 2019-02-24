import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Chat from '@/components/Chat';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      // accept props as parameters when user is redirected into // this route. I can achieve this by doing the following:
      props: true,
      // add a route gaurd
      beforeEnter: (to, from, next) => {
        if (to.params.name) {
          next();
        } else {
          next({ name: 'Welcome' });
        }
      }
    }
  ]
});
