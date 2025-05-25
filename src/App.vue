<script setup>
import { RouterView, useRouter } from "vue-router";
import Header from "./components/Header.vue";
import { getCookie } from "./utils/cookie.util";
import LeftBar from "./components/LeftBar.vue";
import { onMounted, ref, watch, watchEffect } from "vue";
import { authStore, leftBarStore } from "./store/store";
import Head from "./components/Head.vue";
import Login from "./views/auth/Login.vue";

const auth = ref(false);

watchEffect(() => {
  auth.value = authStore.isAuth;
});
</script>

<template>
  <Header />
  <Login v-if="!authStore.isAuth" />
  <div class="container" v-if="authStore.isAuth">
    <LeftBar />
    <main>
      <Head v-if="!leftBarStore.allDeactive" />
      <RouterView />
    </main>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  height: 93.12vh;
  padding: 10px;
  border-radius: 6px;
  background: linear-gradient(45deg, rgb(154, 200, 207) 44%, rgb(82, 182, 156));
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 89%;
  height: 100%;
  padding: 0.5%;
  border-radius: 8px;
  box-shadow: 3px 3px 7px 0px rgba(34, 60, 80, 0.2);
  background-color: #e6f5fa;
}

.block {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 93%;
  padding: 1%;
  border-radius: 8px;
  background-color: white;
}

.btn {
  width: fit-content;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #003fe9;
  border: none;
  cursor: pointer;
}

.btn-small {
  width: fit-content;
  color: white;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #003fe9;
  border: none;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40vw;
  height: auto;
  padding: 35px;
  padding-top: 15px;
  border-radius: 5px;
  background-color: #e6f5fa;
}

.form-caption {
  margin-top: 15px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85%;
  height: auto;
}

.item-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
}

.item-input > label {
  margin-bottom: 10px;
}

.item-input > input {
  width: auto;
  height: 40px;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
}

.item-input > select {
  height: 40px;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
}

.form-btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 85%;
  height: auto;
}

.form-btns > button {
  width: 30%;
  height: 40px;
  border: none;
  color: white;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 5px;
  background-color: #003fe9;
  margin-bottom: 5px;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
}

.item {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-bottom: 25px;
  font-size: medium;
}

.item-data {
  display: flex;
  flex-direction: column;
  width: auto;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 25px;
  font-size: medium;
}

.item-data label {
  font-size: 14px;
  margin-bottom: 5px;
  color: grey;
}

.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  height: 5%;
  margin-top: 5px;
}

.pagination-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  border-radius: 8px;
  background-color: #d5fcff;
  cursor: pointer;
}
</style>
