<script setup lang="ts">
import API_SERVER from "@/constants/API.constant";
import { authStore } from "@/store/store";
import { ref, watchEffect } from "vue";
import { RouterLink } from "vue-router";

const userData = ref({
  surname: "",
  name: "",
  role: "",
});
const showBadgeMenu = ref(false);

watchEffect(async () => {
  if (authStore.role !== "СУПЕР_АДМИНИСТРАТОР" && authStore.token) {
    const response = await fetch(API_SERVER.USERS.GET_ONE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    const data = await response.json();

    if (response.status === 200) {
      userData.value.surname = data.surname;
      userData.value.name = data.name;
      userData.value.role = data.roles;
    }
  }
});
</script>

<template>
  <header>
    <RouterLink to="/" class="logo">
      <img src="../assets/img/logo.png" alt="Лолотип" width="25" height="30" />
      <h3>АВИАЛЕСООХРАНА</h3>
    </RouterLink>
    <div v-if="authStore.token" class="badge">
      <div class="badge-head" @click="() => showBadgeMenu = !showBadgeMenu">
        <div v-if="authStore.role !== 'СУПЕР_АДМИНИСТРАТОР'" class="inf">
          <h4>{{ userData.surname }} {{ userData.name }}</h4>
          <p>{{ userData.role }}</p>
        </div>
        <div v-else class="inf">
          <h4>СУПЕР-АДМИНИСТРАТОР</h4>
        </div>
      </div>
      <div v-if="showBadgeMenu" class="badge-menu">
        <button @click="() => authStore.exit()">Выйти</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* position: fixed; */
  width: 100%;
  height: auto;
  padding: 5px;
  background-color: white;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo > img {
  margin-right: 10px;
}

.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.badge-menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1%;
  top: 150%;
  position: absolute;
  z-index: 1000;
  border-radius: 8px;
  background-color: white;
}

.badge-head {
  cursor: pointer;
}

.badge-menu-hide {
  display: none;
}

.inf {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inf > p {
  margin-top: 3px;
  font-size: 12px;
}

.img {
  width: 40px;
  height: 40px;
  margin-left: 10px;
}
.img > img {
  max-width: 100%;
  border-radius: 50%;
}
</style>
