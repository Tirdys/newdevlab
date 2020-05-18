<template>
    <div id="app">
        <div class="container" style="margin-top: 20px;">
            <p>time: {{time}}</p>
            <p>turn : {{nbturn}}</p>
            <div class="row">
                <div class="col-4" style="border-color: black">
                    <div class="row" v-for="item in picksA" v-bind:key="item">
                        <carte :id="item.id" choice="picks"></carte>
                    </div>
                </div>
                <div class="col-4" style="border-color: black">
                    <div class="text-center">
                        <div v-if="player == 0"><h2>Joueur 1</h2></div>
                        <div v-if="player == 1"><h2>Joueur 2</h2></div>
                        <div v-if="porb == true"><h2>pick</h2></div>
                        <div v-if="porb == false"><h2>ban</h2></div>
                    </div>
                </div>
                <div class="col-4" style="border-color: black">
                    <div class="row" v-for="item in picksA" v-bind:key="item">
                        <carte :id="item.id" choice="picks"></carte>
                    </div>
                </div>
            </div>
            <div class="row" >
                <div class="col-lg-4" v-for="item in maps" v-bind:key="item.id">
                    <div v-if="readyA==false || readyB==false">
                        <Carte :id="item.id" choice="neutral"></Carte>
                    </div>
                    <div v-if="selection !== item.id && picks.includes(item.id) == false && bans.includes(item.id) == false && readyA==true && readyB==true">
                        <Carte :id="item.id" choice="neutral"></Carte>
                    </div>
                    <div v-if="selection == item.id && porb==false || picks.includes(item.id) == true">
                        <Carte :id="item.id" choice="pick"></Carte>
                    </div>
                    <div v-if="selection == item.id && porb==true || bans.includes(item.id) == true">
                        <Carte :id="item.id" choice="ban"></Carte>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import Carte from './map';

    export default {
        name: 'picknbanS',
        components: {
            Carte
        },
        data() {
            return {
                maps:[
                    {id:1,img:'',name:''},
                    {id:2,img:'',name:''},
                    {id:3,img:'',name:''},
                ],
                selection:null,
                picks:[],
                bans:[],
                picksA:[],
                picksB:[],
                bansA:[],
                bansB:[],
                time:30,
                readyA:false,
                readyB:false,
                player:0,
                porb:false,
                nbturn:1,
                socket : io('localhost:3001')
            }
        },
        mounted() {
            this.socket.on('pid', (data) => {
                this.picks.push(data.id);
                if(this.player==0){
                    this.picksA.push(data.id)
                }
                else if(this.player==0){
                    this.picksB.push(data.id)
                }
            });
            this.socket.on('bid', (data) => {
                this.bans.push(data.id);
                if(this.player==0){
                    this.bansA.push(data.id)
                }
                else if(this.player==0){
                    this.bansB.push(data.id)
                }
            });
            this.socket.on('player', (data) => {
                this.player=data.player
            });
            this.socket.on('turn', (data) => {
                this.nbturn=data.nbturn;
            });
            this.socket.on('time', (data) => {
                this.time=data.time;
            });
            this.socket.on('readA', (data) => {
                this.readyA=data.ready;
            });
            this.socket.on('readB', (data) => {
                this.readyB=data.ready;
            });
        }


    }
</script>

<style>

</style>