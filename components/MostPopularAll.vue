<template>
  <div class="video-page-manager">
    <div v-if="mostPopular">
      <div class="video-grid-subheader video-shelf">
        <h2 class="video-title-container">Popular</h2>
      </div>
      <div class="video-shelf">
        <div id="items" class="video-grid-renderer">
          <div class="video-grid-renderer" v-for="item in mostPopular.items" :key="item.etag">
            <div class="video-grid-video-renderer">
              <div>
                <nuxt-link :to="'/videos/' + item.id" class="video-thumbnail-with-overlay">
                  <img class="video-img-shadow" :src="item.snippet.thumbnails.maxres ?
                  item.snippet.thumbnails.maxres.url : item.snippet.thumbnails.medium.url" />
                  <div class="video-overlay">
                    <div class="video-overlay-time-status">
                      {{item.contentDetails.duration  | conISO8601ToSeconds }}
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div class="video-metadata">
                <nuxt-link :to="'/videos/' + item.id" >
                  <h3 class="video-title">{{ item.snippet.title }}</h3>
                  <div class="video-meta-block">{{ item.snippet.channelTitle | subStrMetaData }}</div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vue-content-loading class="video-loading-desktop" v-if="!mostPopular && mostPopular != null" :height="240" primary="#383838" secondary="#323232">
      <rect x="0" y="3" rx="1" ry="1" width="8%" height="5.5px"></rect>

      <rect x="0" y="14" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="0" y="66" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="0" y="74" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="0" y="91" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="0" y="143" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="0" y="151" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="0" y="168" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="0" y="220" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="0" y="228" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="77" y="14" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="77" y="66" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="77" y="74" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="77" y="91" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="77" y="143" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="77" y="151" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="77" y="168" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="77" y="220" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="77" y="228" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="154" y="14" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="154" y="66" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="154" y="74" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="154" y="91" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="154" y="143" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="154" y="151" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="154" y="168" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="154" y="220" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="154" y="228" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="231" y="14" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="231" y="66" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="231" y="74" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="231" y="91" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="231" y="143" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="231" y="151" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="231" y="168" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="231" y="220" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="231" y="228" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="308" y="14" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="308" y="66" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="308" y="74" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="308" y="91" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="308" y="143" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="308" y="151" rx="1" ry="1" width="10%" height="6px"></rect>

      <rect x="308" y="168" rx="0" ry="0" width="19%" height="50px"></rect>
      <rect x="308" y="220" rx="1" ry="1" width="19%" height="6px"></rect>
      <rect x="308" y="228" rx="1" ry="1" width="10%" height="6px"></rect>
    </vue-content-loading>
    <vue-content-loading v-if="!mostPopular && mostPopular != null" class="video-loading-mobile" :height="1150" primary="#383838" secondary="#323232">
      <rect x="10" y="3" rx="3" ry="3" width="20%" height="20px"></rect>

      <rect x="0" y="39" rx="0" ry="0" width="100%" height="280px"></rect>
      <rect x="10" y="325" rx="3" ry="3" width="95%" height="25px"></rect>
      <rect x="10" y="355" rx="3" ry="3" width="40%" height="25px"></rect>

      <rect x="0" y="405" rx="0" ry="0" width="100%" height="280px"></rect>
      <rect x="10" y="691" rx="3" ry="3" width="95%" height="25px"></rect>
      <rect x="10" y="721" rx="3" ry="3" width="40%" height="25px"></rect>

      <rect x="0" y="771" rx="0" ry="0" width="100%" height="280px"></rect>
      <rect x="10" y="1057" rx="3" ry="3" width="95%" height="25px"></rect>
      <rect x="10" y="1087" rx="3" ry="3" width="40%" height="25px"></rect>
    </vue-content-loading>
  </div>
</template>

<script>
  import { VueContentLoading  } from 'vue-content-loading';
    export default {
      name: "MostPopularAll",
      props: ["location", "mostPopular"],
      components: {
        VueContentLoading ,
      },
      /*created() {
        this.$axios.$get("http://34.67.204.12/videos/mostPopular/?part=snippet,contentDetails&maxResults=15&regionCode="
          + (this.location ? this.location : "US")).then(res => {
          this.mostPopular = res;
        });
      },*/
      filters: {
        subStrVideoTitle: function(string) {
          if (string.length > 50)
            return string.substring(0, 50) + '...';
          else
            return string.substring(0, 50);
        },
        subStrMetaData: function(string) {
          if (string.length > 30)
            return string.substring(0, 30) + '...';
          else
            return string.substring(0, 30);
        },
        conISO8601ToSeconds(string) {
          let reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
          let hours = 0, minutes = 0, seconds = 0, totalseconds;
          if (reptms.test(string)) {
            let matches = reptms.exec(string);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            if (seconds < 10) seconds = '0' + seconds;
            totalseconds = hours ? hours + ":" +  minutes + ":" + seconds : minutes + ":" + seconds;
          }
          return totalseconds;
        }
      },
    }
</script>

<style scoped>

</style>
