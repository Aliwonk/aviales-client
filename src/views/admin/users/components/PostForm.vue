<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, bodyStore, modalStore } from "@/store/store";
import { onMounted, ref } from "vue";

const post = ref({
  personnel_number: "",
  type_worker: "",
  option_post_id: "",
  date_admission: "",
});
const postOptions = ref([]);
const typeWorker = ref([
  "АПС",
  "ЛПС-аб",
  "ЛПС",
  "ЛО",
  "МЧС-УГПС",
  "МОБ",
  "ДПД",
  "ФБУ-РЕЗЕРВ",
]);

async function sendData() {
  const response = await fetch(
    API_SERVER.USERS.POST.CREATE + "/" + bodyStore.currentData.id,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify(post.value),
    }
  );

  const data = await response.json();
  switch (response.status) {
    case 201:
      alert("Должность добавлена");
      modalStore.close();
      break;
    case 400:
      alert("Ошибка при добавлении должности");
      break;
    case 404:
      alert("Пользователь не найден");
      break;
    default:
      alert("Произошла ошибка");
  }
}

onMounted(async () => {
  fetch(API_SERVER.USERS.POST.GET_OPTIONS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      postOptions.value = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
</script>

<template>
  <div class="form">
    <div class="form-inputs">
      <div class="item-input">
        <label for="uniq_number">Табельный номер</label>
        <input
          type="number"
          v-model="post.personnel_number"
          id="uniq_number"
          name="uniq_number"
          placeholder="Введите номер"
        />
      </div>

      <div class="item-input">
        <label for="name_post">Название должности</label>
        <select v-model="post.option_post_id" id="name_post" name="name_post">
          <option disabled selected>Выберите должность</option>
          <option
            v-for="postName in postOptions"
            :key="postName.id"
            :value="postName.id"
          >
            {{ postName.name }}
          </option>
        </select>
      </div>

      <div class="item-input">
        <label for="name_post">Тип должности</label>
        <select v-model="post.type_worker" id="name_post" name="name_post">
          <option disabled selected>Выберите тип</option>
          <option
            v-for="(type, index) in typeWorker"
            :value="type"
            :key="index"
          >
            {{ type }}
          </option>
        </select>
      </div>

      <div class="item-input">
        <label for="date_admission">Дата приема</label>
        <input
          type="date"
          v-model="post.date_admission"
          id="date_admission"
          name="date_admission"
        />
      </div>
    </div>
    <div class="form-bnts">
      <button class="btn" @click="sendData()">Сохранить</button>
    </div>
  </div>
</template>
