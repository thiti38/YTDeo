<template>
  <div class="video-page-manager">
    <div>
      <div class="video-grid-subheader video-shelf">
        <h2 class="video-title-container">Popular</h2>
      </div>
      <div class="video-shelf">
        <div id="items" class="video-grid-renderer">
          <div class="video-grid-renderer" v-for="item in mostPopular.items" :key="item.etag">
            <div class="video-grid-video-renderer">
              <div>
                <nuxt-link :to="'/videos/' + item.id" >
                  <img class="video-img-shadow" :src="item.snippet.thumbnails.maxres ?
                  item.snippet.thumbnails.maxres.url : item.snippet.thumbnails.medium.url" />
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
  </div>
</template>

<script>
    export default {
      name: "MostPopularAll",
      props: ["location"],
      data() {
        return {
          mostPopular: "",
        }
      },
      created() {
        this.$axios.$get("http://34.67.204.12/videos/mostPopular/?part=snippet,contentDetails&maxResults=15&regionCode="
          + (this.location ? this.location : "US")).then(res => {
          this.mostPopular = res;
        });
      },
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
      },
    }
</script>

<style scoped>

</style>
