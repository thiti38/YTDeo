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
      }
    }
</script>

<style scoped>

</style>
