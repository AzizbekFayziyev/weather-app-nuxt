<template>
    <!-- Uzbekistan svg map -->
    <svg class="weather__uzbekistan lg:max-w-[80%] w-full mx-auto z-50 relative stroke-white md:mt-0 sm:-mt-28 -mt-36"
        baseprofile="tiny" height="652" stroke-linecap="round" stroke-linejoin="round" stroke-width=".3" version="1.2"
        viewbox="0 0 1000 652" xmlns="http://www.w3.org/2000/svg">
        <g id="features">
            <!-- Regions -->
            <template v-for="region in regions" :key="region.id">
                <path :id="region.id" @click="onHandleClick(region)" @mouseenter="onHandleEnter(region?.name)"
                    @mousemove="onHandleHover" @mouseleave="onHandleLeave" :class="{
                        'fill-primary': region.id === currentRegion?.id,
                        'fill-gray-500': region.id !== currentRegion?.id,
                    }" class="hover:fill-primary active:fill-primary/80 cursor-pointer transition-colors" :d="region.d"
                    :name="region.name">
                </path>
            </template>
        </g>
    </svg>

    <!-- Modal info -->
    <div ref="modalRef" style="transform: translate(-50%, -50%);"
        class="absolute left-[50%] top-[50%] bg-gray-400 border border-white p-3 rounded-xl z-50 hidden">
        <h2>{{ modalText }}</h2>
    </div>
</template>

<script setup>
const { regions, fetchCurrentData, currentRegion } = defineProps(["regions", "fetchCurrentData", "currentRegion"]);

// Modal ref
const modalRef = ref(null);
// Modal text
const modalText = ref("");

// onClick region info
const onHandleClick = (region) => {
    fetchCurrentData(region);
}

// OnMouseEnter modal info
const onHandleEnter = (regionName) => {
    modalText.value = regionName;
}

// onMouseHover modal position

const onHandleHover = (event) => {
    const modalEl = modalRef.value;

    if (modalEl) {
        modalEl.style.left = `${event.offsetX + 150}px`;
        modalEl.style.top = `${event.offsetY - 100}px`;
        modalEl.style.display = "block";
    }
}

// Hide region info 

const onHandleLeave = () => {
    const modalEl = modalRef.value;

    if (modalEl) {
        modalEl.style.display = "";
    }
}

onMounted(() => {
    fetchCurrentData(regions[1]);
})
</script>