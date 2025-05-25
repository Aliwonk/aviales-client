<script setup>
import API_SERVER from "@/constants/API.constant";
import { authStore } from "@/store/store";
import { getCookie, setCookie } from "@/utils/cookie.util";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const formData = ref({
  login: "",
  password: "",
  isAdmin: false,
});

if (authStore.token) router.push({ name: "home" });

async function sendData() {
  try {
    const url = formData.value.isAdmin
      ? API_SERVER.AUTH.ADMIN.LOGIN
      : API_SERVER.AUTH.USER.LOGIN;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });
    const data = await response.json();

    switch (response.status) {
      case 200:
        setCookie("user_tkn", data.token, Number(data.expires));
        setCookie("user_role", data.role, Number(data.expires));
        authStore.changeToken(data.token, data.role);
        router.push({ name: "home" });
        break;

      case 404:
        alert(data.message);
        break;
      case 500:
        alert(data.message);
        break;
    }
    console.log(data);
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      alert(
        "Ошибка соединения. Повторите попытку позже или обратитесь к администратору"
      );
    }
  }
}
</script>

<template>
  <div class="container">
    <main>
      <div class="form">
        <div class="form-caption">Вход</div>
        <div class="form-body">
          <div class="form-inputs">
            <div class="item-input">
              <label for="login">Логин</label>
              <input
                v-model="formData.login"
                type="text"
                id="login"
                placeholder="Введите логин"
              />
            </div>
            <div class="item-input">
              <label for="password">Пароль</label>
              <input
                v-model="formData.password"
                type="password"
                id="password"
                placeholder="Введите пароль"
              />
            </div>
            <div class="item-input-checkbox">
              <input
                v-model="formData.isAdmin"
                type="checkbox"
                name="super-admin"
                id="super-admin"
              />
              <label>Администратор</label>
            </div>
          </div>
          <div class="form-btns">
            <button @click="sendData()">Войти</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 93.12vh;
  padding: 15px;
  margin-top: 10px;
  border-radius: 6px;
  background: linear-gradient(45deg, rgb(154, 200, 207) 44%, rgb(82, 182, 156));
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  padding: 2%;
  padding-bottom: 0%;
  padding-top: 0%;
  border-radius: 8px;
  background-color: #e6f5fa;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 25px;
  background-color: #e6f5fa;
  border-radius: 6px;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
}

.form-caption {
  text-transform: uppercase;
  font-size: large;
  font-weight: 600;
  margin-bottom: 20px;
}

.item-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.item-input-checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.item-input-checkbox > input {
  margin-top: 1px !important;
  margin-right: 10px !important;
  width: 14px;
  height: 14px;
  padding: 0;
  margin: 0;
}

.item-input > label {
  margin-bottom: 10px;
}

.item-input > input {
  width: 260px;
  height: 40px;
  padding-left: 10px;
  outline: none;
  border-radius: 6px;
  border: none;
}

.form-btns {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
}

.form-btns > button {
  height: 35px;
  padding: 5px;
  border-radius: 6px;
  border: none;
  background-color: #003fe9;
  color: white;
  text-align: center;
  cursor: pointer;
}
</style>
