<template>
  <div id="app">
    <input id="channel" type="text" v-model="input" />
    <button @click="_joinRoom()">Join</button>
      <p>{{errormes}}</p>
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
      mode:'',
        errormes:'',
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
      randomize = randomize.toString(8);
      this.socket.emit("createroom",randomize);
      this.$router.push('/'+randomize);
    },
  },
  mounted() {
    this.socket.on('room',(data)=>{
      this.$router.push('/'+data);
    }),
      this.socket.on('message',(data)=>{
          this.errormes = data.mes;
      })
  },
};
</script>

<style></style>
