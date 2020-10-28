import { useHistory } from "react-router-dom";

const serverDomain = "https://agile-dawn-27017.herokuapp.com";

export const getAllServices = async () => {
  const url = serverDomain + "/api/get-services/";
  let data = {};
  await fetch(url)
    .then((res) => res.json())
    .then((d) => (data = d))
    .catch((err) => console.log(err));

  return data;
};

export const registerVolunteer = async (data) => {
  const url = serverDomain + "/api/register/";
  let result;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      result = res;
    })
    .catch((err) => (result = err));

  return result;
};

export const getSelectedServices = async (data) => {
  const url = serverDomain + "/api/selected-service";
  let result;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => (result = data))
    .catch((err) => (result = err));
  return result;
};

export const cancelService = async (data) => {
  const url = serverDomain + "/api/cancel-service";
  let result;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => (result = data))
    .catch((err) => (result = err));
  return result;
};

export const getAllVolunteer = async () => {
  const url = serverDomain + "/api/volunteers";
  let result;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => (result = data))
    .catch((err) => (result = err));

  return result;
};

export const deleteRegisterEntry = async (data) => {
  const url = serverDomain + "/api/delete-entry";
  let result;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => (result = res))
    .catch((err) => (result = err));

  return result;
};
