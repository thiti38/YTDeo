export const state = () => ({
  location: "",
  popularAll: []
});

export const mutations = {
  SET_LOCATION (state, locationData) {
    state.location = locationData.countryCode;
  },
  SET_MOST_POPULAR (state, resData) {
    state.popularAll = resData;
  }
};

export const actions = {
  async GET_LOCATION ({state, commit}) {
    let locationData = await this.$axios.$get("http://ip-api.com/json");
    await commit('SET_LOCATION', locationData);
  }
};

export const getters = {
  getLocation: state => state.location,
  getPopularAll: state => state.popularAll
};
