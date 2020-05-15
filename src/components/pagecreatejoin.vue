<template>
  <div id="app">
    <input id="channel" type="text" v-model="input" />
    <button @click="_joinRoom()">Join</button>
    <button @click="_createRoom()">
      créer un Salon
    </button>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "cj",
  data() {
    return {
      id: "",
      input: "",
      socket: io("localhost:3001"),
    };
  },
  methods: {
    _joinRoom() {
      this.socket.emit("joinroom", this.input);
    },

    _createRoom() {
      var randomize = Math.floor(Math.random() * 1000 + 1);
      this.socket.emit("createroom", randomize);
      this.$router.push('/'+randomize);
    },
  },
  mounted() {
    this.socket.on('room',(data)=>{
      this.$router.push('/'+data);
    })
  },
};
</script>

<style></style>
