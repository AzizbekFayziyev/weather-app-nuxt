<template>
    <div class="flex flex-col gap-4 text-white p-6 -mt-52">
        <div class="flex gap-6">
            <p class="flex items-center text-shadow">
                <span class="sm:text-8xl text-6xl">{{ Math.round(currentRegion?.temp) }}</span>
                <span class="sm:text-4xl text-2xl">°C</span>
            </p>

            <div>
                <img class="object-contain w-[80px] h-[80px]" :src="`/icons/${currentRegion?.icon}.png`" alt="weather icon">

                <span class="text-lg">{{ currentRegion?.description }}</span>
            </div>
        </div>

        <div class="text-shadow">
            <h1 class="sm:text-6xl text-5xl font-semibold">{{ currentRegion?.name }}</h1>
            <p class="sm:text-xl text-lg ml-2 mt-2">{{ currentDate }}</p>
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