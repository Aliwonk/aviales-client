<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, bodyStore, modalStore } from "@/store/store";
import ListUsers from "@/views/admin/users/ListUsers.vue";
import { onMounted, ref, watch } from "vue";
import ManagerEdit from "./components/ManagerEdit.vue";
import WorkerAdd from "./components/WorkerAdd.vue";

const currentPage = ref(1);
const fireCard = ref({});
const fireNotes = ref([]);
const fireWorkers = ref([]);
const fireTransports = ref([]);
const defectSheets = ref([]);

async function getData() {
  let URL = "";
  switch (currentPage.value) {
    case 1:
      URL =
        API_SERVER.DOCUMENTS.FIRE.FIRE_CARD.GET_ONE +
        "/" +
        bodyStore.currentData.id;
      break;
    case 2:
      URL =
        API_SERVER.DOCUMENTS.FIRE.FIRE_CARD.NOTE.GET_ALL +
        "/" +
        bodyStore.currentData.id;
      break;
    case 3:
      URL =
        API_SERVER.DOCUMENTS.FIRE.FIRE_CARD.WORKER.GET_ALL +
        "/" +
        bodyStore.currentData.id;
      break;
    case 4:
      URL =
        API_SERVER.DOCUMENTS.FIRE.FIRE_CARD.DEFECT_SHEET.GET_ALL +
        "/" +
        bodyStore.currentData.id;
      break;
  }

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
  });
  const data = await response.json();
  if (response.status == 200) {
    switch (currentPage.value) {
      case 1:
        fireCard.value = data.data;
        console.log(fireCard.value);
        break;
      case 2:
        fireNotes.value = data.data;
        console.log(fireNotes.value);
        break;
      case 3:
        fireWorkers.value = data.data;
        console.log(fireWorkers.value);
        break;
      case 4:
        defectSheets.value = data.data;
        console.log(defectSheets.value);
        break;
    }
  }
}

watch(
  () => currentPage.value,
  (newValue) => {
    getData();
  }
);
onMounted(async () => {
  getData();
});
</script>

