<template>
  <div class="hello">
    <a href="http://localhost:3000/auth/github">
      <button>Sign-In With Github</button>
    </a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  mounted(){
    this.checkIfLoggedIn()
  },
  methods: {
    checkIfLoggedIn() {
      // axios
      // .get('http://localhost:3000/auth/check')
      // .then(response => {
      //   console.log(response.data);
      // });
     
      axios
      .get('http://localhost:3000/auth/check', {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      .then(response => {
        console.log(response.data);
      });
    }
  }
}
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
