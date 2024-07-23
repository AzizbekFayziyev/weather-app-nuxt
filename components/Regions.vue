<template>
    <!-- All regions weather info -->
    <div class="weather__regions max-w-[1000px] mt-4">
        <div ref="scrollContainer" @mousedown="startScroll" @mousemove="scroll" @mouseup="stopScroll"
            @mouseleave="stopScroll" @touchstart="startScroll" @touchmove="scroll" @touchend="stopScroll"
            class="flex gap-6 overflow-x-auto overflow-y-hidden cursor-pointer select-none">
            <Box v-for="region in sortedRegions" @click="handleFindRegion(region)"
                class="p-6 sm:min-w-[350px] min-w-[300px] transition-colors duration-300"
                :class="{
                    'bg-primary/60': currentRegion?.id === region.id
                }" :key="region.id">
                <div class="flex items-center justify-between">
                    <img class="-ml-8 pointer-events-none h-[150px] object-contain" width="150" :src="`/icons/${region?.icon}.png`" alt="weather icon">
                    
                    <div>
                        <h6 class="sm:text-6xl text-5xl font-semibold">{{ Math.round(region?.temp) }}<sup class="sm:text-4xl text-3xl">°C</sup>
                        </h6>
                        <h5 class="sm:text-2xl text-xl mt-2">{{ region?.name }}</h5>
                    </div>
                </div>

                <div class="flex justify-between pt-6 border-t border-t-gray-400">
                    <div class="flex flex-col gap-2 items-center text-xl">
                        <i class="mr-2 bi bi-droplet-half"></i>
                        <p>{{ region?.humidity }}%</p>
                    </div>

                    <div class="flex flex-col gap-2 items-center text-xl">
                        <i class="mr-2 bi bi-cloud"></i>
                        <p>{{ region?.clouds }}%</p>
                    </div>

                    <div class="flex flex-col gap-2 items-center text-xl">
                        <i class="mr-2 bi bi-cloud-haze2"></i>
                        <p>{{ region?.wind }} m/s</p>
                    </div>
                </div>
            </Box>
        </div>

    </div>
</template>

<script setup>
const { sortedRegions, regions, fetchCurrentData, currentRegion } = defineProps(["sortedRegions", "regions", "fetchCurrentData", "currentRegion"]);

// Find region
const handleFindRegion = (region) => {
    fetchCurrentData(regions.find(s => s.id === region.id));
}

// Allow horizontal scroll in overflow-x
const scrollContainer = ref(null);

const state = reactive({
    isScrolling: false,
    startX: 0,
    scrollLeft: 0,
    items: Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
});

const startScroll = (e) => {
    state.isScrolling = true;
    const pageX = e.pageX || e.touches[0].pageX;
    state.startX = pageX - scrollContainer.value.offsetLeft;
    state.scrollLeft = scrollContainer.value.scrollLeft;
};

const scroll = (e) => {
    if (!state.isScrolling) return;
    e.preventDefault();
    const pageX = e.pageX || e.touches[0].pageX;
    const x = pageX - scrollContainer.value.offsetLeft;
    const walk = (x - state.startX) * 2; // Scroll speed
    scrollContainer.value.scrollLeft = state.scrollLeft - walk;
};

const stopScroll = () => {
    state.isScrolling = false;
};

onMounted(() => {
    scrollContainer.value.addEventListener('mousedown', startScroll);
    scrollContainer.value.addEventListener('mousemove', scroll);
    scrollContainer.value.addEventListener('mouseup', stopScroll);
    scrollContainer.value.addEventListener('mouseleave', stopScroll);
    scrollContainer.value.addEventListener('touchstart', startScroll);
    scrollContainer.value.addEventListener('touchmove', scroll);
    scrollContainer.value.addEventListener('touchend', stopScroll);
});
</script>