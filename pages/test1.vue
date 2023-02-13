<template>
  <div class="mt-5 md:col-span-2 md:mt-0">
    Vue Dynamic Component
    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
      <!--      <div style="max-width: 960px;"-->
      <!--           class="vjs-playlist-player-container">-->
      <!--        <style>-->
      <!--          video-js.video-js.vjs-fluid:not(.vjs-audio-only-mode) {-->
      <!--            padding-top: 56.25%;-->
      <!--          }-->
      <!--        </style>-->
      <component is="video-js"
                 v-bind:class="'vjs-playlist-player-container'"
                 v-bind:id="'myPlayer'"
                 v-bind="playerConfig"></component>
      <!--      </div>-->
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="setting" class="block text-sm font-medium text-gray-700">setting</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <textarea name="setting" v-model="setting"
                      placeholder='player loader config'
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

      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="playIdx" class="block text-sm font-medium text-gray-700">Play Idx</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input type="text" name="playIdx" v-model="playIdx"
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
          <label for="playTime" class="block text-sm font-medium text-gray-700">Play Time</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <input type="text" name="playTime" v-model="playTime"
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
    </div>
  </div>
</template>
<script>
import {loadScript} from "vue-plugin-load-script";

export default {
  data() {
    return {
      setting: `{
  "accountId": "",
  "playerId": "Z4sz5QN9Y",
  "playlistId": "1757635339688542008"
}`,
      playIdx: 1,
      playTime: 10,
    }
  },
  computed: {
    playerConfig: function () {
      const config = JSON.parse(this.setting);
      return {
        "data-account": config.accountId,
        "data-player": config.playerId,
        "data-embed": "default",
        "data-application-id": "",
        "controls": "",
        "class": "vjs-fluid"
        // "data-playlist-id": config.playlistId,
      }
    }
  },
  methods: {
    play() {
      const config = JSON.parse(this.setting);
      const playIdx = parseInt(this.playIdx || 0);
      const playTime = parseInt(this.playTime || 0);

      const playerUrl = `https://players.brightcove.net/${config.accountId}/${config.playerId}_default/index.min.js`
      loadScript(playerUrl).then(function () {
        // set playlist id
        // console.log(videojs);
        videojs?.getPlayer('myPlayer')?.ready(function () {
          let myPlayer = this;
          console.log(`player ready`, config.playlistId);
          console.log(`myPlayer`, myPlayer.catalog);
          console.log(`playIdx, Time`, playIdx, playTime);

          myPlayer.on('loadedmetadata', function () {
            console.log(`loadedmetadata:`, myPlayer.playlist());
            if (playIdx > 0) {
              console.log(`currentItem: `, myPlayer.playlist.currentItem());
              console.log(`setting currentItem`, playIdx);
              myPlayer.playlist.currentItem(playIdx);
              console.log(`currentItem: `, myPlayer.playlist.currentItem());
            }
            if (playTime > 0) {
              console.log(`currentTime: `, myPlayer.currentTime());
              console.log(`setting currentTime`, playTime);
              myPlayer.currentTime(playTime);
              console.log(`currentTime: `, myPlayer.currentTime());
            }

            myPlayer.play();
          });

          myPlayer.catalog.getPlaylist(config.playlistId, function (error, playlist) {
            if (error) {
              console.error(error);
            } else {
              console.log(playlist);
              myPlayer.catalog.load(playlist);
            }
          });
        })
      })
    }
  }
}
</script>
