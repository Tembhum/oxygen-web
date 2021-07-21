const axios = require("axios").default;

const data = {
  firstName: "first",
  lastName: "last",
  userName: "admin",
  phone: "0801234567",
  location: "testing centre",
  passwd: "password",
  type: 1,
  caseNo: 1,
};

const dataDevice = {
  barcode: "cccccc",
  name: "",
  serialNo: "",
  status: 4,
  userId: 1,
};

const dataUpdate = {
  barcode: "bbbbbb",
  name: "",
  serialNo: "",
  status: 4,
  user: {
    id: 1,
  },
};

// axios
//   .post("http://localhost:8080/user", data, {
//       "content-type": "application/json",
//       auth: {
//         username: "admin",
//         password: "password",
//       },
//   })
//   .then(console.log);

// axios
//   .post("http://localhost:8080/device", dataDevice, {
//     "content-type": "application/json",
//     auth: {
//       username: "admin",
//       password: "password",
//     },
//   })
//   .then(console.log);

// axios
//   .put("http://localhost:8080/device/1", dataUpdate, {
//     "content-type": "application/json",
//     auth: {
//       username: "admin",
//       password: "password",
//     },
//   })
//   .then(console.log);

// try {
//   axios.get("http://localhost:8080/user/username/new");
// } catch {
//   console.log("catch");
// }

try {
  axios
    .get("https://oxyfight.thaicna.org:8443/users", {
      auth: {
        username: "oxyapi",
        password: "alwaysbekind",
      },
    })
    .then((res) => {
      console.log(res.data.content);
    });
} catch (e) {
  console.log(e);
}

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


