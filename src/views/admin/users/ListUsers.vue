<script setup>
import API_SERVER from "@/constants/API.constant";
import {
  authStore,
  bodyStore,
  componentStore,
  leftBarStore,
} from "@/store/store";
import { getCookie } from "@/utils/cookie.util";
import { onMounted, provide, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import User from "./User.vue";
import UserForm from "./UserCreateForm.vue";

const router = useRouter();
const countUsers = ref(0);
const countBtnPagination = ref(1);
const users = ref(null);
const pagination = ref({
  page: 1,
  limit: 10,
});
const currentPage = ref(pagination.value.page);

async function fetcData(token, page = 1, limit = 10) {
  const response = await fetch(
    `${API_SERVER.USERS.GET_ALL}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();

  switch (response.status) {
    case 200:
      users.value = data.data;
      countUsers.value = data.count;
      countBtnPagination.value = Math.ceil(data.count / 10);
      console.log(data.data);
      break;

    case 401:
      authStore.exit();
      break;
    case 404:
      users.value = null;
      break;
    default:
      alert(data.message);
      break;
  }
}

onMounted(() => {
  fetcData(authStore.token, pagination.value.page, pagination.value.limit);
});

watch(
  () => pagination.value.page,
  (newPage) => {
    if (users.value !== null) {
      fetcData(authStore.token, newPage, pagination.value.limit);
    }
  }
);
</script>

<template>
  <div class="block">
    <div class="users-header">
      <div class="item-data-head">ФИО</div>
      <div class="item-data-head">Роль</div>
    </div>
    <div class="list-users">
      <div class="item-user" v-if="users === null">
        <div class="item-data">Пользователи не найдены</div>
      </div>
      <div class="item-user" v-else v-for="user in users" :key="user.id">
        <div class="item-data">
          {{ user.surname }} {{ user.name }} {{ user.patronimyc }}
        </div>
        <div v-if="user.auth" class="item-data">
          {{ user.auth.roles[0]?.name }}
          {{
            user.auth.roles.length > 1 ? ", " + user.auth.roles[1]?.name : ""
          }}
        </div>
        <div v-else class="item-data">Отсутствует</div>
        <button
          class="btn-small"
          style="margin-bottom: 0px;"
          @click="
            () => {
              bodyStore.changecurrentData(user);
              componentStore.changeCurrentComponent('Пользователь', User);
            }
          "
        >
          Подробнее
        </button>
      </div>
    </div>
    <div class="pagination">
      <button
        v-for="(value, index) in countBtnPagination"
        :key="index"
        class="pagination-btn"
        @click="
          () => {
            pagination.page = value;
          }
        "
      >
        {{ value }}
      </button>
    </div>
    <button
      class="btn"
      style="position: absolute; left: calc(100% - 170px); top: 93%"
      @click="
        () => {
          componentStore.changeCurrentComponent(
            'Добавление пользователя',
            UserForm
          );
        }
      "
    >
      Добавить пользователя
    </button>
  </div>
</template>

<style scoped>
/* .users {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1%;
  border-radius: 8px;
  background-color: white;
} */

.users-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 5%;
  margin-bottom: 5px;
}

.list-users {
  display: flex;
  flex-direction: column;
  width: auto;
  width: 100%;
  height: 88%;
}

.item-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 10%;
}

.item-data {
  width: 15%;
  height: auto;
  margin-right: 10px;
}

.item-data-head {
  width: 15%;
  height: 100%;
  font-weight: bold;
  margin-right: 10px;
  /* text-align: center; */
}
</style>
