<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore } from "@/store/store";
import { onMounted, ref } from "vue";

const partForm = ref(true);
const page = ref(1);
const data = ref({
  where_fire: "",
  who_discovery: "",
  manager: "",
  type_fire: "",
  intensity_fire: "",
  quarter: "",
  area: 0,
  zone: "",
  reason: "",
  coords: {
    latitude: null,
    longitude: null,
  },
  date_discovery: "",
  // start_extinguishing: "",
});
const managers = ref(null);

onMounted(async () => {
  const response = await fetch(API_SERVER.USERS.GET_ALL, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authStore.token}`
    },
  });
  const data = await response.json();
  managers.value = data.data;
});

function changeDateToLocal(inputDate) {
  const date = new Date(inputDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return [`${day}.${month}.${year}`, inputDate.split("T")[1]];
}


async function sendData() {
  data.value.date_discovery = changeDateToLocal(data.value.date_discovery);
  const response = await fetch(API_SERVER.DOCUMENTS.FIRE.FIRE_CARD.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authStore.token}`
    },
    body: JSON.stringify(data.value)
  });
  const result = await response.json();
  
  if(response.status == 201) {
    alert(result.message);
  }
}

function changeForm(e) {
  e.preventDefault();
  partForm.value = partForm.value ? false : true;
  page.value += 1;
  if (page.value > 2) {
    page.value = 1;
  }
}
</script>

<template>
  <div class="block">
    <div class="form">
      <h3 class="caption">Карточка пожара</h3>
      <div class="form-inputs">
        <div v-if="page == 1" class="item-input">
          <label for="peace">Место пожара</label>
          <input
            type="text"
            v-model="data.where_fire"
            id="peace"
            name="peace"
            placeholder="Введите место"
          />
        </div>

        <div v-if="page == 1" class="item-input">
          <label for="discovery">Кто обнаружил?</label>
          <input
            type="text"
            v-model="data.who_discovery"
            id="discovery"
            name="discovery"
            placeholder="Иван Ан 2"
          />
        </div>

        <div v-if="page == 1" class="item-input">
          <label for="manager">Руководитель пожара</label>
          <select v-model="data.manager" name="manager" id="manager">
            <option disabled selected>Выберите руководителя</option>
            <option v-for="manager in managers" :value="manager.id">
              {{ manager.surname }} {{ manager.name }} {{ manager.patronimyc }}
            </option>
          </select>
        </div>

        <div v-if="page == 1" class="item-input">
          <label for="type">Тип пожара</label>
          <select v-model="data.type_fire" id="type" name="type">
            <option disabled selected>Выберите тип</option>
            <option value="ВЕРХОВОЙ">ВЕРХОВОЙ</option>
            <option value="НИЗОВОЙ">НИЗОВОЙ</option>
            <option value="СМЕШАННЫЙ">СМЕШАННЫЙ</option>
          </select>
        </div>

        <div v-if="page == 1" class="item-input">
          <label for="intensity">Интенсивность пожара</label>
          <select v-model="data.intensity_fire" id="intensity" name="intensity">
            <option disabled selected>Выберите интенсивность</option>
            <option value="НИЗКИЙ">НИЗКИЙ</option>
            <option value="СРЕДНИЙ">СРЕДНИЙ</option>
            <option value="ВЫСОКИЙ">ВЫСОКИЙ</option>
            <option value="ЭКСТРЕМАЛЬНЫЙ">ЭКСТРЕМАЛЬНЫЙ</option>
          </select>
        </div>

        <div v-if="page == 1" class="item-input">
          <label for="quarter">№ квартала</label>
          <input
            type="text"
            v-model="data.quarter"
            id="quarter"
            name="quarter"
            placeholder="Введите квартал"
          />
        </div>

        <div v-if="page === 2" class="item-input">
          <label for="area">Площадь пожара (га)</label>
          <input
            type="number"
            v-model="data.area"
            id="area"
            name="area"
            placeholder="1000"
          />
        </div>

        <div v-if="page === 2" class="item-input">
          <label for="zone">Зона</label>
          <select v-model="data.zone" id="zone" name="zone">
            <option disabled selected>Выберите зону</option>
            <option value="АСС">АСС</option>
            <option value="НСС">НСС</option>
          </select>
        </div>

        <div v-if="page === 2" class="item-input">
          <label for="reason">Причина пожара</label>
          <input
            type="text"
            v-model="data.reason"
            id="reason"
            name="reason"
            placeholder="Введите причину пожара"
          />
        </div>

        <div v-if="page === 2" class="item-input">
          <label for="coords">Координаты (широта и долгота)</label>
          <div class="coords">
            <input
              type="number"
              v-model="data.coords.latitude"
              id="latitude"
              name="latitude"
              placeholder="Широта"
            />
            <input
              type="number"
              v-model="data.coords.longitude"
              id="longitude"
              name="longitude"
              placeholder="Долгота"
            />
          </div>
        </div>

        <div v-if="page === 2" class="item-input">
          <label for="date_discovery">Дата и время обнаружения</label>
          <input
            type="datetime-local"
            v-model="data.date_discovery"
            id="date_discovery"
            name="date_discovery"
          />
        </div>

        <!-- <div v-if="page === 2" class="item-input">
          <label for="start_extinguishing">Дата и время начало тушения</label>
          <input
            type="datetime-local"
            v-model="data.start_extinguishing"
            id="start_extinguishing"
            name="start_extinguishing"
          />
        </div> -->
      </div>
      <div class="form-btns">
        <button v-if="page === 1" @click="changeForm">Далее</button>
        <button v-if="page === 2" @click="changeForm">Назад</button>
        <button v-if="page === 2" @click="() => sendData()">Создать</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block {
  justify-content: center;
  align-items: center;
}

.form-caption {
  margin-bottom: 20px;
  text-transform: uppercase;
}

.coords {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: auto;
  height: 40px;
}

.coords > input {
  width: 46%;
  height: 100%;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 10px;
}
</style>
