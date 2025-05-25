<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, bodyStore, componentStore } from "@/store/store";
import FireCardForm from "@/views/administrator/FireCardForm.vue";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import FireCard from "./FireCard.vue";

const fireCards = ref([]);

onMounted(async () => {
  const response = await fetch(API_SERVER.DOCUMENTS.FIRE.FIRE_CARD.GET_ALL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
  });
  const data = await response.json();

  console.log(data);
  if (response.status == 200) fireCards.value = data;
});
</script>

<template>
  <div class="block">
    <div class="table">
      <div class="table-header">
        <div class="inf">№</div>
        <div class="inf">Статус</div>
        <div class="inf">Уч. лесничество</div>
        <div class="inf">Лесничество</div>
        <div class="inf">Тип пожара</div>
        <div class="inf">Интенсивность</div>
        <div class="inf">Зона</div>
        <div class="inf">Площадь (га)</div>
        <div class="inf">Дата обнаружения</div>
      </div>
      <div class="table-body">
        <div class="item-card" v-for="fireCard in fireCards" :key="fireCard.id">
          <div class="card-body">
            <div class="inf">
              {{ fireCard.managment_number }} {{ fireCard.forestry_number }}
            </div>
            <div class="inf">{{ fireCard.status }}</div>
            <div class="inf">{{ fireCard.district_forestry }}</div>
            <div class="inf">{{ fireCard.forestry }}</div>
            <div class="inf">{{ fireCard.type_fire }}</div>
            <div class="inf">{{ fireCard.intensity }}</div>
            <div class="inf">{{ fireCard.zone }}</div>
            <div class="inf">{{ fireCard.area }}</div>
            <div class="inf">{{ fireCard.date_discovery }}</div>
            <button
              class="btn-small"
              style="margin-bottom: 0px;"
              @click="
                () => {
                  bodyStore.changecurrentData(fireCard);
                  componentStore.changeCurrentComponent(
                    'Карточка пожара',
                    FireCard
                  );
                }
              "
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <div class="pagination-btn">1</div>
    </div>
    <button
      class="btn"
      style="position: absolute; left: calc(100% - 130px); top: 93%"
      @click="
        () => {
          componentStore.changeCurrentComponent(
            'Создание карточки пожара',
            FireCardForm
          );
        }
      "
    >
      Создать карточку
    </button>
  </div>
</template>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 95%;
}

.table-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.table-body {
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
}

.card-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
}

.item-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  padding-top: 0.3%;
  padding-bottom: 0.3%;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid black;
}

.inf {
  width: 10%;
  padding: 10px;
  text-align: center;
}

.card-body > button {
  margin-left: 3%;
}
</style>
