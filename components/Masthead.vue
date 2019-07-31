<template>
  <div id="masthead-container" class="video-app">
    <div class="video-logo">
      <nuxt-link :to="'/'" >
        <img src="/YTDeo.jpg" alt="YTDeo">
      </nuxt-link>
    </div>
    <div class="video-masthead-search">
      <div id="container" class="video-masthead">
        <form @submit.prevent="submit" id="search-form" action="/results" class="video-searchbox">
          <div id="search-input" class="video-searchbox-label">
            <input id="search" name="search_query" v-model="search_query"
                   placeholder="Search" v-on:keyup="handleSearch"  @focus="onFocus"
                   @blur="onBlur" />
          </div>
        </form>
      </div>
      <div v-if="in_search && search_result" class="video-search-result">
        <div v-if="search_result" v-bind:class="{result_block: in_search}">
          <div v-for="result in search_result" class="video-search-result-text">
            <div href="JavaScript:Void(0);" @click="onClickSubmit(result[0])">{{result[0]}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-multi-page-menu" @click="isSelectRegion = !isSelectRegion">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           width="24" height="24"
           viewBox="0 0 24 24"
           style=" fill:#909090;">    <path d="M 20 0 C 17.791 0 16 1.791 16 4 C 16 6.062 18.082188 8.7932969 19.242188 10.154297 C 19.641188 10.622297 20.358812 10.622297 20.757812 10.154297 C 21.916813 8.7932969 24 6.062 24 4 C 24 1.791 22.209 0 20 0 z M 12 2 C 8.739 2 5.8465312 3.577 4.0195312 6 L 4 6 L 4 6.0253906 C 2.429 8.1233906 1.6473438 10.844812 2.1523438 13.757812 C 2.8553437 17.812812 6.0867187 21.094078 10.136719 21.830078 C 16.465719 22.979078 22 18.124 22 12 C 22 11.93 21.991234 11.861969 21.990234 11.792969 C 21.753234 12.058969 21.557453 12.267672 21.439453 12.388672 L 19.681641 14.216797 C 19.335641 15.413797 18.712531 16.491672 17.894531 17.388672 C 17.635531 16.584672 16.89 16 16 16 L 15 16 L 15 14 C 15 12.895 14.105 12 13 12 L 10 12 C 9.448 12 9 11.552 9 11 C 9 10.448 9.448 10 10 10 C 10.552 10 11 9.552 11 9 L 11 8 C 11 7.448 11.448 7 12 7 L 13 7 C 13.589 7 14.114469 6.7409375 14.480469 6.3359375 C 14.188469 5.5549375 14 4.762 14 4 C 14 3.397 14.090812 2.8165781 14.257812 2.2675781 C 13.530813 2.0985781 12.777 2 12 2 z M 20 2.5703125 C 20.789 2.5703125 21.429688 3.211 21.429688 4 C 21.429688 4.789 20.789 5.4296875 20 5.4296875 C 19.211 5.4296875 18.570312 4.789 18.570312 4 C 18.570312 3.211 19.211 2.5703125 20 2.5703125 z M 4.2109375 10.210938 L 6 12 L 9 15 L 9 16 C 9 17.105 9.895 18 11 18 L 11 19.931641 C 7.06 19.436641 4 16.072 4 12 C 4 11.384 4.0779375 10.786937 4.2109375 10.210938 z"></path></svg>
      <div v-if="$device.isDesktopOrTablet" class="video-formatted-string">Region:&nbsp;{{currentGL}}</div>
      <div v-else class="video-formatted-string">{{currentGL}}</div>
    </div>
    <div class="ytd-multi-page-menu" v-if="isSelectRegion" v-click-outside="onClickOutside">
      <div class="video-simple-menu-header">
        <div id="header" class="ytd-multi-page-menu">
          <div id="close-button">
            <div class="video-icon-button" @click="isSelectRegion = false">
              <svg viewBox="0 0 24 24" height="24px" style="fill: #ffffff" width="24px"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            </div>
            <div id="headerTitle" class="video-simple-menu-header">
              Choose your Region
            </div>
          </div>
        </div>
      </div>
      <div id="sections">
        <div class="list-long">
          <div class="list-item" v-on:click="toChangeRegion(gl.id)" :class="itemSelected(gl.id)" v-for="gl in glList">
            <div class="video-icon" v-if="isItemSelected(gl.id)">
              <svg width="24px" height="24px" viewBox="0 0 24 24" style="fill: #888888" preserveAspectRatio="xMidYMid meet" focusable="false">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" class="style-scope yt-icon"></path>
              </svg>
            </div>
            {{gl.snippet.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["q"],
    data() {
      return {
        isSelectRegion: false,
        search_query: this.$route.query.search_query,
        search_result: "",
        in_search: false,
        glList: [],
        currentGL: this.$cookies.get('gl'),
      }
    },
    async created() {
      if (this.$cookies.get('gl') === undefined || this.$cookies.get('gl') === "") {
        let locationData = await this.$axios.$get("http://ip-api.com/json/");
        locationData = locationData.countryCode;
        this.$cookies.set('gl', locationData, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        });
        this.currentGL = locationData;
      }
      this.$axios.$get("regionListMin.json").then(res => {
        this.glList = res;
      });
    },
    methods: {
      onClickOutside() {
        this.isSelectRegion = false;
      },
      itemSelected(gl){
        return {
          selected: gl.toUpperCase() === this.currentGL.toUpperCase()
        }
      },
      isItemSelected(gl){
        return gl.toUpperCase() === this.currentGL.toUpperCase()
      },
      toChangeRegion(gl){
        this.$router.push({name: "Service", query: {service: 'forchangeregion', continue: this.$route.fullPath, gl: gl }});
      },
      onFocus() {
        this.in_search = true
      },
      onBlur() {
        setTimeout(() => this.in_search=false, 500);
      },
      toHome() {
        this.$router.push('/');
      },
      handleSearch () {
        this.$axios.$get("http://34.67.204.12/search?q=" + this.search_query + "&gl=" +
        this.$cookies.get('gl')).then(res => {
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
  }
</script>

<style>
  .video-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
  }
  .video-logo img {
    width: 100px;
  }
  .video-search-result{
    margin: 0 16px;
    background-color: #ffffff;
  }
  .result_block{
    //padding: 20px 0;
  }
  .video-multi-page-menu {
    display: flex;
    cursor: pointer;
    margin: auto;
    padding-right: 24px;
  }
  .video-formatted-string {
    color: #888888;
    margin: auto;
    padding-left: 4px;
  }
  .ytd-multi-page-menu {
    position: fixed;
    display: flex;
    flex-direction: column;
    right: 24px;
    top: 48px;
    z-index: 1000;
    background-color: #242424;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.4);
    width: 300px;
    max-width: 300px;
  }
  .video-simple-menu-header {
    flex: none;
    height: 48px;
    justify-content: center;
  }
  #header.ytd-multi-page-menu {
    background-color: #88888866;
    height: 48px;
    display: flex;
    justify-content: center;
  }
  #close-button {
    margin: 0 4px;
    display: flex;
    align-items: center;
  }
  #headerTitle {
    padding-right: 24px;
    color: #fff;
    line-height: 48px;
    font-size: 16px;
  }
  #sections {
    //padding: 8px 0;
  }
  .list-long {
    display: block;
    padding: 8px 0;
    max-height: 514px;
    overflow: auto;
  }
  .list-long::-webkit-scrollbar {
    width: 8px;
  }
  .list-long::-webkit-scrollbar-thumb {
    height: 56px;
    background: hsla(0, 0%, 53.3%, .4);
  }
  .list-item {
    align-items: center;
    color: #888888;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    min-height: 40px;
    padding-left: 56px;
    padding-right: 16px;
  }
  .list-item.selected {
    padding-left: 16px;
  }
  .list-item:hover {
    background-color: #3A3A3A;
  }
  .video-icon {
    display: flex;
    padding-right: 16px;
  }
  .video-icon-button {
    display: flex;
    cursor: pointer;
    padding: 8px;
  }
  .video-content-icon{
    height: 24px;
  }
  .video-search-result-text div{
    cursor: default;
    padding: 4px 12px;
    font-size: 17px;
    color: #000000;
  }
  .video-search-result-text div:hover{
    background-color: #eaeaea;
  }
</style>
