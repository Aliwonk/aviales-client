<script setup>
import { modalStore } from "@/store/store";
import { ref } from "vue";

const data = ref(modalStore.data);

</script>

<template>
  <div class="modal">
    <div class="modal-head">
        <button @click="() => modalStore.close()">Закрыть</button>
    </div>
    <div class="modal-body">
      <div v-if="modalStore.isForm" class="form">
        <h3 class="form-caption">{{ modalStore.data.caption }}</h3>
        <div class="form-inputs">
          <div v-for="(item, index) in modalStore.data.inputs" :key="index" class="item-input">
            <label :for="item.name">{{ item.label.text }}</label>
            <select
              v-if="item.select"
              v-model="data[item.name]"
              :id="item.name"
              :name="item.name"
              :placeholder="item.placeholder"
            >
              <option v-for="(option, index) in item.options" :key="index" :value="option.id">
                {{ option.name }}
              </option>
            </select>
            <input
              v-else
              :type="item.type || 'text'"
              v-model="data[item.name]"
              :id="item.name"
              :name="item.name"
              :placeholder="item.placeholder"
            />
          </div>
        </div>
        <div class="form-btns">

        </div>
      </div>
      <component v-if="modalStore.component && modalStore.isActive" :is="modalStore.component" />
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  position: fixed;
  z-index: 1000;
  padding: 1%;
  border-radius: 8px;
  background-color: #e6f5fa;
}
</style>
