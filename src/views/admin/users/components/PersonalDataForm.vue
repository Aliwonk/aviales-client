<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, bodyStore, modalStore } from "@/store/store";
import { ref } from "vue";

const personal_data = ref({
  number_passport: "",
  issued_passport: "",
  registration_address: "",
  actual_address: "",
  inn: "",
  snils: "",
});

async function sendData() {
  const response = await fetch(
    API_SERVER.USERS.PERSONAL_DATA.CREATE + "/" + bodyStore.currentData.id,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify(personal_data.value),
    }
  );
  const data = await response.json();
  switch (response.status) {
    case 201:
      alert("Данные успешно сохранены");
      modalStore.close();
      break;
    case 400:
      alert(data.message);
      break;
    case 401:
      authStore.exit();
      break;
    default:
      alert("Произошла ошибка при сохранении данных");
      break;
  }
}
</script>

<template>
  <div class="form">
    <div class="form-inputs">
      <div class="item-input">
        <label for="number_passport">Номер и серия паспорта</label>
        <input
          type="number"
          v-model="personal_data.number_passport"
          id="number_passport"
          name="number_passport"
          placeholder="Введите номер и серию"
        />
      </div>

      <div class="item-input">
        <label for="issued_passport">Кем и когда выдан паспорт</label>
        <input
          type="text"
          v-model="personal_data.issued_passport"
          id="issued_passport"
          name="issued_passport"
          placeholder="Введите кем выдан и дату выдачи"
        />
      </div>

      <div class="item-input">
        <label for="registration_address">Адрес регистрации</label>
        <input
          type="text"
          v-model="personal_data.registration_address"
          id="registration_address"
          name="registration_address"
          placeholder="Введите адрес"
        />
      </div>

      <div class="item-input">
        <label for="actual_address">Адрес фактического проживания</label>
        <input
          type="text"
          v-model="personal_data.actual_address"
          id="actual_address"
          name="actual_address"
          placeholder="Введите адрес"
        />
      </div>

      <div class="item-input">
        <label for="inn">ИНН</label>
        <input
          type="number"
          v-model="personal_data.inn"
          id="inn"
          name="inn"
          placeholder="Введите ИНН"
        />
      </div>

      <div class="item-input">
        <label for="snils">СНИЛС</label>
        <input
          type="number"
          v-model="personal_data.snils"
          id="snils"
          name="snils"
          placeholder="Введите СНИЛС"
        />
      </div>
    </div>
    <div class="form-btns">
      <button @click="sendData()">Сохранить</button>
    </div>
  </div>
</template>
