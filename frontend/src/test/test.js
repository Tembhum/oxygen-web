const axios = require("axios").default;

// const data = {
//   firstName: "first",
//   lastName: "last",
//   userName: "test",
//   age: 12,
//   phone: "0801234567",
//   location: "testing centre",
//   passwd: "password",
//   type: 1,
// };

// const dataDevice = {
//   barcode: "cccccc",
//   name: "",
//   serialNo: "",
//   status: 4,
//   userId: 3,
// };

// const dataUpdate = {
//   barcode: "bbbbbb",
//   name: "",
//   serialNo: "",
//   status: 4,
//   user: {
//     id: 3,
//   },
// };

// axios.post("http://localhost:8080/user", data, {
//   headers: {
//     "content-type": "application/json",
//   },
// }).then(console.log);

// axios
//   .post("http://localhost:8080/device", dataDevice, {
//     headers: {
//       "content-type": "application/json",
//     },
//   })
//   .then(console.log);

// axios
//   .put("http://localhost:8080/device/2", dataUpdate, {
//     headers: {
//       "content-type": "application/json",
//     },
//   })
//   .then(console.log);

try{
 axios.get("http://localhost:8080/user/username/new");
} catch {
  console.log("catch");
}

// try {
//   axios.get("http://localhost:8080/user/username/test").then(console.log);
// } catch (e) {
//   console.log(e);
// }