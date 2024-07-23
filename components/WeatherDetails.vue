<template>
    <div class="flex flex-col gap-4 overflow-x-hidden xl:pb-12 pb-8">
        <!-- Weakly weather info -->
        <Box class="weather__details p-6 w-[405px]">
            <h3 class="text-info flex justify-between items-center">6-Day forecast

                <button @click="toggleMode = !toggleMode" class="hover:text-primary text-lg">
                    <span class="mr-2">{{ toggleMode ? "Day" : "Night" }}</span>

                    <i :class="{
                        'bi-moon-stars-fill': !toggleMode,
                        'bi-brightness-high-fill': toggleMode,
                    }" class="bi"></i>
                </button>
            </h3>
            <!-- Weakly info -->
            <h5 v-for="daily in currentRegion?.daily" class="weather-list">
                <span class="flex items-center"><img class="mr-2 w-[50px] h-[50px] object-contain"
                        :src="`/icons/${toggleMode ? daily?.weather[0]?.icon : daily?.weather[0]?.icon.slice(0, -1) + 'n'}.png`"
                        alt="">{{ getWeakday(daily?.dt * 1000) }}:</span>
                <span>{{
                    Math.round(toggleMode ? daily?.temp?.day : daily?.temp?.night) }} <sup>°C</sup></span>
            </h5>
        </Box>
        <!-- Weather Details -->
        <Box class="weather__details p-6 w-[405px]">
            <h3 class="text-info">Current weather details</h3>

            <h5 class="weather-list">
                <span><i class="mr-2 bi bi-cloud"></i> Clouds:</span> <span>{{ currentRegion?.current?.clouds
                    }}%</span>
            </h5>

            <h5 class="weather-list">
                <span><i class="mr-2 bi bi-droplet-half"></i> Humidity:</span> <span>{{ currentRegion?.humidity
                    }}%</span>
            </h5>

            <h5 class="weather-list">
                <span><i class="mr-2 bi bi-cloud-haze2"></i> Wind speed:</span> <span>{{
                    currentRegion?.current?.wind_speed
                }} m/s</span>
            </h5>

            <h5 class="weather-list">
                <span><i class="mr-2 bi bi-thermometer-high"></i> Temp max:</span> <span>{{
                    Math.round(currentRegion?.current?.temp?.max) }} <sup>°C</sup></span>
            </h5>

            <h5 class="weather-list">
                <span><i class="mr-2 bi bi-thermometer"></i> Temp min:</span> <span>{{
                    Math.round(currentRegion?.current?.temp?.min) }} <sup>°C</sup></span>
            </h5>


            <h5 class="weather-list">
                <span><i class="mr-2 bi bi-brightness-high-fill"></i> Day:</span> <span>{{
                    Math.round(currentRegion?.current?.temp?.day) }} <sup>°C</sup></span>
            </h5>

            <h5 class="weather-list">
                <span><i class="mr-2 bi bi-moon"></i> Night:</span> <span>{{
                    Math.round(currentRegion?.current?.temp?.night) }} <sup>°C</sup></span>
            </h5>
        </Box>
    </div>
</template>

<script setup>
const { currentRegion } = defineProps(["currentRegion"]);

// Toggle day/night weekday info
const toggleMode = ref(true);

// Array of weekday names
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Get weakday
const getWeakday = (dt) => weekdays[new Date(dt).getUTCDay()];
</script>