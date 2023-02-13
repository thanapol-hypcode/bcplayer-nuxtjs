<template>
  <div class="mt-5 md:col-span-2 md:mt-0">
    BrightCove Player Loader
    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">

      <div class="px-6 py-4 pb-2">
        <div class="vjs-playlist-player-container" style="max-width: 960px;">
          <div id="player_container"></div>
        </div>
      </div>

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

      <div class="px-6 py-4 pb-2">
        <div id="player_container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {loadScript} from "vue-plugin-load-script";
import brightcovePlayerLoader from '@brightcove/player-loader';

export default {
  data() {
    return {
      setting: `{
   "accountId": "${this.$config.public.accountId || ''}",
   "playerId": "${this.$config.public.playerId || 'Z4sz5QN9Y'}",
  "playlistId": "1757635339688542008",
  "embedOptions": { "responsive": true, "unminified": true, "playlist": false }
}`,
      playIdx: 1,
      playTime: 10,
    }
  },
  methods: {
    play() {
      try {
        const config = JSON.parse(this.setting)
        const playerUrl = `https://players.brightcove.net/${config.accountId}/${config.playerId}_default/index.min.js`
        loadScript(playerUrl).then(() => {
          this.buildPlayer(config)
        })
      } catch (e) {
        console.log(window);
        console.error(e)
      }
    },
    buildPlayer(config) {
      const player_container = document.getElementById('player_container');
      player_container.innerHTML = ''

      const params = {
        ...config,
        refNode: player_container,
        embedId: 'default',
      }
      console.log(params);
      console.log(this.playIdx);
      console.log(this.playTime);

      const playIdx = parseInt(this.playIdx) || 0
      const playTime = parseInt(this.playTime) || 0

      brightcovePlayerLoader.reset();
      brightcovePlayerLoader(params).then((success) => {
        const player = success.ref;
        console.log(`player: `, player);
        player.on('loadedmetadata', () => {
          console.log(`loadedmetadata:`, player.playlist());
          if (playIdx > 0) {
            console.log(`currentItem: `, player.playlist.currentItem());
            player.playlist?.currentItem(playIdx);
            console.log(`currentItem: `, player.playlist.currentItem());
            this.playIdx = 0
          }
          if (playTime > 0) {
            console.log(player.currentTime());
            player.currentTime(playTime);
            console.log(player.currentTime());
            this.playTime = 0
          }
          // player.play();
        });


      }).catch(function (error) {
        let p = document.createElement('p');
        p.textContent =
            'Sorry - the player could not be loaded. Please try again later.';
        player_container.appendChild(p);
      });
    }
  }
}
</script>
