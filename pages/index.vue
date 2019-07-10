<template>
  <div id="app">
    <div id="content" class="video-app">
      <masthead/>
      <div v-if="$store.getters.getLocation" id="page-manager" class="video-app">
        <most-popular-all :location="$store.getters.getLocation" />
        <most-popular :location="$store.getters.getLocation" videoCategoryId="10" video_title="Music" />
        <most-popular :location="$store.getters.getLocation" videoCategoryId="1" video_title="Film & Animation" />
        <most-popular :location="$store.getters.getLocation" videoCategoryId="17" video_title="Sports" />
        <most-popular :location="$store.getters.getLocation" videoCategoryId="20" video_title="Gaming" />
        <most-popular :location="$store.getters.getLocation" videoCategoryId="24" video_title="Entertainment" />
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
  beforeCreate(){
    this.$store.dispatch('GET_LOCATION');
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
