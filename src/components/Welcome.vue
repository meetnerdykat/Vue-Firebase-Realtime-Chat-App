<template>
  <div class="welcome container">
    <div class="row">
    <div class="col s12 m12 l12">
      <div class="card">
        <div class="card-content center-align">
          <span class="card-title">Welcome</span>
          <form @submit.prevent="enterChat">
            <label for="name">Enter your name</label>
            <input type="text" name="name" v-model="name">
            <p v-if="feedback" class="blue-text">{{ feedback }}</p>
            <button class="btn pink accent-1">Enter Chat</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      name: null,
      feedback: null
    };
  },
  methods: {
    enterChat() {
      if (this.name) {
        this.$router.push({ name: 'Chat', params: { name: this.name } });
      } else {
        this.feedback = 'You must enter a name to join';
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container {
  max-width: 600px;
  margin-top: 100px;
}
.card-content {
  color: #ff80ab;
}
.pink {
  margin-top: 20px;
}
</style>
