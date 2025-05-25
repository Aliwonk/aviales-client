<script setup>
import LeftBar from "@/components/LeftBar.vue";
import { authStore, bodyStore, componentStore, leftBarStore, modalStore } from "@/store/store";
import { RouterLink, useRouter } from "vue-router";
import ListUsers from "./admin/users/ListUsers.vue";
import { ref, shallowRef, watch, watchEffect } from "vue";
import Head from "@/components/Head.vue";
import Modal from "@/components/Modal.vue";

const router = useRouter();
const activeComponent = ref();

watchEffect(() => {
  activeComponent.value = componentStore.currentComponent.component;
});

if (!authStore.token) router.push({ name: "login" });
</script>

<template>
  <Modal v-if="modalStore.isActive" />
  <div v-if="leftBarStore.allDeactive && authStore.role !== 'СОТРУДНИК'" class="greeting">
    <h1>Добро пожаловать в систему управления документами!</h1>
    <p>Выберите пункт меню слева, чтобы начать.</p>
  </div>
  <!-- <KeepAlive> -->
    <component :is="activeComponent" />
  <!-- </KeepAlive> -->
</template>

<style>
.container {
  align-items: center;
}
</style>
