<template>
    <div id="app">
        <div class="container" style="margin-top: 20px;">
            <p>time: {{time}}</p>
            <p>turn : {{nbturn}}</p>
            <div class="row">
                <div class="col-4">
                    <div class="row"  >
                        <div class="col-3" v-for="item in picksA" v-bind:key="item.id">
                            <Carte :id="item.id" choice="pick"></Carte>
                        </div>
                    </div>
                </div>
                <div class="col-4" style="border-color: black">
                    <div class="text-center">
                        <div v-if="player == 0"><h2>Joueur 1</h2></div>
                        <div v-if="player == 1"><h2>Joueur 2</h2></div>
                        <div v-if="porb == false"><h2>pick</h2></div>
                        <div v-if="porb == true"><h2>ban</h2></div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row"  >
                        <div class="col-3" v-for="item in picksB" v-bind:key="item.id">
                            <Carte :id="item.id" choice="pick"></Carte>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" >
                <div class="col-lg-4" v-for="item in maps" v-bind:key="item.id">
                    <div v-if="readyB==false || readyA ==false ">
                        <Carte :id="item.id" choice="neutral"></Carte>
                    </div>
                    <div v-if="selection !== item.id && picks.includes(item.id) == false && bans.includes(item.id) == false && readyB==true && readyA== true">
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
                mode:'',
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
                this.socket.emit('readyA',{ready: this.readyA,id: this.$route.params.id});
                if(this.readyB== true && this.readyA== true){
                    this.timer = setInterval( () => {
                        if (this.time > 0) {
                            this.time--;
                        } else {
                            this.time=30;
                            this.nbturn++;
                            this.socket.emit('nbturn',{nbturn:this.nbturn,id: this.$route.params.id});
                            if(this.player == 0 ){
                                this.player ++;
                                this.socket.emit('changeplayer',{player:this.player,id: this.$route.params.id})
                            }else{
                                this.player--;
                                this.socket.emit('changeplayer',{player:this.player,id: this.$route.params.id})
                            }
                            if(this.nbturn ==11){
                                this.porb=true
                            }else if(this.nbturn == 17){
                                this.time=0;
                                clearInterval(this.timer);
                            }
                        }
                        this.socket.emit('timer',{time:this.time,id: this.$route.params.id});
                    }, 1000 )
                }
            },
            putinselection(id){
                this.selection= id
            },
            putinlist () {
                if(this.porb==false && this.selection!== null && this.picks.includes(this.selection) == false){
                    this.socket.emit('pickid',{id:this.selection,idr: this.$route.params.id,player:this.player});
                    this.selection = null;
                    this.time=30;
                    this.nbturn++;
                    this.socket.emit('nbturn',{nbturn:this.nbturn,id: this.$route.params.id});
                    if(this.player == 0 ){
                        this.player ++;
                        this.socket.emit('changeplayer',{player:this.player,id: this.$route.params.id})
                    }else{
                        this.player--;
                        this.socket.emit('changeplayer',{player:this.player,id: this.$route.params.id})
                    }

                }else if(this.porb==true && this.selection!== null && this.bans.includes(this.selection) == false){
                    this.socket.emit('banid',{id:this.selection,idr: this.$route.params.id,player:this.player});
                    this.selection = null;
                    this.time=30;
                    this.nbturn++;
                    this.socket.emit('nbturn',{nbturn:this.nbturn,id: this.$route.params.id});
                    if(this.player == 0 ){
                        this.player ++;
                        this.socket.emit('changeplayer',{player:this.player,id: this.$route.params.id})
                    }else{
                        this.player--;
                        this.socket.emit('changeplayer',{player:this.player,id: this.$route.params.id})
                    }
                }
            }
        },
        mounted() {
            this.socket.on('player', (data) => {
                if(data.id == this.$route.params.id ) {
                    this.player = data.player;
                }
            });
            this.socket.on('turn', (data) => {
                if(data.id == this.$route.params.id ) {
                    this.nbturn = data.nbturn;
                }
            });
            this.socket.on('time', (data) => {
                if(data.id == this.$route.params.id ){
                    this.time=data.time;
                }
            });
            this.socket.on('pid', (data) => {
                if(data.idr == this.$route.params.id ) {
                    this.picks.push(data.id);
                    let map = this.maps.find(element=>element.id == data.id);
                    console.log(data.player);
                    if (data.player == 0) {
                        this.picksA.push(map);
                    } else if (data.player == 1) {
                        this.picksB.push(map);
                    }
                }
            });
            this.socket.on('bid', (data) => {
                if(data.idr == this.$route.params.id ) {
                    this.bans.push(data.id);
                    if(data.player==0){
                        this.bansA.push(data.id)
                    }
                    else if(data.player==1){
                        this.bansB.push(data.id)
                    }
                }
            });
            this.socket.on('readB', (data) => {
                if(data.id == this.$route.params.id ){
                    this.readyB=data.ready;
                }
            });
        }
    }
</script>

<style>

</style>