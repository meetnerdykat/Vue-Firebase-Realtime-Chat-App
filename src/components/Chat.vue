<template>
  <div class="chat container"> 
    <div class="row">
    <div class="col s12 m12 l12">
      <div class="card">
        <div class="card-content center-align">
          <h2>Get Chatting</h2>
          <ul class="messages collection left-align" v-chat-scroll>
            <li v-for="message in messages" :key="message.id">
              <span class="blue-text">{{ message.name }}</span>
              <span class="light blue-text">{{ message.content }}</span>
              <span class="grey-text time">{{ message.timestamp }}</span>
            </li>
          </ul>
        </div>
        <div class="card-action">
          <NewMessage :name="name" />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage';
import db from '@/firebase/init';
import moment from 'moment';

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    NewMessage
  },
  data() {
    return {
      messages: []
    };
  },
  created() {
    let ref = db.collection('messages').orderBy('timestamp');

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll')
          });
        }
      });
    });
  }
};
</script>

<style>
.collection {
  border: none;
  font-size: 18px;
}
.chat .time {
  display: block;
  margin-bottom: 0.8em;
  font-size: 0.8em;
}

.messages {
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 5px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #ff80ab;
}
</style>
