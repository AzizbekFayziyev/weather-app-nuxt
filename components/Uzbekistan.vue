<template>
    <!-- Uzbekistan svg map -->
    <svg class="max-w-[80%] mx-auto z-50 relative stroke-white" baseprofile="tiny" height="652" stroke-linecap="round"
        stroke-linejoin="round" stroke-width=".3" version="1.2" viewbox="0 0 1000 652"
        xmlns="http://www.w3.org/2000/svg">
        <g id="features">
            <!-- Regions -->
            <path v-for="region in regions" :key="region.id" :id="region.id" @click="onHandleClick(region)"
                @mouseenter="onHandleEnter(region?.name)" @mousemove="onHandleHover" @mouseleave="onHandleLeave" :class="{
                    'fill-primary': region.id === currentRegion?.id,
                    'fill-gray-500': region.id !== currentRegion?.id,
                }" class="hover:fill-primary active:fill-primary/80 cursor-pointer transition-colors" :d="region.d"
                :name="region.name">
            </path>
        </g>
    </svg>

    <!-- Modal info -->
    <div ref="modalRef" class="absolute bg-gray-400 border border-white p-3 rounded-xl z-50 hidden" style="transform: translate(-30%, -150%);">
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
        modalEl.style.left = `${event.pageX}px`;
        modalEl.style.top = `${event.pageY}px`;
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