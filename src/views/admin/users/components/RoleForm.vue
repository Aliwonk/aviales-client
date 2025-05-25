<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, bodyStore, modalStore } from "@/store/store";
import { ref } from "vue";

const roles = ref(["РУКОВОДИТЕЛЬ", "АДМИНИСТРАТОР", "ИНСТРУКТОР", "СОТРУДНИК"]);
const userRole = ref("");

async function saveRole() {
  const response = await fetch(
    API_SERVER.AUTH.ROLE.CREATE + "/" + bodyStore.currentData.id,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({ role: userRole.value }),
    }
  );

  if (response.status === 201) {
    modalStore.close();
    alert("Роль успешно сохранена");
  } else {
    alert("Произошла ошибка при сохранении роли");
  }
}
</script>

<template>
  <div class="form">
    <div class="form-inputs">
      <div class="item-input">
        <label for="role">Роль</label>
        <select v-model="userRole" id="role" name="role">
          <option value="" disabled selected>Выберите роль</option>
          <option v-for="(role, index) in roles" :key="index" :value="role">
            {{ role }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-btns">
      <button class="btn btn-primary" @click="saveRole()">Сохранить</button>
    </div>
  </div>
</template>
