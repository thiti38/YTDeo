<!--suppress JSUnresolvedVariable -->
<template>
  <div id="app">
    <div id="content" class="video-app">
      <masthead/>
      <div v-if="countryCode" id="page-manager" class="video-app">
        <div class="video-ads-desktop" v-if="$device.isDesktop">
          <google-ad unit="YTDeo/YTDeo_Billboard" id="YTDeo_Billboard"></google-ad>
        </div>
        <div class="video-ads-mobile" v-else>
          <google-ad unit="YTDeo/YTDeo_Rectangle" id="YTDeo_Rectangle"></google-ad>
        </div>
        <most-popular-all :mostPopular.sync="popularAll" :location.sync="countryCode" />
        <most-popular :location.sync="countryCode" videoCategoryId="10" video_title="Music" />
        <div class="video-page-manager">
          <div v-if="playlist">
            <div class="video-grid-subheader video-shelf">
              <h2 class="video-title-container">YTDeo Playlist</h2>
            </div>
            <div class="video-shelf">
              <div id="items" class="video-grid-renderer">
                <div class="video-grid-renderer" v-for="item in playlist.items" :key="item.etag">
                  <div class="video-grid-video-renderer">
                    <div>
                      <nuxt-link :to="'/videos/' + item.snippet.thumbnails.default.url.replace('https://i.ytimg.com/vi/', '').replace('/default.jpg', '/?list=')
                       + item.id.playlistId + '&index=1'" class="video-thumbnail-with-overlay">
                        <img class="video-img-shadow" :src="item.snippet.thumbnails.medium.url" />
                        <div class="video-overlay">
                          <div class="video-overlay-time-status">
                          </div>
                        </div>
                      </nuxt-link>
                    </div>
                    <div class="video-metadata">
                      <nuxt-link :to="'/videos/' + item.snippet.thumbnails.default.url.replace('https://i.ytimg.com/vi/', '').replace('/default.jpg', '/?list=')
                       + item.id.playlistId + '&index=1'" >
                        <h3 class="video-title">{{ item.snippet.title }}</h3>
                        <div class="video-meta-block">{{ item.snippet.channelTitle | subStrMetaData }}</div>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <most-popular :location.sync="countryCode" videoCategoryId="1" video_title="Film & Animation" />
        <most-popular :location.sync="countryCode" videoCategoryId="17" video_title="Sports" />
        <most-popular :location.sync="countryCode" videoCategoryId="20" video_title="Gaming" />
        <most-popular :location.sync="countryCode" videoCategoryId="24" video_title="Entertainment" />
      </div>
    </div>
  </div>
</template>

<script>
import Masthead from '~/components/Masthead.vue'
import MostPopularAll from '~/components/MostPopularAll.vue'
import MostPopular from '~/components/MostPopular.vue'

