<script setup lang="ts">
import { ref, onMounted } from 'vue'

const progress = ref(0)
const percentage = ref(0)

// Smoother easing function that creates a more dramatic slowdown
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4)
}

onMounted(() => {
  const duration = 4000 // 4 seconds total for much slower effect
  const interval = 16 // Update every 16ms (60fps for smoothness)
  const totalSteps = duration / interval
  let currentStep = 0

  const timer = setInterval(() => {
    currentStep++
    const normalizedTime = currentStep / totalSteps
    const easedProgress = easeOutQuart(normalizedTime) * 100

    // Smooth progress bar animation with precise values
    progress.value = easedProgress
    // Round to whole numbers for display
    percentage.value = Math.min(Math.round(easedProgress), 100)

    if (currentStep >= totalSteps || percentage.value >= 100) {
      percentage.value = 100
      clearInterval(timer)
    }
  }, interval)
})
</script>

<template>
  <!-- Particles background -->
  <vue-particles
    id="tsparticles"
    class="-z-0"
    :options="{
      background: {
        color: 'transparent',
      },
      particles: {
        number: { value: 100 },
        color: { value: '#282828' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.3,
          animation: {
            enable: true,
            speed: 0.1,
            minimumValue: 0.3,
          },
        },
        size: {
          value: { min: 1, max: 2 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 1,
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          outModes: { default: 'bounce' },
          random: true,
        },
        links: {
          enable: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          repulse: { distance: 120, duration: 0.4 },
          push: { quantity: 3 },
        },
      },
      detectRetina: true,
    }"
  />

  <div class="text-center z-10">
    <!-- Loading Text -->
    <div class="space-y-2 mb-8">
      <h2 class="text-xl font-semibold text-language">Loading zense.dev</h2>
      <p class="text-language/60 text-sm">
        {{
          percentage < 40
            ? 'Initializing file explorer...'
            : percentage < 70
              ? 'Setting up file tree...'
              : percentage < 100
                ? 'Almost ready...'
                : 'Complete!'
        }}
      </p>
    </div>

    <!-- Progress Bar Container -->
    <div class="w-80 mx-auto space-y-3">
      <!-- Progress Bar -->
      <div class="relative">
        <div
          class="w-full bg-background-100 rounded-full h-4 overflow-hidden border border-background shadow-inner"
        >
          <div
            class="bg-gradient-to-r from-accent via-accent/90 to-accent/80 h-full rounded-full transition-all duration-75 ease-linear relative overflow-hidden shadow-lg"
            :style="{ width: `${progress}%` }"
          >
            <!-- Animated shine effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"
            ></div>
          </div>
        </div>

        <!-- Progress glow effect -->
        <div
          class="absolute top-0 left-0 h-full bg-accent/30 rounded-full blur-sm transition-all duration-100"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>

      <!-- Percentage Display -->
      <div class="flex items-center justify-center">
        <div class="text-center">
          <div class="text-4xl text-language tabular-nums percentage">{{ percentage }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./styles/LoadingScreen.css" scoped />
