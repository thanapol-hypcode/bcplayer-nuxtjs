<template>
  <div class="mt-5 md:col-span-2 md:mt-0">
    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">

      <!--      <div class="grid grid-cols-3 gap-6">-->
      <!--        <div class="col-span-3 sm:col-span-2">-->
      <!--          <label for="playerUrl" class="block text-sm font-medium text-gray-700">BC Player Loader</label>-->
      <!--          <div class="mt-1 flex rounded-md shadow-sm">-->
      <!--            <input type="text" name="playerUrl" v-model="playerUrl"-->
      <!--                   class="block w-full flex-1-->
      <!--                   rounded-none-->
      <!--                   rounded-r-md-->
      <!--                   border-gray-700-->
      <!--                   focus:border-indigo-500-->
      <!--                   focus:ring-indigo-500-->
      <!--                   sm:text-sm"/>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="grid grid-cols-3 gap-6">-->
      <!--        <div class="col-span-3 sm:col-span-2">-->
      <!--          <label for="accountId" class="block text-sm font-medium text-gray-700">Account Id</label>-->
      <!--          <div class="mt-1 flex rounded-md shadow-sm">-->
      <!--            <input type="text" name="accountId" v-model="accountId"-->
      <!--                   class="block w-full flex-1-->
      <!--                   rounded-none-->
      <!--                   rounded-r-md-->
      <!--                   border-gray-700-->
      <!--                   focus:border-indigo-500-->
      <!--                   focus:ring-indigo-500-->
      <!--                   sm:text-sm"/>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="grid grid-cols-3 gap-6">-->
      <!--        <div class="col-span-3 sm:col-span-2">-->
      <!--          <label for="playerId" class="block text-sm font-medium text-gray-700">Player Id</label>-->
      <!--          <div class="mt-1 flex rounded-md shadow-sm">-->
      <!--            <input type="text" name="playerId" v-model="playerId"-->
      <!--                   class="block w-full flex-1-->
      <!--                   rounded-none-->
      <!--                   rounded-r-md-->
      <!--                   border-gray-700-->
      <!--                   focus:border-indigo-500-->
      <!--                   focus:ring-indigo-500-->
      <!--                   sm:text-sm"/>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->


      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-3 sm:col-span-2">
          <label for="setting" class="block text-sm font-medium text-gray-700">Video Id</label>
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
  "accountId": "",
  "playerId": "Z4sz5QN9Y",
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
        // console.log(this.setting);
        const config = JSON.parse(this.setting)
        // const { vdoId, playlistId, ep, time } = this.setting;

        this.buildPlayer(config, parseInt(this.playIdx), parseInt(this.playTime))
      } catch (e) {
        console.log(window);
        console.error(e)
      }
      // loadScript(this.playerUrl).then(() => {
      //   try {
      //     console.log(this.setting);
      //     const config = JSON.parse(this.setting)
      //     // const { vdoId, playlistId, ep, time } = this.setting;
      //
      //     this.buildPlayer(config)
      //   } catch (e) {
      //     console.log(window);
      //     console.error(e)
      //   }
      // })
    },
    buildPlayer(config, playIdx, playTime) {
      const player_container = document.getElementById('player_container');
      // const brightcovePlayerLoader = window['brightcovePlayerLoader'];

      // const {vdoId, playlistId, ep, time} = config;

      const params = {
        ...config,
        refNode: player_container,
        embedId: 'default',
      }
      console.log(params);
      console.log(playIdx);
      console.log(playTime);

      player_container.innerHTML = ''

      brightcovePlayerLoader(params).then(function (success) {
        const player = success.ref;
        console.log(`player: `, player);
        player.ready(function () {
          console.log(`ready:`, player.playlist());
        })
        player.on('loadedmetadata',function(){
          console.log(`loadedmetadata:`, player.playlist());

          if (playIdx > 0) {
            console.log(`currentItem: `, player.playlist?.currentItem());
            player.playlist?.currentItem(playIdx);
            console.log(`currentItem: `, player.playlist?.currentItem());
          }
          if (playTime > 0) {
            console.log(player.currentTime());
            player.currentTime(playTime);
            console.log(player.currentTime());
          }

          player.play();
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
