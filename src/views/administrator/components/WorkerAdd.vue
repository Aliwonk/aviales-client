<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, bodyStore, modalStore } from "@/store/store";
import { onMounted, ref } from "vue";

const workers = ref([]);
const data = ref({
  user_id: null,
  start_work: null,
});

async function addWorker() {
  const response = await fetch(
    API_SERVER.DOCUMENTS.FIRE.FIRE_CARD.WORKER.CREATE +
      "/" +
      bodyStore.currentData.id,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({
        user_id: data.value.user_id,
        start_work: data.value.start_work,
      }),
    }
  );

  const result = await response.json();
  if (response.status === 200) {
    alert("Работник успешно добавлен");
    modalStore.close();
  } else {
    console.error("Ошибка при добавлении работника:", result.message);
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
    workers.value = data.data;
  } catch (error) {
    console.error("Ошибка при загрузке работников:", error);
  }
});
</script>

<template>
  <div class="form">
    <div class="form-inputs">
      <div class="item-input">
        <label for="manager">Руководитель пожара</label>
        <select v-model="data.user_id" name="manager" id="manager">
          <option disabled selected>Выберите руководителя</option>
          <option v-for="worker in workers" :key="worker.id" :value="worker.id">
            {{ worker.surname }} {{ worker.name }} {{ worker.patronimyc }}
          </option>
        </select>
      </div>
      <div class="item-input">
        <label for="start_work">Дата начала работы</label>
        <input
          type="date"
          v-model="data.start_work"
          id="start_work"
          name="start_work"
          placeholder="Введите дату начала работы"
        />
      </div>
    </div>
    <div class="form-btns">
      <button class="btn" @click="() => addWorker()">Изменить</button>
    </div>
  </div>
</template>
