<script setup lang="ts">
import GithubIcon from '@/assets/icons/GithubIcon.vue'
import LinkedinIcon from '@/assets/icons/LinkedinIcon.vue'
import TypewriterText from '@/components/ui/TypewriterText.vue'

function openGithub() {
  window.open('https://github.com/zensalamero', '_blank')
}

function openLinkedin() {
  window.open('https://www.linkedin.com/in/zensalamero', '_blank')
}
</script>

<template>
  <main>
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Content Header -->
      <div class="p-4 border-b border-background">
        <div class="flex items-center justify-between">
          <h2 class="text-language font-semibold text-lg">Welcome to zense.dev</h2>
          <div class="text-foreground/60 text-sm">
            <TypewriterText :words="['Work in progress', 'Ready to code']" :pauseTime="3000" />
          </div>
        </div>
      </div>

      <!-- Content Body -->
      <div class="flex-1 p-6 overflow-auto">
        <div class="max-w-4xl">
          <!-- Welcome Message -->
          <div class="mb-8">
            <h1 class="text-foreground text-xl font-semibold mb-4">Getting Started</h1>
            <p class="text-foreground/70 mb-4">A development workspace inspired portfolio.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 bg-background-50 rounded-lg border border-background">
                <h4 class="text-foreground font-medium mb-2">🚧 Under Construction</h4>
                <p class="text-foreground/60 text-sm">
                  I'm still working on my portfolio.. will finish it as soon as my schedule allows
                  me to <span class="text-xl">😭</span> — check back soon!
                </p>
              </div>
              <div class="p-4 bg-background-50 rounded-lg border border-background">
                <h4 class="text-foreground font-medium mb-2">📁 Explore Files</h4>
                <p class="text-foreground/60 text-sm">
                  Browse your project structure using the file explorer on the left.
                </p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="mb-8">
            <h3 class="text-language text-xl font-semibold mb-4">Quick Actions</h3>
            <div class="flex flex-wrap gap-3">
              <button
                class="flex gap-2 px-4 py-2 bg-background-50 text-language border border-background rounded-lg hover:bg-background-50/70 transition-colors cursor-pointer"
                @click="openGithub"
              >
                <GithubIcon />
                <span>Github</span>
              </button>
              <button
                class="flex gap-2 px-4 py-2 bg-background-50 text-language border border-background rounded-lg hover:bg-background-50/70 transition-colors cursor-pointer"
                @click="openLinkedin"
              >
                <LinkedinIcon />
                <span>Linkedin</span>
              </button>
            </div>
          </div>

          <!-- Recent Files -->
          <div>
            <h3 class="text-foreground text-xl font-semibold mb-4">Recent Files</h3>
            <div class="space-y-2">
              <div
                class="flex items-center p-3 bg-background-50 rounded-lg border border-background hover:bg-background-200 transition-colors cursor-pointer"
              >
                <span class="w-8 h-8 mr-3 text-lg">📄</span>
                <div class="flex-1">
                  <div class="text-foreground font-medium">App.vue</div>
                  <div class="text-foreground/60 text-sm">src/app/App.vue</div>
                </div>
                <div class="text-foreground/40 text-xs">2 minutes ago</div>
              </div>
              <div
                class="flex items-center p-3 bg-background-50 rounded-lg border border-background hover:bg-background-200 transition-colors cursor-pointer"
              >
                <span class="w-8 h-8 mr-3 text-lg">⚙️</span>
                <div class="flex-1">
                  <div class="text-foreground font-medium">package.json</div>
                  <div class="text-foreground/60 text-sm">package.json</div>
                </div>
                <div class="text-foreground/40 text-xs">3 hours ago</div>
              </div>
              <div
                class="flex items-center p-3 bg-background-50 rounded-lg border border-background hover:bg-background-200 transition-colors cursor-pointer"
              >
                <span class="w-8 h-8 mr-3 text-lg">⚙️</span>
                <div class="flex-1">
                  <div class="text-foreground font-medium">tsconfig.json</div>
                  <div class="text-foreground/60 text-sm">tsconfig.json</div>
                </div>
                <div class="text-foreground/40 text-xs">3 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
