<template>
  <div id="selection">
      <button @click="_joinRoomA()">Team A</button>
      <button @click="joinRoomB()">Team B</button>
      <button @click="joinRoomSpectator()">Spectateur</button>
  </div>
</template>

<script>
  import io from 'socket.io-client';

  export default {
    name: 'selection',
    data() {
      return {
        socket : io('localhost:3001')
      }
    },
    methods: {
        _joinRoomA(){
            this.socket.emit("joinroomA",this.$route.params.id);
            this.$router.push('/'+this.$route.params.id+'/TeamA');
    },
        joinRoomB(){
            this.socket.emit("joinroomB",this.$route.params.id);
            this.$router.push('/'+this.$route.params.id+'/TeamA');
        },
        joinRoomSpectator(){
            this.socket.emit("joinroomSpectator",this.$route.params.id);
            this.$router.push('/'+this.$route.params.id+'/TeamA');
        }
      },
    mounted() {

    }


  }
</script>

<style>

</style>