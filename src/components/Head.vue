<script setup>
import { bodyStore, componentStore } from "@/store/store";
import ListUsers from "@/views/admin/users/ListUsers.vue";
</script>

<template>
  <div class="head">
    <div
      v-if="componentStore.showBtnPrev"
      class="btn-prev"
      @click="componentStore.goToPrevPath()"
    >
      Назад
    </div>
    <p>
      {{ componentStore.currentComponent.name }}
    </p>
    <!-- <div class="path" v-for="(component, index) in componentStore.currentPath" :key="index">
      <label v-if="index === 0"></label>
      <label v-else></label>
      <p class="name-path" @click="() => componentStore.goToPath(index)">
        {{ component.name }}
      </p>
    </div> -->
  </div>
</template>

<style scoped>
.head {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 6%;
  padding: 5px;
  padding-left: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: white;
}

.btn-prev {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  border-radius: 8px;
  color: white;
  background-color: #003fe9;
  cursor: pointer;
}

.head > p {
  font-weight: 600;
}

.path {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: auto;
  height: auto;
}

.path label {
  margin-right: 5px;
  margin-left: 5px;
}

.name-path {
  cursor: pointer;
}
</style>
