<template>
   <div class="pagination" v-if="filteredNumbers.length > 1">
      <ul class="pagination__list">
         <li>
            <button @click="navigatePage('prev')" :disabled="!info.prev">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
               >
                  <path
                     d="M15 6L9 12L15 18"
                     stroke="#444444"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                  />
               </svg>
            </button>
         </li>
         <li v-for="number in filteredNumbers" :key="number">
            <button
               class="category-pagination__btn"
               :class="{
                  active: current === number,
                  disabled: number == '...',
               }"
               @click="navigatePage(number)"
            >
               {{ number }}
            </button>
         </li>
         <li>
            <button :disabled="!info.next" @click="navigatePage('next')">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
               >
                  <path
                     d="M9 6L15 12L9 18"
                     stroke="#282828"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                  />
               </svg>
            </button>
         </li>
      </ul>
   </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
   info: Object,
   current: Number,
});
const emit = defineEmits(["navigate"]);
const filteredNumbers = computed(() => {
   let range = [];
   for (let i = 0; i < props?.info?.pages; i++) {
      range.push(i + 1);
   }
   if (range.length > 5) {
      if (props.current < 5) {
         return [1, 2, 3, 4, 5, "...", range.length];
      } else if (props.current > range.length - 5) {
         return [
            1,
            "...",
            range.length - 4,
            range.length - 3,
            range.length - 2,
            range.length - 1,
            range.length,
         ];
      } else {
         return [
            1,
            "...",
            props.current - 2,
            props.current - 1,
            props.current,
            props.current + 1,
            props.current + 2,
            "...",
            range.length,
         ];
      }
   }
   return range;
});
function navigatePage(type) {
   emit("navigate", type);
}
</script>