<template>
  <div class="block">
    <div class="column">
      <div v-if="currentPage === 1" class="title">Основная информация</div>
      <div v-if="currentPage === 2" class="title">Ежедневная информация</div>
      <div v-if="currentPage === 3" class="title">Работники пожара</div>
      <div v-if="currentPage === 4" class="title">Дефектная ведомость</div>
      <div v-if="currentPage === 5" class="title">Инструменты</div>
      <div v-if="currentPage === 6" class="title">Транспортные средства</div>
      <div class="body">
        <div class="page" v-if="currentPage === 1">
          <div class="item-data">
            <label>Номер пожара</label>
            <p>
              {{ fireCard.managment_number }} {{ fireCard.forestry_number }}
            </p>
          </div>
          <div class="item-data">
            <label>Статус пожара</label>
            <p>{{ fireCard.status }}</p>
          </div>
          <div class="item-data">
            <label>Район</label>
            <p>{{ fireCard.district }}</p>
          </div>
          <div class="item-data">
            <label>Лесничество</label>
            <p>{{ fireCard.forestry }}</p>
          </div>
          <div class="item-data">
            <label>Участковое лесничество</label>
            <p>{{ fireCard.district_forestry }}</p>
          </div>
          <div class="item-data">
            <label>Номер квартала</label>
            <p>{{ fireCard.quarter }}</p>
          </div>
          <div class="item-data">
            <label>Дата обнаружения</label>
            <p>{{ fireCard.date_discovery }}</p>
          </div>
          <div class="item-data">
            <label>Кем обнаружен</label>
            <p>{{ fireCard.who_discovery }}</p>
          </div>
          <div class="item-data">
            <label>Зона (АСС/НСС)</label>
            <p>{{ fireCard.zone }}</p>
          </div>
          <div class="item-data">
            <label>Вид пожара и интенсивность</label>
            <p>{{ fireCard.type_fire }}, {{ fireCard.intensity }}</p>
          </div>
          <div class="item-data">
            <label>Площадь пожара в момент обнаружения (га)</label>
            <p>{{ fireCard.area }}</p>
          </div>
          <div class="item-data">
            <label>Причина</label>
            <p>{{ fireCard.reason }}</p>
          </div>
          <div class="item-data">
            <label>Координаты (ширина и долгота)</label>
            <p>
              {{ fireCard.coords?.latitude }} {{ fireCard.coords?.longtitude }}
            </p>
          </div>
          <div class="item-data">
            <label>Руководитель пожара</label>
            <p>
              {{ fireCard.manager?.posts[0]?.option_post?.name }},
              {{ fireCard.manager?.surname }} {{ fireCard.manager?.name }}
              {{ fireCard.manager?.patronimyc }}
              <button
                class="btn-small"
                style="margin-left: 10px"
                @click="() => {
                  modalStore.open(ManagerEdit);
                }"
              >
                Изменить
              </button>
            </p>
          </div>
        </div>

        <!-- ЕЖЕДНЕВНАЯ ИНФОРМАЦИЯ -->

        <div v-if="currentPage == 2" class="page">
          <div class="list">
            <div
              v-if="fireNotes.length > 0"
              class="item"
              style="justify-content: left"
              v-for="note in fireNotes"
              :key="note.id"
            >
              <div class="item-data">
                <label>Дата</label>
                <p>{{ note.date }}</p>
              </div>
              <div class="item-data">
                <label>Статус</label>
                <p>{{ note.status }}</p>
              </div>
              <div class="item-data">
                <label>Покрытая площадь (Га)</label>
                <p>{{ note.covered_area }}</p>
              </div>
              <div class="item-data">
                <label>Непокрытая площадь (Га)</label>
                <p>{{ note.uncovered_area }}</p>
              </div>
              <div class="item-data">
                <label>Верховой площадь (Га)</label>
                <p>{{ note.upstream_area }}</p>
              </div>
              <div class="item-data">
                <label>Нелесная площадь (Га)</label>
                <p>{{ note.non_forested_area }}</p>
              </div>
              <div class="item-data">
                <label>Общая площадь (Га)</label>
                <p>{{ note.total_area }}</p>
              </div>
              <div class="item-data">
                <label>Всего работает человек</label>
                <p>{{ note.total_human_working }}</p>
              </div>
            </div>
            <div v-else class="item">
              <p>Информация отсутствует</p>
            </div>
          </div>
        </div>

        <!-- ИНФОРМАЦИЯ О РАБОТНИКАХ -->

        <div v-if="currentPage == 3" class="page">
          <div class="list">
            <div
              class="item"
              v-if="fireWorkers.length > 0"
              v-for="worker in fireWorkers"
              :key="worker.id"
            >
              <div class="item-data">
                <label>ФИО</label>
                <p>
                  {{ worker.user.surname }} {{ worker.user.name }}
                  {{ worker.user.patronimyc }}
                </p>
              </div>
              <div class="item-data">
                <label>Должность</label>
                <p>{{ worker.user?.posts[0]?.option_post?.name }}</p>
              </div>
              <div class="item-data">
                <label>Статус</label>
                <p>{{ worker?.status }}</p>
              </div>
              <div class="item-data">
                <label>Приступил к работе</label>
                <p>{{ worker.start_work }}</p>
              </div>
              <div class="item-data">
                <label>Закончил работу</label>
                <p>{{ !worker.finish_work ? "----" : worker.finish_work }}</p>
              </div>
              <div class="item-data">
                <label>Часы на обед</label>
                <p>{{ worker.total_time_launch }}</p>
              </div>
              <div class="item-data">
                <label>Отработано часов</label>
                <p>{{ worker.total_time_work }}</p>
              </div>
              <div class="item-data">
                <label>Часы в пути</label>
                <p>{{ worker.total_time_in_road }}</p>
              </div>
              <div class="item-data">
                <label>Итого часов</label>
                <p>{{ worker.total_time }}</p>
              </div>
            </div>
            <div v-else class="item">
              <p>Работники отсутствует</p>
            </div>
          </div>
        </div>

        <!-- ДЕФЕКТНАЯ ВЕДОМОСТЬ -->

        <div v-if="currentPage == 4" class="page">
          <div class="list">
            <div
              class="item"
              style="justify-content: left"
              v-if="defectSheets.length > 0"
              v-for="defect in defectSheets"
              :key="defect.id"
            >
              <div class="item-data" style="width: 15%">
                <label>Дата</label>
                <p>{{ defect.createdAt }}</p>
              </div>
              <div class="item-data">
                <label>Наименования детали</label>
                <p>{{ defect.tool }}</p>
              </div>
              <div class="item-data">
                <label>Кол-во на комплект</label>
                <p>{{ defect.count }}</p>
              </div>
              <div class="item-data">
                <label>Тех. состояние</label>
                <p>{{ defect.status }}</p>
              </div>
              <div class="item-data">
                <label>Заключение</label>
                <p>{{ defect.conclusion }}</p>
              </div>
              <div class="item-data">
                <label>Картинки</label>
                <div class="list-image">
                  <div
                    class="item-image"
                    v-for="image in defect.images"
                    :key="image.id"
                  >
                    <img
                      :src="
                        API_SERVER.DOCUMENTS.FIRE.FILES.GET_IMAGE +
                        '/' +
                        image.path
                      "
                      alt="Defect Image"
                      class="defect-image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="item">
              <p>Дефектная ведомость отсутствует</p>
            </div>
          </div>
        </div>

        <div v-if="currentPage == 3" class="page"></div>
      </div>
    </div>
    <div class="pagination">
      <div class="pagination-btn" @click="() => (currentPage = 1)">
        Основная информация
      </div>
      <div class="pagination-btn" @click="() => (currentPage = 2)">
        Ежедневная информация
      </div>
      <div class="pagination-btn" @click="() => (currentPage = 3)">
        Работники пожара
      </div>
      <div class="pagination-btn" @click="() => (currentPage = 4)">
        Дефектная ведомость
      </div>
      <!-- <div class="pagination-btn" @click="() => (currentPage = 5)">
        Транспортные средства
      </div>
      <div class="pagination-btn" @click="() => (currentPage = 6)">
        Инструменты
      </div> -->
    </div>
    <button
      v-if="currentPage === 3"
      class="btn"
      style="position: absolute; left: calc(100% - 170px); top: 93%"
      @click="
        () => {
          modalStore.open(WorkerAdd);
        }
      "
    >
      Добавить работника
    </button>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 93%;
  padding: 5px;
  border-radius: 8px;
  background-color: white;
}

.title {
  display: flex;
  width: 100%;
  padding: 4px;
  padding-left: 0px;
  margin-bottom: 10px;
  font-size: large;
  font-weight: bold;
}

.body {
  display: flex;
  flex-direction: column;
  width: auto;
  height: 90%;
}

.page {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

.list .item {
  justify-content: space-between;
}

.list .item-data {
  width: 10%;
  height: auto;
  margin-bottom: 0px;
  margin-right: 0px;
}

.list-image {
  display: flex;
  flex-direction: row;
  width: fit-content;
}

.item-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.item-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
