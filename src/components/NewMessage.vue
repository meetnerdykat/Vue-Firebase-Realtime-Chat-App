<template>
  <div class="new-message">
    <form @submit.prevent="addMessage">
      <label for="new-message">New Message (enter to add)</label>
      <input type="text" name="new-message" v-model="newMessage">
      <p class="blue-text" v-if="feedback">{{ feedback }}</p>
    </form>
  </div>
</template>

<script>
// import things
import db from '@/firebase/init';

//register things
export default {
  name: 'NewMessage',
  props: ['name'],
  data() {
    return {
      newMessage: null,
      feedback: null
    };
  },
  methods: {
    addMessage() {
      //this function will send a name, a message from associated name, and a timestamp to the firebase database.
      if (this.newMessage) {
        db.collection('messages')
          .add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a message in order to send one';
      }
    }
  }
};
</script>