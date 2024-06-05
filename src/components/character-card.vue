<template>
   <div class="character-card">
      <div class="character-card__image">
         <img :src="info.image" alt="" />
      </div>
      <div class="character-card__info">
         <div class="character-card__header">
            <div class="character-card__name">{{ info.name }}</div>
            <div class="character-card__status">
               <span>{{ info.status }}</span
               ><span>{{ info.species }}</span>
            </div>
         </div>
         <div class="character-card__item">
            <span class="character-card__subtitle">Last known location:</span>
            <div class="character-card__location">{{ info.location.name }}</div>
         </div>
         <div class="character-card__item">
            <span class="character-card__subtitle">First seen in:</span>
            <div class="character-card__first">{{ info.origin.name }}</div>
         </div>
      </div>
   </div>
</template>
<script setup>
const props = defineProps({
   info: Object,
});
</script>
