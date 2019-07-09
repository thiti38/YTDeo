export const state = () => ({
  location: ""
});

export const mutations = {
  SET_LOCATION (state, locationData) {
    state.location = locationData.countryCode
  }
};

export const actions = {
  async GET_LOCATION ({commit}) {
    let locationData = await this.$axios.$get("http://ip-api.com/json");
    commit('SET_LOCATION', locationData);
  }
};

export const getters = {
  getLocation: state => state.location
};
