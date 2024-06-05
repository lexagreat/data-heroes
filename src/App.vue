<template>
   <div class="wrapper">
      <main class="main">
         <section class="content">
            <div class="container">
               <div class="content__wrapper">
                  <h1 class="title">Персонажи рика и морти</h1>
                  <div class="characters-filter">
                     <input
                        type="text"
                        placeholder="Name"
                        v-model="name"
                        v-on:keyup.enter="getData(true)"
                     />
                     <input
                        type="text"
                        placeholder="Status"
                        v-model="status"
                        v-on:keyup.enter="getData(true)"
                     />
                     <button @click="getData(true)">Применить</button>
                  </div>
                  <div class="content__main" v-if="data.length">
                     <ul class="content__list">
                        <li v-for="(item, index) in data" :key="index">
                           <character-card :info="item" />
                        </li>
                     </ul>
                     <v-pagination
                        :info="pagination"
                        :current="currentPage"
                        @navigate="onNavigate"
                     />
                  </div>
                  <div class="content__nothing" v-else>Ничего не найдено</div>
               </div>
            </div>
         </section>
      </main>
   </div>
</template>
<script setup>
import { getList } from "@/assets/api/characters.js";
import characterCard from "@/components/character-card.vue";
import vPagination from "./components/v-pagination.vue";
import { ref } from "vue";
const data = ref([]);
const currentPage = ref(1);
const name = ref("");
const status = ref("");
const pagination = ref({});
async function getData(filters) {
   if (filters) {
      currentPage.value = 1;
   }
   let { data: res } = await getList(
      currentPage.value,
      name.value,
      status.value
   );
   if (!res) {
      data.value = [];
      pagination.value = {};
      return;
   }
   data.value = res.results;
   pagination.value = res.info;
}
getData();

async function onNavigate(type) {
   if (type == "prev") {
      currentPage.value--;
   }
   if (typeof type === "number") {
      currentPage.value = type;
   }
   if (type == "next") {
      currentPage.value++;
   }
   await getData();
}
</script>
<style lang="scss">
@import "../src/assets/scss/style";
</style>
