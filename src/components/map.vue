<template>
    <div class="card">
        <div v-if="choice=='pick'">
            <div style="border: black;background-color: green" width="20px" height="20px">
                <p>pick</p>
            </div>
        </div>
        <div v-if="choice=='ban'">
            <div style="border: black;background-color: red" width="20px" height="20px">
                <p>ban</p>
            </div>
        </div>
        <div v-if="choice=='neutral'">
            <div style="border: black;background-color: white" width="20px" height="20px">
                <p>none</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "map",
        props: {
            choice:String
        }
    }
</script>

<style scoped>

</style>