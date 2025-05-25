<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore, bodyStore, modalStore } from "@/store/store";
import { onMounted, ref, watch, watchEffect } from "vue";
import UserCreateForm from "./UserCreateForm.vue";
import PersonalDataForm from "./components/PersonalDataForm.vue";
import PostForm from "./components/PostForm.vue";
import RoleForm from "./components/RoleForm.vue";

const user = ref(null);
const posts = ref(null);
const auths = ref(null);
const personalData = ref(null);
const currentPage = ref(1);

async function initAuth() {
  const response = await fetch(
    `${API_SERVER.AUTH.USER.INIT_AUTH}/${bodyStore.currentData.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authStore.token}`,
      },
    }
  );
  if (response.status === 200) {
    alert("Авторизационные данные успешно созданы");
    getData(
      "auths",
      `${API_SERVER.AUTH.USER.GET_ONE}/${bodyStore.currentData.id}`
    );
    modalStore.close();
  } else {
    alert("Ошибка при создании авторизационных данных");
  }
}

async function getData(type, path) {
  const response = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
  });
  const data = await response.json();

  switch (response.status) {
    case 200:
      switch (type) {
        case "user":
          user.value = data;
          break;
        case "posts":
          posts.value = data;
          break;
        case "auths":
          auths.value = data.data;
          break;
        case "personal_data":
          personalData.value = data;
          console.log(data);
          break;
      }
      break;
    case 404:
      user.value = null;
      posts.value = null;
      auths.value = null;
      personalData.value = null;
      break;
  }
}

watch(
  () => currentPage.value,
  () => {
    switch (currentPage.value) {
      case 1:
        getData(
          "user",
          `${API_SERVER.USERS.GET_ONE}/${bodyStore.currentData.id}`
        );
        getData(
          "personal_data",
          `${API_SERVER.USERS.PERSONAL_DATA.GET_ONE}/${bodyStore.currentData.id}`
        );
        break;
      case 2:
        getData(
          "posts",
          `${API_SERVER.USERS.POST.GET_ONE}/${bodyStore.currentData.id}`
        );
        break;
      case 3:
        getData(
          "auths",
          `${API_SERVER.AUTH.USER.GET_ONE}/${bodyStore.currentData.id}`
        );
        break;
    }
  }
);

onMounted(() => {
  getData("user", `${API_SERVER.USERS.GET_ONE}/${bodyStore.currentData.id}`);
  getData(
    "personal_data",
    `${API_SERVER.USERS.PERSONAL_DATA.GET_ONE}/${bodyStore.currentData.id}`
  );
});
</script>

<template>
  <div class="block">
    <div class="column" v-if="currentPage === 1">
      <div class="title">Основная информация</div>
      <div class="item-data">
        <label>ID пользователя</label>
        <p>{{ user?.id }}</p>
      </div>
      <div class="item-data">
        <label>ФИО</label>
        <p>
          {{ user?.surname }} {{ user?.name }}
          {{ user?.patronimyc }}
        </p>
      </div>
      <div class="item-data">
        <label>Номер телефона</label>
        <p>
          {{ user?.phone_number }}
        </p>
      </div>

      <div class="item-data">
        <label>Электронная почта</label>
        <p>
          {{ user?.email }}
        </p>
      </div>

      <div v-if="personalData" class="item-data">
        <label>Серия и номер паспорта</label>
        <p>
          {{ personalData?.number_passport }}
        </p>
      </div>

      <div v-if="personalData" class="item-data">
        <label>Кем и когда выдан паспорт</label>
        <p>
          {{ personalData?.issued_passport }}
        </p>
      </div>

      <div v-if="personalData" class="item-data">
        <label>ИНН</label>
        <p>
          {{ personalData?.inn }}
        </p>
      </div>

      <div v-if="personalData" class="item-data">
        <label>СНИЛС</label>
        <p>
          {{ personalData?.snils }}
        </p>
      </div>
      <button
        v-if="!personalData"
        class="btn"
        @click="
          () => {
            modalStore.open(PersonalDataForm);
          }
        "
      >
        Добавить персональные данные
      </button>
      <button v-if="personalData" class="btn" @click="() => {}">
        Редактировать
      </button>
    </div>

    <div class="column" v-if="currentPage === 2">
      <div class="title">Информация о должности</div>

      <div v-if="posts?.id" class="item-data">
        <label>ID должности</label>
        <p>
          {{ posts?.id }}
        </p>
      </div>

      <div v-if="posts" class="item-data">
        <label>Таб №</label>
        <p>{{ posts?.personnel_number }}</p>
      </div>
      <div v-if="posts" class="item-data">
        <label>Название должности</label>
        <p>
          {{ posts?.option_post?.name }}
        </p>
      </div>

      <div v-if="posts" class="item-data">
        <label>Категория должности</label>
        <p>{{ posts?.option_post?.category }}</p>
      </div>

      <div v-if="posts" class="item-data">
        <label>Дата приема</label>
        <p>{{ posts?.date_admission }}</p>
      </div>
      <button v-if="posts" class="btn" @click="() => modalStore.open()">
        Редактировать
      </button>
      <button
        v-if="!posts"
        class="btn"
        @click="
          () => {
            modalStore.open(PostForm);
          }
        "
      >
        Добавить
      </button>
    </div>

    <div class="column" v-if="currentPage === 3">
      <div class="title">Авторизационные данные</div>
      <div v-if="auths" class="item-data">
        <label>Логин</label>
        <p>{{ auths?.login }}</p>
      </div>
      <div v-if="auths" class="item-data">
        <label>Пароль</label>
        <p>{{ auths?.password }}</p>
      </div>
      <div v-if="auths" class="item-data">
        <label>Роли</label>
        <p v-if="auths.roles.length === 1">
          {{ auths?.roles[0]?.name }}
        </p>
        <p v-if="auths.roles.length > 1">
          {{ auths?.roles[0]?.name }}, {{ auths.roles[1].name }}
        </p>
        <button
          class="btn-small"
          v-if="auths.roles.length === 0"
          @click="
            () => {
              modalStore.open(RoleForm);
            }
          "
        >
          Добавить роль
        </button>
      </div>
      <button
        v-else
        class="btn"
        @click="
          () => {
            initAuth();
          }
        "
      >
        Добавить
      </button>
    </div>
    <div class="pagination">
      <div class="pagination-btn" @click="() => (currentPage = 1)">
        Основная ифнормация
      </div>
      <div class="pagination-btn" @click="() => (currentPage = 2)">
        Информация о должности
      </div>
      <div class="pagination-btn" @click="() => (currentPage = 3)">
        Авторизационные данные
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 93%;
  padding: 5px;
  margin-bottom: 10px;
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

.item-data {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  font-size: medium;
}

.item-data label {
  font-size: 14px;
  margin-bottom: 5px;
  color: grey;
}

.item-data p {
  margin-bottom: 5px;
}

.btn {
  width: fit-content;
}
</style>
