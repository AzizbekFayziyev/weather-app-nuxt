<template>
    <div class="flex flex-col gap-4 text-white p-6 -mt-52">
        <div class="flex gap-2">
            <p class="flex text-shadow">
                <span class="text-8xl">{{ Math.round(currentRegion?.temp) }}</span>
                <span class="text-4xl">°C</span>
            </p>

            <div>
                <img class="object-cover w-[80px]" :src="`/icons/${currentRegion?.icon}.png`" alt="weather icon">

                <span class="text-lg">{{ currentRegion?.description }}</span>
            </div>
        </div>

        <div class="text-shadow">
            <h1 class="text-6xl font-semibold">{{ currentRegion?.name }}</h1>
            <p class="text-xl ml-2 mt-2">{{ currentDate }}</p>
        </div>
    </div>
</template>

<script setup>
const { currentRegion } = defineProps(["currentRegion"]);

// current date
const currentDate = ref(new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: "2-digit", weekday: 'long', day: 'numeric', month: 'short', year: '2-digit', hour12: false }).replace(',', ' -'));
let dateInterval = null;

onMounted(() => {
    // Update: currentDate
    dateInterval = setInterval(() => {
        currentDate.value = new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: "2-digit", weekday: 'long', day: 'numeric', month: 'short', year: '2-digit', hour12: false }).replace(',', ' -');
    }, 1000);
});


onUnmounted(() => {
    // Clear: currentDate interval
    if (dateInterval !== null) {
        clearInterval(dateInterval);
    }
})
</script>