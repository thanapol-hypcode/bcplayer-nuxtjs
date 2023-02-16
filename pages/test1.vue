<template>
  <div class="mt-5 md:col-span-2 md:mt-0">
    Vue Dynamic Component
    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
      <div class="vjs-playlist-player-container" style="max-width: 960px;">
        <component is="video-js"
                   v-bind:id="'myPlayer'"
                   v-bind="playerConfig"/>
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
    </div>
  </div>
</template>
<script>
import {loadScript} from "vue-plugin-load-script";

export default {
  // mounted() {
  //   console.log(`mounted`, this.$config.public.accountId);
  //   const playerUrl = `https://players.brightcove.net/${this.$config.public.accountId}/${this.$config.public.playerId}_default/index.min.js`
  //   loadScript(playerUrl).then(() => {
  //     console.log(`load player script ok`);
  //   }).catch(console.error);
  // },
  data() {
    return {
      setting: `{
  "accountId": "${this.$config.public.accountId || ''}",
  "playerId": "${this.$config.public.playerId || 'Z4sz5QN9Y'}",
  "sequence": [6319643115112,6319646968112],
  "playlistId": "1757635339688542008",
  "search": "",
  "policyKey": "${this.$config.public.policyKey || ''}"
}`,
      settingJson: undefined,
      playIdx: 1,
      playTime: 15,
    }
  },
  computed: {
    playerConfig: function () {
      try {
        const cfg = this.settingJson || JSON.parse(this.setting);
        return {
          "data-account": cfg.accountId,
          "data-player": cfg.playerId,
          "data-embed": "default",
          "data-application-id": "",
          "data-start-time": this.playTime,
          "controls": "",
          "class": "vjs-fluid"
        };
      } catch (e) {
        console.error(e);
      }
      return {};
    }
  },
  methods: {
    play() {
      const cfg = JSON.parse(this.setting);
      const playerUrl = `https://players.brightcove.net/${cfg.accountId}/${cfg.playerId}_default/index.min.js`
      loadScript(playerUrl).then(() => {
        this.settingJson = cfg;
        this.$forceUpdate();
        return this.setupPlayer();
      }).catch(console.error);
    },
    setupPlayer() {
      try {
        const cfg = JSON.parse(this.setting);
        const myPlayer = videojs.getPlayer('myPlayer')

        // listen to playlist loaded event
        myPlayer.on('loadedmetadata', () => {
          console.log(`loadedmetadata:`, myPlayer.playlist());

          if (this.playTime > 0) {
            // set only first time
            myPlayer.currentTime(parseInt(this.playTime));
            this.playTime = 0;
          }

          myPlayer.playlist.autoadvance(0);
          myPlayer.playlist.playOnSelect = true
          myPlayer.play();
        });

        // load playlist
        myPlayer.ready(() => {
          // console.log(`setup player`, myPlayer);
          console.log(`player ready`, cfg.playlistId);
          // console.log(`myPlayer.playlist`, myPlayer.playlist);
          console.log(`playIdx, Time`, this.playIdx, this.playTime);

          // sequence of video_id, search or playlist_id
          if (cfg.sequence) {
            const params = cfg.sequence.map((id) => {
              return {
                type: 'video',
                id: `${id}`
              }
            });
            console.log(`sequence`, params);
            myPlayer.catalog.getSequence(params, (error, videosReturned) => {
              console.log('videosReturned', videosReturned);
              myPlayer.playlist(videosReturned);
            });
          } else if (cfg.search) {
            const params = {
              type: 'search',
              policyKey: '',
              q: cfg.search
            };
            myPlayer.catalog.getSearch(params, (error, videosReturned) => {
              console.log('videosReturned', videosReturned);
              myPlayer.playlist(videosReturned);
            });
          } else if (cfg.playlistId) {
            myPlayer.catalog.getPlaylist(cfg.playlistId, (error, playlist) => {
              if (error) {
                console.error(error);
              } else {
                console.log(playlist);

                if (this.playIdx > 0) {
                  // play specific ep
                  const videoId = playlist[this.playIdx].id

                  myPlayer.catalog.autoFindAndLoadMedia({
                    playlistId: cfg.playlistId,
                    playlistVideoId: videoId,
                    // startTime: this.playTime || 0,
                  })

                } else {
                  myPlayer.catalog.load(playlist);
                }
              }
            });
          }
        });
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
