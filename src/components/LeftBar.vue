<script setup>
import {
  authStore,
  bodyStore,
  componentStore,
  leftBarStore,
} from "@/store/store";
import { ref } from "vue";

const btns = ref(leftBarStore.BUTTONS_MENU[authStore.role]);
</script>

<template>
  <div class="left-bar">
    <!-- <div class="left-bar-head">
      <h4>Панель инструментов</h4>
    </div> -->
    <div class="left-bar-body">
      <div
        v-for="btn in btns"
        :class="btn.clickedClass"
        @click="
          () => {
            btn.changeActive();
            componentStore.changeCurrentComponent(
              btn.name,
              btn.component,
              true
            );
          }
        "
        class="left-bar-btn"
      >
        <img :src="btn.icon" alt="иконка" />
        <p>{{ btn.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10%;
  height: 100%;
}

.left-bar-head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: large;
  font-weight: bold;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: white;
}

.left-bar-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  /* padding: 5%; */
  border-radius: 8px;
  /* background-color: #e0f7ff; */
}

.left-bar-btn {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  width: 95%;
  height: 50px;
  padding: 5%;
  padding-left: 15px;
  transition: 0.3s;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 1px 1px 2px 0px rgba(34, 60, 80, 0.2);
}

.left-bar-btn > img {
  width: 22px;
  height: 22px;
  margin-right: 15px;
}

.left-bar-btn > p {
  text-transform: uppercase;
}

.btn-clicked {
  background-color: #e7e7e7;
  margin-left: 10px;
}

.left-bar-btn:hover {
  cursor: pointer;
  margin-left: 10px;
  background-color: #e7e7e7;
}
</style>
