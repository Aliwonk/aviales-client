<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, componentStore } from "@/store/store";
import { onMounted, ref, watch } from "vue";

const currentPage = ref(1);
const postOptions = ref(null);
const userData = ref({
  surname: "",
  name: "",
  patronimyc: "",
  phone_number: "",
  email: "",
  date_of_birth: "",
});
const personal_data = ref({
  number_passport: "",
  issued_passport: "",
  registration_address: "",
  actual_address: "",
  inn: "",
  snils: "",
});

const post = ref({
  personnel_number: "",
  option_post_id: "",
  date_admission: "",
});

function nextPage() {
  if (currentPage.value == 3) return;
  currentPage.value++;
}

function prevPage() {
  if (currentPage.value == 1) return;
  currentPage.value--;
}

async function sendData() {
  const resultData = {
    user_data: userData.value,
    personal_data: personal_data.value,
    post: post.value,
  };

  const response = await fetch(API_SERVER.USERS.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
    body: JSON.stringify(resultData),
  });
  const data = await response.json();

  switch (response.status) {
    case 201:
      alert("Пользователь добавлен");
      componentStore.goToPrevPath();
      break;

    default:
      alert(data.message);
      break;
  }
}

watch(
  () => currentPage.value,
  (newPage) => {
    if (newPage === 3) {
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
    }
  }
);
</script>

<template>
  <div class="block">
    <div class="form">
      <h3 class="form-caption">Данные пользователя</h3>

      <!-- ЛИЧНЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ -->

      <div class="form-inputs">
        <div v-if="currentPage === 1" class="item-input">
          <label for="surname">Фамилия</label>
          <input
            type="text"
            v-model="userData.surname"
            id="surname"
            name="surname"
            placeholder="Введите фамилию"
          />
        </div>
        <div v-if="currentPage === 1" class="item-input">
          <label for="name">Имя</label>
          <input
            type="text"
            v-model="userData.name"
            id="name"
            name="name"
            placeholder="Введите имя"
          />
        </div>
        <div v-if="currentPage === 1" class="item-input">
          <label for="patronimyc">Отчество</label>
          <input
            type="text"
            v-model="userData.patronimyc"
            id="patronimyc"
            name="patronimyc"
            placeholder="Введите отчество"
          />
        </div>
        <div v-if="currentPage === 1" class="item-input">
          <label for="phone_number">Номер телефона</label>
          <input
            type="text"
            v-model="userData.phone_number"
            id="phone_number"
            name="phone_number"
            placeholder="+ 7 (999) 999-99-99"
          />
        </div>
        <div v-if="currentPage === 1" class="item-input">
          <label for="email">Эл. почта</label>
          <input
            type="text"
            v-model="userData.email"
            id="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </div>

        <div v-if="currentPage === 1" class="item-input">
          <label for="date_of_birth">Дата рождения</label>
          <input
            type="date"
            v-model="userData.date_of_birth"
            id="date_of_birth"
            name="date_of_birth"
          />
        </div>

        <!-- ПАСПОРТНЫЕ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ -->

        <div v-if="currentPage === 2" class="item-input">
          <label for="number_passport">Номер и серия паспорта</label>
          <input
            type="number"
            v-model="personal_data.number_passport"
            id="number_passport"
            name="number_passport"
            placeholder="Введите номер и серию"
          />
        </div>

        <div v-if="currentPage === 2" class="item-input">
          <label for="issued_passport">Кем и когда выдан паспорт</label>
          <input
            type="text"
            v-model="personal_data.issued_passport"
            id="issued_passport"
            name="issued_passport"
            placeholder="Введите кем выдан и дату выдачи"
          />
        </div>

        <div v-if="currentPage === 2" class="item-input">
          <label for="registration_address">Адрес регистрации</label>
          <input
            type="text"
            v-model="personal_data.registration_address"
            id="registration_address"
            name="registration_address"
            placeholder="Введите адрес"
          />
        </div>

        <div v-if="currentPage === 2" class="item-input">
          <label for="actual_address">Адрес фактического проживания</label>
          <input
            type="text"
            v-model="personal_data.actual_address"
            id="actual_address"
            name="actual_address"
            placeholder="Введите адрес"
          />
        </div>

        <div v-if="currentPage === 2" class="item-input">
          <label for="inn">ИНН</label>
          <input
            type="number"
            v-model="personal_data.inn"
            id="inn"
            name="inn"
            placeholder="Введите ИНН"
          />
        </div>

        <div v-if="currentPage === 2" class="item-input">
          <label for="snils">СНИЛС</label>
          <input
            type="number"
            v-model="personal_data.snils"
            id="snils"
            name="snils"
            placeholder="Введите СНИЛС"
          />
        </div>

        <!-- ДАННЫЕ О ДОЛЖНОСТИ ПОЛЬЗОВАТЕЛЯ -->

        <div v-if="currentPage === 3" class="item-input">
          <label for="uniq_number">Табельный номер</label>
          <input
            type="number"
            v-model="post.personnel_number"
            id="uniq_number"
            name="uniq_number"
            placeholder="Введите номер"
          />
        </div>

        <div v-if="currentPage === 3" class="item-input">
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

        <div v-if="currentPage === 3" class="item-input">
          <label for="date_admission">Дата приема</label>
          <input
            type="date"
            v-model="post.date_admission"
            id="date_admission"
            name="date_admission"
          />
        </div>
      </div>
      <div class="form-btns">
        <button v-if="currentPage !== 1" @click="prevPage()">Назад</button>
        <button v-if="currentPage !== 3" @click="nextPage()">Далее</button>
        <button v-if="currentPage === 3" @click="sendData()">Создать</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block {
  justify-content: center;
  align-items: center;
}
</style>
