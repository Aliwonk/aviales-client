<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, bodyStore, modalStore } from "@/store/store";
import { onMounted, ref } from "vue";

const managers = ref([]);
const managerId = ref(null);

async function setManager() {
  const response = await fetch(
    API_SERVER.DOCUMENTS.FIRE.FIRE_CARD.MANAGER.SET +
      "/" +
      bodyStore.currentData.id,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({
        manager: managerId.value,
      }),
    }
  );
  const result = await response.json();
  if (response.status === 200) {
    alert("Руководитель успешно изменен");
    modalStore.close();
  } else {
    console.error("Ошибка при изменении руководителя:", result.message);
  }
}

onMounted(async () => {
  try {
    const response = await fetch(API_SERVER.USERS.GET_ALL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    const data = await response.json();
    managers.value = data.data;
  } catch (error) {
    console.error("Ошибка при загрузке руководителей:", error);
  }
});
</script>

<template>
  <div class="form">
    <div class="form-inputs">
      <div class="item-input">
        <label for="manager">Руководитель пожара</label>
        <select v-model="managerId" name="manager" id="manager">
          <option disabled selected>Выберите руководителя</option>
          <option
            v-for="manager in managers"
            :key="manager.id"
            :value="manager.id"
          >
            {{ manager.surname }} {{ manager.name }} {{ manager.patronimyc }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-btns">
      <button class="btn" @click="() => setManager()">Изменить</button>
    </div>
  </div>
</template>
