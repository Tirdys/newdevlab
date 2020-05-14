<template>
  <div id="app">
      <input id="channel" type="text" v-model="input">
      <button @click="_joinRoom()">Join</button>
      <button @click="_createRoom()">Creer un salon</button>
  </div>
</template>

<script>
  import io from 'socket.io-client';

  export default {
    name: 'select',
    data() {
      return {
        socket : io('localhost:3001')
      }
    },
    methods: {
      _joinRoom(){
      this.socket.emit("joinroom", "oui")
    }
      },
    mounted() {

    }


  }
</script>

<style>

</style>