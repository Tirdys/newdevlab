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
            this.$router.push('/'+this.$route.params.id+'/TeamA');
    },
        joinRoomB(){
            this.$router.push('/'+this.$route.params.id+'/TeamB');
        },
        joinRoomSpectator(){
            this.$router.push('/'+this.$route.params.id+'/Spectator');
        }
      },
    mounted() {

    }


  }
</script>

<style>

</style>