<!--suppress JSUnresolvedVariable -->
<template>
  <div id="app">
    <div id="content" class="video-app">
      <masthead />
      <div id="page-manager" class="video-app">
        <div id="columns" class="video-watch-flex">
          <div id="primary" class="video-watch-flex">
            <div class="video-container">
              <iframe class="video" :src="url">
              </iframe>
            </div>
            <div class="video-primary-info" v-if="data">
              <h1 class="title">{{ data.snippet.title }}</h1>
              <span class="date">{{ data.snippet.publishedAt | moment("MMMM Do YYYY") }}</span>
            </div>
            <div id="top-row" class="video-secondary-info" v-if="data">
              <div class="content">{{ data.snippet.description }}</div>
            </div>
            <div class="video-comments powr-comments" id="d2c9dc1c_1561428084" v-if="data"></div>
          </div>
          <div id="secondary" class="video-watch-flex" v-if="relate">
            <div id="related">
              <div class="video-related-results" v-for="result in relate" :key="result.etag">
                <div class="video-related-renderer">
                  <div class="video-thumbnail">
                    <nuxt-link :to="'/videos/' + result.id.videoId" >
                      <img class="video-img" width="168" :src="result.snippet.thumbnails.medium.url"
                           :alt="result.snippet.title" />
                    </nuxt-link>
                  </div>
                  <div class="video-metadata">
                    <nuxt-link :to="'/videos/' + result.id.videoId" >
                      <h3 class="video-title">{{ result.snippet.title | subStrVideoTitle }}</h3>
                      <div class="video-meta-block">{{ result.snippet.channelTitle | subStrMetaData }}</div>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="min-width: 24%">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Masthead from '~/components/Masthead.vue'
  export default {
    components: {
      Masthead
    },
    async asyncData ({params, $axios}) {
      let api_url = "http://34.67.204.12/";
      let [resData, resRelate] = await Promise.all([
        $axios.$get(api_url + "/videos/" + params.id + "?part=snippet,contentDetails"),
        $axios.$get(api_url + "/video/relate/" + params.id)
      ]);
      return {
        name: params.id,
        data: resData.items[0],
        relate: resRelate.items,
        url: "https://www.youtube.com/embed/" + params.id + "?autoplay=1",
        structuredData: {
          "@context": "http://schema.org",
        }
      }
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
    head(){
      return {
        title: this.data.snippet.title + ' - YTDeo',
        meta: [
          { hid: 'title', name: 'title', content: this.data.snippet.title },
          { hid: 'description', name: 'description', content: this.data.snippet.description },
          {property: 'og:title', content: this.data.snippet.title},
          {property: 'og:site_name', content: 'YTDeo'},
          {property: 'og:type', content: 'video.movie'},
          {property: 'og:url', content: 'http://ytdeo.com/videos/' + this.$route.params.id},
          {property: 'og:image', content: this.data.snippet.thumbnails.maxres
              ? this.data.snippet.thumbnails.maxres.url : this.data.snippet.thumbnails.standard
                ? this.data.snippet.thumbnails.standard.url : this.data.snippet.thumbnails.high
                  ? this.data.snippet.thumbnails.high.url : this.data.snippet.thumbnails.medium
                    ? this.data.snippet.thumbnails.medium.url : this.data.snippet.thumbnails.default.url},
          {property: 'og:description', content: this.data.snippet.description},
          {property: 'og:video', content: "https://www.youtube.com/embed/"+ this.$route.params.id},
          {name: 'twitter:card', content: 'summary'},
          {name: 'twitter:site', content: 'http://ytdeo.com/videos/' + this.$route.params.id},
          {name: 'twitter:title', content: this.data.snippet.title},
          {name: 'twitter:description', content: this.data.snippet.description},

          {name: 'twitter:image:src', content: this.data.snippet.thumbnails.maxres
              ? this.data.snippet.thumbnails.maxres.url : this.data.snippet.thumbnails.standard
                ? this.data.snippet.thumbnails.standard.url : this.data.snippet.thumbnails.high
                  ? this.data.snippet.thumbnails.high.url : this.data.snippet.thumbnails.medium
                    ? this.data.snippet.thumbnails.medium.url : this.data.snippet.thumbnails.default.url},
          {itemprop: 'name', content: this.data.snippet.title},
          {itemprop: 'description', content: this.data.snippet.description},
          {itemprop: 'image', content: this.data.snippet.thumbnails.maxres
              ? this.data.snippet.thumbnails.maxres.url : this.data.snippet.thumbnails.standard
                ? this.data.snippet.thumbnails.standard.url : this.data.snippet.thumbnails.high
                  ? this.data.snippet.thumbnails.high.url : this.data.snippet.thumbnails.medium
                    ? this.data.snippet.thumbnails.medium.url : this.data.snippet.thumbnails.default.url},
        ],
        __dangerouslyDisableSanitizers: ['script'],
        script: [
          { src: 'https://www.powr.io/powr.js?platform=html', async: true, defer: true },
          {
            hid: 'ldjson-schema',
            type: 'application/ld+json',
            innerHTML: '{ "@context": "http://www.schema.org", "@type": "VideoObject",' +
              '"name": "'+this.data.snippet.title+'", "description": "'+this.data.snippet.description+'",' +
              '"thumbnailUrl": "'+this.data.snippet.thumbnails.medium.url+'",' +
                    '"uploadDate": "'+this.data.snippet.publishedAt+'", ' +
                    '"duration": "'+this.data.contentDetails.duration+'",' +
                    '"embedUrl": "https://www.youtube.com/embed/' + this.$route.params.id +'"}',
            body: true,
            defer: true
          },
        ],
      }
    }
  }
</script>

<style scoped>
</style>
