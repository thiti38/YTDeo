export const state = () => ({
  location: "",
});

export const mutations = {
  SET_LOCATION (state, locationData) {
    state.location = locationData.countryCode;
  },
  SET_LOCATION_GL (state, GL) {
    state.location = GL;
  },
};

export const actions = {
  async GET_LOCATION_IP ({state, commit}, ip) {
    let locationData = await this.$axios.$get("http://ip-api.com/json/" + ip);
    await commit('SET_LOCATION', locationData);
  },
  async GET_LOCATION ({commit}) {
    let locationData = await this.$axios.$get("http://ip-api.com/json/");
    await commit('SET_LOCATION', locationData);
  },
};

export const getters = {
  getLocation: state => state.location,
};
