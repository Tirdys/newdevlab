<template>
    <div id="app">
        <div class="container" style="margin-top: 20px;">
            <p>time: {{time}}</p>
            <p>turn : {{nbturn}}</p>
            <div class="text-center">
                <h1>Spectateur</h1>
                <div v-if="player == 0"><h2>Joueur 1</h2></div>
                <div v-if="player == 1"><h2>Joueur 2</h2></div>
                <div v-if="porb == false"><h2>pick</h2></div>
                <div v-if="porb == true"><h2>ban</h2></div>
            </div>
            <div class="row" >
                <div class="col-lg-4" v-for="item in maps" v-bind:key="item.id">
                    <div v-if="readyA==false || readyB==false ">
                        <Carte :id="item.id" choice="neutral"></Carte>
                    </div>
                    <div v-if="selection !== item.id && picks.includes(item.id) == false && bans.includes(item.id) == false && readyA==true && readyB==true">
                        <div v-if="player==0">
                            <Carte :id="item.id" choice="neutral" v-on:click.native="putinselection(item.id)"></Carte>
                        </div>
                        <div v-if="player==1">
                            <Carte :id="item.id" choice="neutral"></Carte>
                        </div>
                    </div>
                    <div v-if="selection == item.id && porb==false || picks.includes(item.id) == true">
                        <Carte :id="item.id" choice="pick"></Carte>
                    </div>
                    <div v-if="selection == item.id && porb==true || bans.includes(item.id) == true">
                        <Carte :id="item.id" choice="ban"></Carte>
                    </div>
                </div>
            </div>
            <button v-on:click="start()">ready</button>
            <button v-on:click="putinlist()">select</button>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import Carte from './map';

    export default {
        name: 'picknbanA',
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
        methods: {
            start () {
                this.readyA=true;
                this.socket.emit('readyA',{ready: this.readyA});
                this.timer = setInterval( () => {
                    if (this.time > 0) {
                        this.time--;
                    } else {
                        this.time=30;
                        this.nbturn++;
                        this.socket.emit('nbturn',{nbturn:this.nbturn});
                        console.log(this.nbturn);
                        if(this.player == 0 ){
                            this.player ++;
                            this.socket.emit('changeplayer',{player:this.player})
                        }else{
                            this.player--;
                            this.socket.emit('changeplayer',{player:this.player})
                        }
                        if(this.nbturn == 5){
                            this.porb=true
                        }else if(this.nbturn == 11){
                            this.time=0;
                            clearInterval(this.timer);
                        }
                    }
                    this.socket.emit('timer',{time:this.time});
                }, 1000 )
            },
            putinselection(id){
                console.log('click');
                this.selection= id
            },
            putinlist () {
                console.log('click');
                if(this.porb==false && this.selection!== null && this.picks.includes(this.selection) == false){
                    this.socket.emit('pickid',{id:this.selection});
                    this.selection = null;
                    this.time=30;
                    this.nbturn++;
                    this.socket.emit('nbturn',{nbturn:this.nbturn});
                    if(this.player == 0 ){
                        this.player ++;
                        this.socket.emit('changeplayer',{player:this.player})
                    }else{
                        this.player--;
                        this.socket.emit('changeplayer',{player:this.player})
                    }

                }else if(this.porb==true && this.selection!== null && this.bans.includes(this.selection) == false){
                    this.socket.emit('banid',{id:this.selection});
                    this.selection = null;
                    this.time=30;
                    this.nbturn++;
                    this.socket.emit('nbturn',{nbturn:this.nbturn});
                    if(this.player == 0 ){
                        this.player ++;
                        this.socket.emit('changeplayer',{player:this.player})
                    }else{
                        this.player--;
                        this.socket.emit('changeplayer',{player:this.player})
                    }
                }
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
            this.socket.on('readB', (data) => {
                this.readyB=data.ready;
            });
        }


    }
</script>

<style>

</style>