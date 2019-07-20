<template>
    <div>
    </div>
</template>

<script>
    export default {
      async asyncData({route, app, $axios}){
        return {
          service: route.query.service,
          continue: route.query.continue,
          isHome: route.query.isHome,
          gl: route.query.gl,
        }
      },
      async created() {
        if (this.service.toLowerCase() === 'forlocation') {
          let locationData = await this.$axios.$get("http://ip-api.com/json/");
          this.$cookies.set('gl', locationData.countryCode, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
          if(this.isHome) {
            return this.$router.push(this.continue);
          }
          return this.$router.push(this.continue);
        }
        if(this.service.toLowerCase() === 'forchangeregion') {
          this.$cookies.set('gl', this.gl, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          });
          return this.$router.push({path: this.continue, query: {gl: this.gl}});
        }
      },
    }
</script>

<style scoped>

</style>
