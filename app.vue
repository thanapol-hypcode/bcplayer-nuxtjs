<template>
  <div class="mt-5 md:col-span-2 md:mt-0">
    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">

      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="playerUrl" class="block text-sm font-medium text-gray-700">BC Player Loader</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input type="text" name="playerUrl" v-model="playerUrl"
                   class="block w-full flex-1
                   rounded-none
                   rounded-r-md
                   border-gray-700
                   focus:border-indigo-500
                   focus:ring-indigo-500
                   sm:text-sm"/>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="accountId" class="block text-sm font-medium text-gray-700">Account Id</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input type="text" name="accountId" v-model="accountId"
                   class="block w-full flex-1
                   rounded-none
                   rounded-r-md
                   border-gray-700
                   focus:border-indigo-500
                   focus:ring-indigo-500
                   sm:text-sm"/>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="playerId" class="block text-sm font-medium text-gray-700">Player Id</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input type="text" name="playerId" v-model="playerId"
                   class="block w-full flex-1
                   rounded-none
                   rounded-r-md
                   border-gray-700
                   focus:border-indigo-500
                   focus:ring-indigo-500
                   sm:text-sm"/>
          </div>
        </div>
      </div>


      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="setting" class="block text-sm font-medium text-gray-700">Video Id</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <textarea name="setting" v-model="setting"
                      placeholder=''
                      class="mt-1 block w-full
                      rounded-md
                      border-gray-700
                      shadow-sm
                      focus:border-indigo-500
                      focus:ring-indigo-500
                      sm:text-sm h-64"/>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 px-4 py-3 sm:px-6">
        <button @click="play"
                class="inline-flex justify-center
                rounded-md border border-transparent
                bg-indigo-600 py-2 px-4
                text-sm font-medium
                text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Play
        </button>
      </div>

      <div class="px-6 py-4 pb-2">
        <div id="player_container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {loadScript} from "vue-plugin-load-script";

export default {
  data() {

    return {
      playerUrl: 'https://apis.support.brightcove.com/assets/js/playback/brightcove-player-loader.min.js',
      accountId: '',
      playerId: '',
      setting: ``,
    }
  },
  methods: {
    play() {
      loadScript(this.playerUrl).then(() => {
        try {
          // const vdoId = JSON.parse(this.setting)
          const vdoId = this.setting;
          console.log(vdoId);

          this.buildPlayer(vdoId)
        } catch (e) {
          console.log(window);
          console.error(e)
        }
      })
    },
    buildPlayer(video_id) {
      const player_container = document.getElementById('player_container');
      const brightcovePlayerLoader = window['brightcovePlayerLoader'];

      player_container.innerHTML = ''
      brightcovePlayerLoader({
        refNode: player_container,
        accountId: this.accountId,
        playerId: this.playerId,
        videoId: video_id,
        embedId: 'default',
      }).then(function (success) {
        console.log('player loaded');
      }).catch(function (error) {
        var p = document.createElement('p');
        p.textContent =
            'Sorry - the player could not be loaded. Please try again later.';
        player_container.appendChild(p);
      });
    }
  }
}
</script>
