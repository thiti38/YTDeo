<template>
    <div>
    </div>
</template>

<script>
    export default {
      async asyncData({route}){
        return {
          service: route.query.service,
          continue: route.query.continue,
        }
      },
      async created() {
        await this.$store.dispatch('GET_LOCATION');
        if (this.service.toLowerCase() === 'forlocation') {
          this.$router.push(this.continue);
        }
      }
    }
</script>

<style scoped>

</style>