export default {
  components: {
    Masthead,
    MostPopularAll,
    MostPopular
  },
  /*async asyncData({$axios}){
    let [resData] = await Promise.all([
      $axios.$get("https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=s&callback=suggestCallback"),
    ]);
    let suggest = resData.split("suggestCallback && suggestCallback(");
    suggest = JSON.stringify(JSON.parse(suggest[1].substr(0, suggest[1].length-1))[1]);
    console.log(suggest);
  },*/
  data(){
    return {
      glList: [],
      playlist: [],
    }
  },
  async created(){
    /*if (!this.$store.getters.getLocation){
      await this.$store.dispatch('GET_LOCATION');
    }
    if (process.browser) {
      window.localStorage.gl = this.$store.getters.getLocation;
    }*/
    if (this.$cookies.get('gl') === undefined || this.$cookies.get('gl') === "") {
      let locationData = await this.$axios.$get("http://ip-api.com/json/");
      locationData = locationData.countryCode;
      this.$cookies.set('gl', locationData, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      this.countryCode = locationData;
      this.$axios.$get("/api/videos/mostPopular/?part=snippet,contentDetails&maxResults=15" +
              "&regionCode=" + (locationData)).then(res => {
        this.popularAll = res;
      }).catch(e => {
        console.log(e);
      });
    }
    await this.$axios.$get("regionListMin.json").then(res => {
      this.glList = res.find((data) => {
        return data["id"] === this.countryCode
      });
    });
    this.$axios.$get("/api/search/list/?part=snippet&channelId=UC-9-kyTW8ZkZNDHQJ6FgpwQ&" +
            "maxResults=5&q=" + this.glList.snippet.name + "&type=playlist&regionCode="+ this.countryCode).then(res => {
              this.playlist = res;
    })
  },
  methods: {
  },
  async asyncData ({route, $axios, app}) {
    let locationData;
    if (process.server) {
      if (app.$cookies.get('gl') === undefined && !route.query.gl) {
        //let cc = await route.fullPath;
        //redirect({name: "Service", query: {service: 'forLocation', continue: cc }});
        locationData = "US";
      } else if (!route.query.gl) {
        locationData = app.$cookies.get('gl');
      } else {
        app.$cookies.set('gl', route.query.gl, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        });
        locationData = route.query.gl;
      }
      let [resData] = await Promise.all([$axios.$get("/api/videos/mostPopular/?part=snippet," +
        "contentDetails&maxResults=15&regionCode=" + locationData)]);
      return {
        popularAll: resData,
        countryCode: locationData,
      }
    }
    else {
      locationData = app.$cookies.get('gl') !== undefined ? app.$cookies.get('gl') : "US";
      let [resData] = await Promise.all([$axios.$get("/api/videos/mostPopular/?part=snippet," +
        "contentDetails&maxResults=15&regionCode=" + locationData)]);
      return {
        popularAll: resData,
        countryCode: locationData,
      }
    }
  },
  /*async asyncData ( {store, $axios} ) {
    await store.dispatch('GET_LOCATION');
    let locationData = store.getters.getLocation;
    let resData = await $axios.$get("http://34.67.204.12/videos/mostPopular/?part=snippet," +
      "contentDetails&maxResults=15&regionCode=" + locationData);
    console.log(resData);
    return {
      popularAll: resData,
      countryCode: locationData
    }
  },*/
}
</script>

<style>
  .video-ads-desktop {
    padding-top: 24px;
  }
  .video-ads-desktop #YTDeo_Billboard div {
    border: none;
    margin: auto;
    text-align: center;
  }
  .video-ads-mobile {
    border-bottom: 1px solid #2a2a2a;
  }
  .video-overlay {
    display: inline-block;
    position: relative;
  }
  .video-thumbnail-with-overlay {
    display: inline-grid;
    width: 100%;
  }
  .video-overlay-time-status {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #FFFFFF;
    background-color: rgba(0, 0, 0, 0.80);
    padding: 2px 4px;
    border-radius: 2px;
    margin: 4px;
    font-size: 12px;
  }
  .video-title-container {
    color: #ffffff;
    font-size: 15px;
  }
  .video-grid-renderer {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .video-img-shadow {
    width: 100%;
  }
  @media only screen and (max-width: 600px) {
    .video-loading-desktop{
      display: none;
    }
    .video-grid-subheader {
      padding: 12px 0;
      background: #212121;
      top: 56px;
      position: sticky;
      z-index: 1000;
    }
    .video-page-manager {
      padding: 0;
    }
    #items.video-grid-renderer > div.video-grid-renderer {
      display: inline-block;
      width: 100%;
      padding-bottom: 24px;
      margin-bottom: 0px;
    }
    .video-title-container {
      padding: 0 12px;
    }
    .video-title {
      padding-right: 12px;
    }
    .video-metadata {
      padding: 0 12px;
    }
    .video-grid-renderer {
      border-bottom: 1px solid rgb(42, 42, 42);
    }
    #items.video-grid-renderer {
      border-bottom: none;
      margin-bottom: 0px;
    }
  }
  @media only screen and (min-width: 600px) {
    .video-loading-mobile {
      display: none;
    }
    .video-shelf {
      padding-top: 24px;
    }
    .video-page-manager {
      padding: 0 5%;
    }
    #items.video-grid-renderer > div.video-grid-renderer {
      margin-right: 4px;
      display: inline-block;
      width: 19%;
      margin-bottom: 24px;
    }
    #items.video-grid-renderer {
      border-bottom: 1px solid rgb(42, 42, 42);
    }
  }
</style>
