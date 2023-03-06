import axios from "../../node_modules/axios/dist/esm/axios.js";
// import axios from "axios";

const API_URL = "https://640036b163e89b0913a95f6f.mockapi.io/users";

export function getPersonAPI(value) {
  return axios({
    method: "GET",
    url: API_URL,
    params: {
      category: value || undefined,
    },
  });
}

export function getPersonByID(personID) {
  return axios({
    method: "GET",
    url: `${API_URL}/${personID}`,
  });
}

export function createPersonAPI(person) {
  return axios({
    method: "POST",
    url: API_URL,
    data: person,
  });
}

export function updatePersonAPI(personID, person) {
  return axios({
    method: "PUT",
    url: `${API_URL}/${personID}`,
    data: person,
  });
}

export function deletePersonAPI(personID, userType) {
  return axios({
    method: "DELETE",
    url: `${API_URL}/${personID}`,
    params: {
      category: userType || undefined,
    },
  });
}
