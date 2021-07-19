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
//   caseNo: 1,
// };

// const dataDevice = {
//   barcode: "cccccc",
//   name: "",
//   serialNo: "",
//   status: 4,
//   userId: 1,
// };

const dataUpdate = {
  barcode: "bbbbbb",
  name: "",
  serialNo: "",
  status: 4,
  user: {
    id: 1,
  },
};

axios
  .post("http://localhost:8080/user", data, { 
      "content-type": "application/json",
      auth: {
        username: "admin",
        password: "password",
      },
  })
  .then(console.log);

// axios
//   .post("http://localhost:8080/device", dataDevice, { 
//       "content-type": "application/json",
//       auth: {
//         username: "admin",
//         password: "password",
//       },
//   })
//   .then(console.log);

// axios
//   .put("http://localhost:8080/device/1", dataUpdate, { 
//       "content-type": "application/json",
//       auth: {
//         username: "admin",
//         password: "password",
//       },
//   })
//   .then(console.log);

try {
  axios
    .get("http://localhost:8080/devices", {
      auth: {
        username: "admin",
        password: "password",
      },
    })
    .then(res => {console.log(res.data.content)});
} catch {
  console.log("catch");
}

// try {
//   axios.get("http://localhost:8080/user/username/test").then(console.log);
// } catch (e) {
//   console.log(e);
// }
