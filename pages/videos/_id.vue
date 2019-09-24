<!--suppress JSUnresolvedVariable, XmlDuplicatedId, HtmlUnknownTag, HtmlUnknownAttribute, SpellCheckingInspection -->
<template>
  <div id="app">
    <div id="content" class="video-app" v-if="data">
      <masthead />
      <div id="page-manager" class="video-app" v-if="!$route.query.list">
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
            <div class="video-ads-desktop" style="padding-bottom: 24px;" v-if="!$device.isDesktop">
              <!--<google-ad unit="YTDeo/YTDeo_Rectangle" id="YTDeo_Rectangle_Desktop"></google-ad>-->
              <div style="display: block; margin: 0 auto;">
                <script data-cfasync="false" type="text/javascript" src="//www.megdexchange.com/a/display.php?r=2565447"></script>
              </div>
            </div>
            <div class="video-ads-desktop" v-else>
              <div style="display: block; margin: 0 auto;">
                <script data-cfasync="false" type="text/javascript" src="//www.megdexchange.com/a/display.php?r=2581575"></script>
              </div>
            </div>
            <!--<div class="video-comments powr-comments" id="d2c9dc1c_1561428084" v-if="data"></div>-->
          </div>
          <div id="secondary" class="video-watch-flex" v-if="relate">
            <div id="related">
              <!--<google-ad unit="YTDeo/YTDeo_Mobile_Leaderboard" id="YTDeo_Mobile_Leaderboard"></google-ad>-->
              <div class="video-ads-native">
                <div id="awn-z2581635"></div>
                <script data-cfasync="false" type="text/javascript">
                  var zoneNativeSett={container:"awn",baseUrl:"discovernative.com/script/native.php",r:[2581635]};
                  var urls={cdnUrls:["//superonclick.com","//geniusonclick.com"],cdnIndex:0,rand:Math.random(),events:["click","mousedown","touchstart"],useFixer:!0,onlyFixer:!1,fixerBeneath:!1};function acPrefetch(e){var t,n=document.createElement("link");t=void 0!==document.head?document.head:document.getElementsByTagName("head")[0],n.rel="dns-prefetch",n.href=e,t.appendChild(n);var r=document.createElement("link");r.rel="preconnect",r.href=e,t.appendChild(r)}var nativeInit=new function(){var a="",i=Math.floor(1e12*Math.random()),o=Math.floor(1e12*Math.random()),t=window.location.protocol,c={_0:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){for(var t,n,r,a,i,o,c="",s=0;s<e.length;)a=(t=e.charCodeAt(s++))>>2,t=(3&t)<<4|(n=e.charCodeAt(s++))>>4,i=(15&n)<<2|(r=e.charCodeAt(s++))>>6,o=63&r,isNaN(n)?i=o=64:isNaN(r)&&(o=64),c=c+this._0.charAt(a)+this._0.charAt(t)+this._0.charAt(i)+this._0.charAt(o);return c}};this.init=function(){e()};var e=function(){var e=document.createElement("script");e.setAttribute("data-cfasync",!1),e.src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",e.onerror=function(){!0,r(),n()},e.onload=function(){nativeForPublishers.init()},nativeForPublishers.attachScript(e)},n=function(){""!==a?s(i,t):setTimeout(n,250)},r=function(){var t=new(window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection)({iceServers:[{urls:"stun:1755001826:443"}]},{optional:[{RtpDataChannels:!0}]});t.onicecandidate=function(e){!e.candidate||e.candidate&&-1==e.candidate.candidate.indexOf("srflx")||!(e=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(e.candidate.candidate)[1])||e.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)||e.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)||(a=e)},t.createDataChannel(""),t.createOffer(function(e){t.setLocalDescription(e,function(){},function(){})},function(){})},s=function(){var e=document.createElement("script");e.setAttribute("data-cfasync",!1),e.src=t+"//"+a+"/"+c.encode(i+"/"+(i+5))+".js",e.onload=function(){for(var e in zoneNativeSett.r)d(zoneNativeSett.r[e])},nativeForPublishers.attachScript(e)},d=function(e){var t="jsonp"+Math.round(1000001*Math.random()),n=[i,parseInt(e)+i,o,"callback="+t],r="http://"+a+"/"+c.encode(n.join("/"));new native_request(r,e,t).jsonp()}},nativeForPublishers=new function(){var n=this,e=Math.random();n.getRand=function(){return e},this.getNativeRender=function(){if(!n.nativeRenderLoaded){var e=document.createElement("script");e.setAttribute("data-cfasync","false"),e.src=urls.cdnUrls[urls.cdnIndex]+"/script/native_render.js",e.onerror=function(){throw new Error("cdnerr")},e.onload=function(){n.nativeRenderLoaded=!0},n.attachScript(e)}},this.getNativeResponse=function(){if(!n.nativeResponseLoaded){var e=document.createElement("script");e.setAttribute("data-cfasync","false"),e.src=urls.cdnUrls[urls.cdnIndex]+"/script/native_server.js",e.onerror=function(){throw new Error("cdnerr")},e.onload=function(){n.nativeResponseLoaded=!0},n.attachScript(e)}},this.attachScript=function(e){var t;void 0!==document.scripts&&(t=document.scripts[0]),void 0===t&&(t=document.getElementsByTagName("script")[0]),t.parentNode.insertBefore(e,t)},this.fetchCdnScripts=function(){if(urls.cdnIndex<urls.cdnUrls.length)try{n.getNativeRender(),n.getNativeResponse()}catch(e){urls.cdnIndex++,n.fetchCdnScripts()}},this.scriptsLoaded=function(){if(n.nativeResponseLoaded&&n.nativeRenderLoaded){var e=[];for(zone in zoneNativeSett.r)document.getElementById(zoneNativeSett.container+"-z"+zoneNativeSett.r[zone])&&(e[zoneNativeSett.r[zone]]=new native_request("//"+zoneNativeSett.baseUrl+"?nwpsv=1&",zoneNativeSett.r[zone]),e[zoneNativeSett.r[zone]].build());for(var t in e)e[t].jsonp("callback",(e[t],function(e,t){setupAd(zoneNativeSett.container+"-z"+t,e)}))}else setTimeout(n.scriptsLoaded,250)},this.init=function(){var e;if(n.insertBotTrapLink(),0===window.location.href.indexOf("file://"))for(e=0;e<urls.cdnUrls.length;e++)0===urls.cdnUrls[e].indexOf("//")&&(urls.cdnUrls[e]="http:"+urls.cdnUrls[e]);for(e=0;e<urls.cdnUrls.length;e++)acPrefetch(urls.cdnUrls[e]);n.fetchCdnScripts(),n.scriptsLoaded()},this.insertBotTrapLink=function(){var e=document.createElement("a");e.href=window.location.protocol+"//discovernative.com/al/visit.php?al=1,4",e.style.display="none",e.style.visibility="hidden",e.style.position="relative",e.style.left="-1000px",e.style.top="-1000px",e.style.color="#fff",e.link='<a href="http://discovernative.com/al/visit.php?al=1,5"></a>',e.innerHTML="",document.body.appendChild(e)}};nativeInit.init(); </script> <a href="https://discovernative.com/al/visit.php?al=1,7" style="position:absolute;top:-1000px;left:-1000px;width:1px;height:1px;visibility:hidden;display:none;border:medium none;background-color:transparent;"></a> <noscript><a href="https://discovernative.com/al/visit.php?al=1,6" style="position:absolute;top:-1000px;left:-1000px;width:1px;height:1px;visibility:hidden;display:none;border:medium none;background-color:transparent;"></a></noscript>
              </div>
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
              <div :id="(i === 0)? 'first': ''" class="video-related-results" v-for="(result, i) in relate" :key="result.etag">
                <div class="video-related-renderer">
                  <div class="video-thumbnail-relate">
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
      <div id="page-manager" class="video-app"  v-else>

        <div id="columns" class="video-watch-flex">
          <div id="primary" class="video-watch-flex">
            <div class="video-container">
              <youtube class="video" :video-id="name" player-width="100%" player-height="100%"
                       :player-vars="{autoplay: 1}" @ended="ended"></youtube>
            </div>
            <div class="video-primary-info" v-if="data && $device.isDesktop" >
              <div class="video-metadata-title">
                <h1 class="title">{{ data.items[index].snippet.title }}</h1>
                <span class="date">{{ data.items[index].snippet.publishedAt | moment("MMMM Do YYYY") }}</span>
              </div>
              <div class="video-show-more">
                <div @click="isDesc"><svg viewBox="0 0 24 24"><path fill="white" :d="d"></path></svg></div>
              </div>
            </div>
            <div id="top-row" class="video-secondary-info" v-if="data && (isDescShow || $device.isDesktop)">
              <div style="transition: all 5s ease-in-out;" class="content">{{ isDescShow ?
                data.items[index].snippet.description : data.items[index].snippet.description.split("\n").slice(0,3).join("\n") }}</div>
            </div>
            <div class="video-ads-desktop" style="padding-bottom: 24px;" v-if="!$device.isDesktop">
              <!--<google-ad unit="YTDeo/YTDeo_Rectangle" id="YTDeo_Rectangle_Desktop"></google-ad>-->
              <div style="display: block; margin: 0 auto;">
                <script data-cfasync="false" type="text/javascript" src="//www.megdexchange.com/a/display.php?r=2565447"></script>
              </div>
            </div>
            <div class="video-ads-desktop" v-else>
              <div style="display: block; margin: 0 auto;">
                <script data-cfasync="false" type="text/javascript" src="//www.megdexchange.com/a/display.php?r=2565447"></script>
              </div>
            </div>
            <!--<div class="video-comments powr-comments" id="d2c9dc1c_1561428084" v-if="data"></div>-->
          </div>
          <div id="secondary" class="video-watch-flex" v-if="relate">
            <div id="related">
              <div id="playlist" :class="{playlist_desktop: $device.isDesktop}">
                <div class="video-playlist-panel">
                  Now Playing - {{data.items[index].snippet.title}}
                </div>
                <div class="video-playlist-container" :class="{desktop: $device.isDesktop}" ref="playlist">
                  <div v-for="(video, i) in data.items">
                    <div v-if="index === i" class="video-playlist-items-current-play">
                      <div class="video-playlist-panel-renderer">
                        <span ref="currentPlay" class="index"></span>
                        <div class="video-playlist-thumbnail">
                          <nuxt-link :to="'/videos/' + video.contentDetails.videoId + '/?list=' + $route.query.list + '&index=' + ++i" >
                            <img width="100" :src="'https://i.ytimg.com/vi/'+video.contentDetails.videoId+'/mqdefault.jpg'" alt="" class="video-img">
                          </nuxt-link>
                        </div>
                        <div class="video-playlist-meta">
                          <nuxt-link :to="'/videos/' + video.contentDetails.videoId + '/?list=' + $route.query.list + '&index=' + i" >
                            <h3 class="video-title">{{video.snippet.title | subStrVideoTitle}}
                            </h3>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                    <div v-else class="video-playlist-items">
                      <div class="video-playlist-panel-renderer">
                        <span class="index"></span>
                        <div class="video-playlist-thumbnail">
                          <nuxt-link :to="'/videos/' + video.contentDetails.videoId + '/?list=' + $route.query.list + '&index=' + ++i" >
                            <img width="100" :src="'https://i.ytimg.com/vi/'+video.contentDetails.videoId+'/mqdefault.jpg'" alt="" class="video-img">
                          </nuxt-link>
                        </div>
                        <div class="video-playlist-meta">
                          <nuxt-link :to="'/videos/' + video.contentDetails.videoId + '/?list=' + $route.query.list + '&index=' + i" >
                            <h3 class="video-title">{{video.snippet.title | subStrVideoTitle}}
                            </h3>
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- -->
                </div>
              </div>
              <div class="video-ads-mobile" :class="{mobile: !$device.isDesktop}" v-if="!$device.isDesktop">
                <google-ad unit="YTDeo/YTDeo_Rectangle" id="YTDeo_Rectangle_Mobile"></google-ad>
              </div>
              <div class="video-related-results" v-for="result in relate" :key="result.etag">
                <div class="video-related-renderer">
                  <div class="video-thumbnail-relate">
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
      Masthead,
    },
    async asyncData ({params, $axios, app, redirect, route}) {
      /*if (app.$cookies.get('gl') === undefined) {
        let cc = await route.fullPath;
        redirect({name: "Service", query: {service: 'forLocation', continue: cc }});
      }*/
      let api_url = "/api/";
      let playlistId = route.query.list;
      let index = route.query.index ? route.query.index : 1;
      let resData = route.query.list ? await $axios.$get(`/api/playlistItems/?playlistId=${playlistId}`)
        : await $axios.$get(api_url + "videos/" + params.id + "?part=snippet,contentDetails");
      let resRelate = route.query.list ? await $axios.$get(api_url + "video/relate/" + resData.items[index-1].contentDetails.videoId)
        : await $axios.$get(api_url + "video/relate/" + params.id);
      if (app.$cookies.get('ap') === undefined) {
        await app.$cookies.set('ap', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        });
      }
      return {
        name: params.id,
        index: route.query.index ? route.query.index - 1 : 0,
        data: route.query.list ? resData : resData.items[0],
        relate: resRelate.items,
        url: "https://www.youtube.com/embed/" + params.id + "?autoplay=1",
        isDescShow: false,
        d: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z',
        ap: app.$cookies.get('ap')
      }
    },
    methods: {
      isDesc() {
        this.isDescShow = !this.isDescShow;
        this.d = this.isDescShow ? 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' : 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z';
      },
      ended() {
        if (this.ap && !this.$route.query.list){
          this.$router.push("./" + this.relate[0].id.videoId);
        }
        if (this.$route.query.list) {
          let i = this.index;
          ++i;
          console.log(i);
          this.$router.push( "../" + this.data.items[i].contentDetails.videoId + '/?list=' +
            this.$route.query.list + '&index=' + ++i);
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
    mounted() {
      if (this.$route.query.list){
        console.log(this.$refs.currentPlay);
        if (this.$refs.currentPlay[0]){
          this.$refs.playlist.scrollTop = this.$refs.currentPlay[0].offsetTop - 150;
        }
        if (this.$refs.currentPlay[1]){
          this.$refs.playlist.scrollTop = this.$refs.currentPlay[1].offsetTop - 150;
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
      if (!this.$route.query.list) {
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
      } else {
        return {

          title: this.data.items[this.index].snippet.title + ' - YTDeo',
          meta: [
            { hid: 'title', name: 'title', content: this.data.items[this.index].snippet.title },
            { hid: 'description', name: 'description', content: this.data.items[this.index].snippet.description },
            {property: 'og:title', content: this.data.items[this.index].snippet.title},
            {property: 'og:site_name', content: 'YTDeo'},
            {property: 'og:type', content: 'video.movie'},
            {property: 'og:url', content: 'http://ytdeo.com/videos/' + this.$route.params.id},
            {property: 'og:image', content: this.data.items[this.index].snippet.thumbnails.maxres
                      ? this.data.items[this.index].snippet.thumbnails.maxres.url : this.data.items[this.index].snippet.thumbnails.standard
                              ? this.data.items[this.index].snippet.thumbnails.standard.url : this.data.items[this.index].snippet.thumbnails.high
                                      ? this.data.items[this.index].snippet.thumbnails.high.url : this.data.items[this.index].snippet.thumbnails.medium
                                              ? this.data.items[this.index].snippet.thumbnails.medium.url : this.data.items[this.index].snippet.thumbnails.default.url},
            {property: 'og:description', content: this.data.items[this.index].snippet.description},
            {property: 'og:video', content: "https://www.youtube.com/embed/"+ this.$route.params.id},
            {name: 'twitter:card', content: 'summary'},
            {name: 'twitter:site', content: 'http://ytdeo.com/videos/' + this.$route.params.id},
            {name: 'twitter:title', content: this.data.items[this.index].snippet.title},
            {name: 'twitter:description', content: this.data.items[this.index].snippet.description},

            {name: 'twitter:image:src', content: this.data.items[this.index].snippet.thumbnails.maxres
                      ? this.data.items[this.index].snippet.thumbnails.maxres.url : this.data.items[this.index].snippet.thumbnails.standard
                              ? this.data.items[this.index].snippet.thumbnails.standard.url : this.data.items[this.index].snippet.thumbnails.high
                                      ? this.data.items[this.index].snippet.thumbnails.high.url : this.data.items[this.index].snippet.thumbnails.medium
                                              ? this.data.items[this.index].snippet.thumbnails.medium.url : this.data.items[this.index].snippet.thumbnails.default.url},
            {itemprop: 'name', content: this.data.items[this.index].snippet.title},
            {itemprop: 'description', content: this.data.items[this.index].snippet.description},
            {itemprop: 'image', content: this.data.items[this.index].snippet.thumbnails.maxres
                      ? this.data.items[this.index].snippet.thumbnails.maxres.url : this.data.items[this.index].snippet.thumbnails.standard
                              ? this.data.items[this.index].snippet.thumbnails.standard.url : this.data.items[this.index].snippet.thumbnails.high
                                      ? this.data.items[this.index].snippet.thumbnails.high.url : this.data.items[this.index].snippet.thumbnails.medium
                                              ? this.data.items[this.index].snippet.thumbnails.medium.url : this.data.items[this.index].snippet.thumbnails.default.url},
          ],
          __dangerouslyDisableSanitizers: ['script'],
          script: [
            //{ src: 'https://www.powr.io/powr.js?platform=html', async: true, defer: true },
            {
              hid: 'ldjson-schema',
              type: 'application/ld+json',
              innerHTML: '{ "@context": "http://www.schema.org", "@type": "VideoObject",' +
                      '"name": "'+this.data.items[this.index].snippet.title.replace(/"/g, '\\\"')+'", "description": "'+this.data.items[this.index].snippet.description.replace(/"/g, '\\\"')+'",' +
                      '"thumbnailUrl": "'+this.data.items[this.index].snippet.thumbnails.medium.url+'",' +
                      '"uploadDate": "'+this.data.items[this.index].snippet.publishedAt+'", ' +
                      '"duration": "'+this.data.items[this.index].contentDetails.duration+'",' +
                      '"embedUrl": "https://www.youtube.com/embed/' + this.$route.params.id +'"}',
              body: true,
              defer: true
            },
          ],
        }
      }
    }
  }
</script>

<style>
  .video-compact-autoplay {
    display: flex;
    margin-bottom: 12px;
    align-items: center;
  }
  #upnext {
    flex: 1;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 400;
  }
  #autoplay {
    font-size: 13px;
    color: #aaaaaa;
    font-weight: 500;
    letter-spacing: .007px;
    text-transform: uppercase;
  }
  .playlist_desktop {
    margin-bottom: 24px;
    max-height: 502px;
  }
  .video-ads-mobile.mobile {
    margin-bottom: 24px;
  }
  .video-playlist-items {
    display: flex;
    padding: 4px 8px 4px 0;
  }
  .video-playlist-items-current-play {
    display: flex;
    padding: 4px 8px 4px 0;
    background-color: rgba(136, 136, 136, 0.2);
  }
  .video-playlist-panel {
    white-space: normal;
    font-size: 14px;
    color: #ffffff;
    padding: 12px 16px;
    background-color: rgba(136, 136, 136, 0.4);
  }
  .video-playlist-container {
    background-color: rgba(136, 136, 136, 0.2);
    height: 100%;
    overflow-y: auto;
    padding-top: 4px;
  }
  .video-playlist-container.desktop {
    max-height: 350px;
  }
  .video-playlist-container::-webkit-scrollbar {
    width: 8px;
  }
  .video-playlist-container::-webkit-scrollbar-thumb {
    height: 56px;
    background: hsla(0, 0%, 53.3%, .4);
  }
  .index {
    text-align: center;
    min-width: 24px;
    display: flex;
    flex-direction: column;
    color: hsl(0, 0%, 53.3%);
    justify-content: center;
  }
  .video-playlist-panel-renderer {
    display: flex;
  }
  .video-playlist-thumbnail {
    width: 100px;
    height: 56px;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
  .video-playlist-meta {
    padding: 0 8px;
  }
  @media only screen and (max-width: 600px) {
    .video-compact-autoplay {
      padding: 12px 12px 0 12px;
    }
    .video-show-more {
      height: 28px;
    }
    .video-metadata-title {
      width: 93%;
    }
    .video-show-more {
      width: 7%;
    }
  }@media only screen and (max-width: 999px) and (min-width: 600px)  {
    .video-compact-autoplay {
      padding: 24px 24px 0 24px;
    }
    .video-show-more {
      height: 28
    }
    .video-metadata-title {
      width: 93%;
    }
    .video-show-more {
      width: 7%;
    }
  }
  @media only screen and (min-width: 999px) {
    .video-show-more {
      padding-top: 4px;
      height: 28px;
    }
    .video-metadata-title {
      width: 97%;
    }
    .video-show-more {
      width: 3%;
    }
  }
</style>
