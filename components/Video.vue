<template>
  <div id="page-manager" class="video-app">
    <div id="columns" class="video-watch-flex">
      <div id="primary" class="video-watch-flex">
        <div class="video-container">
          <!--<iframe class="video" :src="url" @onStateChange="onPlayerStateChange" allowfullscreen>
          </iframe>-->
          <youtube class="video" :video-id="name" player-width="100%" player-height="100%"
                   :player-vars="{autoplay: 1}" @ended="ended"></youtube>
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
        <div id="top-row" class="video-secondary-info" v-if="data && (isDescShow || $device.isDesktop)">
          <div style="transition: all 5s ease-in-out;" class="content">{{ isDescShow ?
            data.snippet.description : data.snippet.description.split("\n").slice(0,3).join("\n") }}</div>
        </div>
        <div class="video-ads-desktop" style="padding-bottom: 24px;" v-if="$device.isDesktop">
          <google-ad unit="YTDeo/YTDeo_Rectangle" id="YTDeo_Rectangle_Desktop"></google-ad>
        </div>
        <div class="video-ads-mobile" v-else>
          <google-ad unit="YTDeo/YTDeo_Rectangle" id="YTDeo_Rectangle_Mobile"></google-ad>
        </div>
        <!--<div class="video-comments powr-comments" id="d2c9dc1c_1561428084" v-if="data"></div>-->
      </div>
      <div id="secondary" class="video-watch-flex" v-if="relate">
        <div id="related">
          <div id="playlist">
            <div class="video-playlist-panel">
              Mix - อ๊อฟ ปองศักดิ์ - อยากให้เธอเจอคนแบบเธอ 【OFFICIAL MV】
            </div>
            <div class="video-playlist-container">
              <div class="video-playlist-items">
                <div class="video-playlist-panel-renderer">
                  <span class="index">▶</span>
                  <div class="video-playlist-thumbnail">
                    <a href="/videos/U3r0Iw8ewOE" class="">
                      <img width="100" src="https://i.ytimg.com/vi/U3r0Iw8ewOE/mqdefault.jpg" alt="พาแฟนไปดู Annabelle!! ผีตามกลับบ้าน" class="video-img"></a>
                  </div>
                  <div class="video-playlist-meta">
                    <a href="/videos/U3r0Iw8ewOE">
                      <h3 class="video-title">พาแฟนไปดู Annabelle!! ผีตามกลับบ้าน
                      </h3>
                      <div class="video-meta-block">
                        Kaykai Salaider
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="video-playlist-items" v-for="x in 80">
                <div class="video-playlist-panel-renderer">
                  <span class="index"></span>
                  <div class="video-playlist-thumbnail">
                    <a href="/videos/U3r0Iw8ewOE" class="">
                      <img width="100" src="https://i.ytimg.com/vi/U3r0Iw8ewOE/mqdefault.jpg" alt="พาแฟนไปดู Annabelle!! ผีตามกลับบ้าน" class="video-img"></a>
                  </div>
                  <div class="video-playlist-meta">
                    <a href="/videos/U3r0Iw8ewOE">
                      <h3 class="video-title">พาแฟนไปดู Annabelle!! ผีตามกลับบ้าน
                      </h3>
                      <div class="video-meta-block">
                        Kaykai Salaider
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <!-- -->
            </div>
          </div>
          <google-ad unit="YTDeo/YTDeo_Mobile_Leaderboard" id="YTDeo_Mobile_Leaderboard"></google-ad>
          <div class="video-compact-autoplay">
            <div id="upnext">
              Up next
            </div>
            <div id="autoplay">
              Autoplay
            </div>
            <no-ssr>
              <toggle-button style="margin-left: 8px;" @change="onAutoplayChange" :value="ap" :color="{checked: '#373737',
                unchecked: '#373737'}" :switch-color="{checked: '#3ea6ff', unchecked: '#909090'}" />
            </no-ssr>
          </div>
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
</template>

<script>
    export default {
      name: "Video",
      props:['data'],
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
            //{ src: 'https://www.powr.io/powr.js?platform=html', async: true, defer: true },
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
      },

      methods: {
        isDesc() {
          this.isDescShow = !this.isDescShow;
          this.d = this.isDescShow ? 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' : 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z';
        },
        ended() {
          if (this.ap){
            this.$router.push("./" + this.relate[0].id.videoId);
          }
        },
        onAutoplayChange() {
          this.ap = !this.ap;
          this.$cookies.set('ap', this.ap, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
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
    }
</script>

<style scoped>

</style>
