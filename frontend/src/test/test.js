const axios = require("axios").default;
const env = require("dotenv");

//  const env = dotenv.config().parsed;

const data = {
  firstName: "first",
  lastName: "last",
  userName: "test",
  phone: "0801234567",
  location: "testing centre",
  passwd: "password",
  type: 1,
  caseNo: 1,
};

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

// axios
//   .post("http://localhost:8080/user", data, {
//     headers: {
//       "content-type": "application/json",
//       Authorization: {
//         username: "test",
//         password: "password",
//       },
//     },
//   })
//   .then(console.log);

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

// try {
//   axios.get("http://localhost:8080/user/username/new");
// } catch {
//   console.log("catch");
// }

// try {
//   axios.get("http://localhost:8080/user/username/test").then(console.log);
// } catch (e) {
//   console.log(e);
// }

// axios
//   .get(
//     "http://EC2Co-EcsEl-O4IIWNOGGYB-671549001.ap-southeast-1.elb.amazonaws.com:8080/user/username/test"
//   )
//   .then(console.log);

// axios
//   .delete(
//     "http://EC2Co-EcsEl-O4IIWNOGGYB-671549001.ap-southeast-1.elb.amazonaws.com:8080/user/8"
//   )
//   .then(console.log);

console.log(process.env.LOCAL_URL)
