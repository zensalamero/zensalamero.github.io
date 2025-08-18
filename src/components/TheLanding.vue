<script setup lang="ts"></script>

<template>
  <!-- Particles background -->
  <vue-particles
    id="tsparticles"
    :options="{
      background: {
        color: 'transparent',
      },
      particles: {
        number: { value: 100 },
        color: { value: '#00ffcc' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.8,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.3,
          },
        },
        size: {
          value: { min: 2, max: 5 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 1,
          },
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          outModes: { default: 'bounce' },
          random: true,
        },
        links: {
          enable: true,
          color: '#00ffcc',
          opacity: 0.6,
          distance: 150,
          width: 1,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onHover: { enable: true, mode: 'repulse' },
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
</template>
