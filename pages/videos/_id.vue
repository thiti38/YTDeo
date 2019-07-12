<!--suppress JSUnresolvedVariable -->
<template>
  <div id="app">
    <div id="content" class="video-app">
      <masthead />
      <div id="page-manager" class="video-app">
        <div id="columns" class="video-watch-flex">
          <div id="primary" class="video-watch-flex">
            <div class="video-container">
              <iframe class="video" :src="url" allowfullscreen>
              </iframe>
            </div>
            <div class="video-primary-info" v-if="data">
              <div class="video-metadata-title">
                <h1 class="title">{{ data.snippet.title }}</h1>
                <span class="date">{{ data.snippet.publishedAt | moment("MMMM Do YYYY") }}</span>
              </div>
              <div class="video-show-more">
                <div @click="isDesc"><svg viewBox="0 0 24 24"><path fill="white" :d="d"></path></svg></div>
              </div>
            </div>
            <div id="top-row" class="video-secondary-info" v-if="data && isDescShow">
              <div style="transition: all 5s ease-in-out;" class="content">{{ data.snippet.description }}</div>
            </div>
            <div class="video-ads-desktop" v-if="!isMobile">
              <adsbygoogle ad-slot="5929725826"></adsbygoogle>
            </div>
            <div class="video-ads-mobile" v-else>
              <adsbygoogle ad-slot="9061541222"></adsbygoogle>
            </div>
            <div class="video-comments powr-comments" id="d2c9dc1c_1561428084" v-if="data"></div>
          </div>
          <div id="secondary" class="video-watch-flex" v-if="relate">
            <div id="related">
              <adsbygoogle v-if="isMobile" ad-slot="6967475320" ad-format="fluid" ad-layout-key="-hc-12+3p-3g-3c"></adsbygoogle>
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
        $axios.$get(api_url + "videos/" + params.id + "?part=snippet,contentDetails"),
        $axios.$get(api_url + "video/relate/" + params.id)
      ]);
      return {
        name: params.id,
        data: resData.items[0],
        relate: resRelate.items,
        url: "https://www.youtube.com/embed/" + params.id + "?autoplay=1",
        isDescShow: false,
        d: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z',

      }
    },
    methods: {
      isDesc() {
        this.isDescShow = !this.isDescShow;
        this.d = this.isDescShow ? 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' : 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z';
      },
      isMobile: function() {
        const check = false;
        (function(ua){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
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
              '"name": "'+this.data.snippet.title.replace(/"/g, '\\\"')+'", "description": "'+this.data.snippet.description.replace(/"/g, '\\\"')+'",' +
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
  .video-show-more {
    padding-top: 4px;
    height: 28px;
  }
  @media only screen and (max-width: 600px) {
    .video-metadata-title {
      width: 93%;
    }
    .video-show-more {
      width: 7%;
    }
  }
  @media only screen and (min-width: 600px) {
    .video-metadata-title {
      width: 97%;
    }
    .video-show-more {
      width: 3%;
    }
  }
</style>
