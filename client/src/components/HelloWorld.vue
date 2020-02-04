<template>
  <div class="hello">
    <a href="http://localhost:3000/auth/github">
      <button>Sign-In With Github</button>
    </a>
    <button @click="sayHello">Say Hello</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  mounted() {
    this.checkIfLoggedIn();
  },
  methods: {
    checkIfLoggedIn() {
      // axios
      // .get('http://localhost:3000/auth/check')
      // .then(response => {
      //   console.log(response.data);
      // });

      axios
        .get("http://localhost:3000/auth/check", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
        .then(response => {
          if (response.headers["x-auth-token"]) {
            Object.assign(axios.defaults, {
              headers: {
                "x-auth-token": "Bearer " + response.headers["x-auth-token"],
                "refresh-token": "Bearer " + response.headers["refresh-token"]
              }
            });
          }
          console.log(response.data);
        });
    },
    sayHello() {
      axios.get("http://localhost:3000/hello").then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
