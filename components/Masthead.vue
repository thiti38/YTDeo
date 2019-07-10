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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ["q"],
    data() {
      return {
        search_query: this.$route.query.search_query,
        search_result: "",
        in_search: false
      }
    },
    methods: {
      onFocus() {
        this.in_search = true
      },
      onBlur() {
        setTimeout(() => this.in_search=false, 500);
      },
      handleSearch () {
        this.$axios.$get("http://34.67.204.12/search?q=" + this.search_query + "&gl=" + this.getLocation).then(res => {
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

    beforeCreate() {
      this.$store.dispatch('GET_LOCATION')
    },
    computed: {
      ...mapGetters([
        'getLocation'
      ])
    }
  }
</script>

<style scoped>
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
    padding: 20px 0;
  }
  .video-search-result-text{
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
