<template>
  <div id="app">
    <div id="content" class="video-app">
      <masthead :q="q" />
      <div id="page-manager" class="video-app">
        <div class="video-search">
          <div class="video-item-section" v-for="result in data">
            <div class="video-dismissable">
              <div class="video-thumbnail">
                <nuxt-link :to="'/videos/' + result.id.videoId" >
                  <img class="video-img-shadow" :src="result.snippet.thumbnails.medium.url"
                       :alt="result.snippet.title" />
                </nuxt-link>
              </div>
              <div class="video-metadata">
                <nuxt-link :to="'/videos/' + result.id.videoId" >
                  <h3 class="video-title">{{ result.snippet.title | subStrVideoTitle }}</h3>
                  <div class="video-meta-block">{{ result.snippet.channelTitle | subStrMetaData }}</div>
                  <div class="video-meta-block description">{{ result.snippet.description }}</div>
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
  import Masthead from '~/components/Masthead.vue'
    export default {
      components: {
        Masthead
      },
      watchQuery: ['search_query'],
      methods: {
        onFocus() {
          this.in_search = true
        },
        onBlur() {
          setTimeout(() => this.in_search=false, 500);
        },
        handleSearch: function (e) {
          this.$axios.$get("http://34.67.204.12/search?q=" + this.search_query).then(res => {
            this.search_result = res[1];
          });
        },
        submit(){
          this.$router.push({name: "results", query: { search_query: this.search_query }});
        },
        onClickSubmit(to){
          this.search_query = to;
          this.$router.push({name: "results", query: { search_query: to }});
        }
      },
      async asyncData ({route, $axios, redirect, app}) {
        /*if (app.$cookies.get('gl') === undefined) {
          let cc = await route.fullPath;
          redirect({name: "Service", query: {service: 'forLocation', continue: cc }});
          let locationData = await $axios.$get("http://ip-api.com/json/");
          app.$cookies.set('gl', locationData ? locationData.countryCode : "US", {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
        }*/
        let api_url = "http://34.67.204.12/";
        let [resData] = await Promise.all([
          $axios.$get(encodeURI(api_url + "search/list/?q=" + route.query.search_query +
            "&part=snippet&maxResults=50&type=video&regionCode=" + app.$cookies.get('gl')))
        ]);
        return {
          data: resData.items,
          nextPageToken: resData.nextPageToken,
          pageInfo: resData.pageInfo,
        }
      },
      data() {
        return {
          q: this.$route.query.search_query,
          search_query: this.$route.query.search_query,
          search_result: "",
          in_search: false
        }
      },
      filters: {
        subStrVideoTitle: function(string) {
          if (string.length > 60)
            return string.substring(0, 60) + '...';
          else
            return string.substring(0, 60);
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
          title: this.$route.query.search_query + ' - YTDeo',
          meta: [
            { hid: 'title', name: 'title', content: this.$route.query.search_query  + ' - YTDeo' },
            { hid: 'description', name: 'description', content: this.data[0].snippet.description },
            {property: 'og:title', content: this.data[0].snippet.title},
            {property: 'og:site_name', content: 'YTDeo'},
            {property: 'og:type', content: 'website'},
            {property: 'og:url', content: 'http://ytdeo.com/results?search_query=' + this.$route.query.search_query},
            {property: 'og:image', content: this.data[0].snippet.thumbnails.maxres
                ? this.data[0].snippet.thumbnails.maxres.url : this.data[0].snippet.thumbnails.standard
                  ? this.data[0].snippet.thumbnails.standard.url : this.data[0].snippet.thumbnails.high
                    ? this.data[0].snippet.thumbnails.high.url : this.data[0].snippet.thumbnails.medium
                      ? this.data[0].snippet.thumbnails.medium.url : this.data[0].snippet.thumbnails.default.url},
            {property: 'og:description', content: this.data[0].snippet.description},
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:site', content: 'http://ytdeo.com/results?search_query=' + this.$route.query.search_query},
            {name: 'twitter:title', content: this.data[0].snippet.title},
            {name: 'twitter:description', content: this.data[0].snippet.description},

            {name: 'twitter:image:src', content: this.data[0].snippet.thumbnails.maxres
                ? this.data[0].snippet.thumbnails.maxres.url : this.data[0].snippet.thumbnails.standard
                  ? this.data[0].snippet.thumbnails.standard.url : this.data[0].snippet.thumbnails.high
                    ? this.data[0].snippet.thumbnails.high.url : this.data[0].snippet.thumbnails.medium
                      ? this.data[0].snippet.thumbnails.medium.url : this.data[0].snippet.thumbnails.default.url},
            {itemprop: 'name', content: this.data[0].snippet.title},
            {itemprop: 'description', content: this.data[0].snippet.description},
            {itemprop: 'image', content: this.data[0].snippet.thumbnails.maxres
                ? this.data[0].snippet.thumbnails.maxres.url : this.data[0].snippet.thumbnails.standard
                  ? this.data[0].snippet.thumbnails.standard.url : this.data[0].snippet.thumbnails.high
                    ? this.data[0].snippet.thumbnails.high.url : this.data[0].snippet.thumbnails.medium
                      ? this.data[0].snippet.thumbnails.medium.url : this.data[0].snippet.thumbnails.default.url},
          ],
          script: [
            { src: 'https://www.powr.io/powr.js?platform=html', async: true, defer: true }
          ],
        }
      }
    }
</script>

<style scoped>
  .video-dismissable {
    display: flex;
    position: relative;
  }
  .video-img-shadow {
    display: block;
    width: 100%;
  }
  @media only screen and (max-width: 600px) {
    .video-title {
      font-size: 14px;
    }
    .video-search {
      padding: 8px 12px;
    }
    .video-item-section {
      margin-top: 8px;
    }
    .video-thumbnail {
      height: auto;
      width: auto;
    }
    .description {
      display: none;
    }
  }
  @media only screen and (max-width: 999px) and (min-width: 600px) {
    .video-title {
      font-size: 18px;
    }
    .video-search {
      padding: 16px 24px;
    }
    .video-item-section {
      margin-top: 16px;
    }
    .video-thumbnail {
      height: auto;
      width: 30%;
      margin-right: 16px;
    }
    .description {
      padding: 8px 0;
    }
  }
  @media only screen and (min-width: 1000px) and (max-width: 1380px) {
    .video-title {
      font-size: 18px;
    }
    .video-search {
      padding: 16px 10%;
    }
    .video-item-section {
      margin-top: 16px;
    }
    .video-thumbnail {
      height: auto;
      width: 30%;
      margin-right: 16px;
    }
    .description {
      padding: 8px 0;
    }
  }
  @media only screen and (min-width: 1380px) {
    .video-title {
      font-size: 18px;
    }
    .video-search {
      padding: 16px 10%;
    }
    .video-item-section {
      margin-top: 16px;
    }
    .video-thumbnail {
      height: auto;
      width: 30%;
      margin-right: 16px;
    }
    .description {
      padding: 8px 0;
    }
  }
</style>
