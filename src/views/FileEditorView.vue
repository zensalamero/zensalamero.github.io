<template>
  <div
    class="file-editor-view overflow-hidden flex flex-col items-center justify-center bg-background p-8"
  >
    <div class="w-full">
      <div class="relative flex h-[92vh]">
        <div
          ref="lineNumbers"
          class="line-numbers text-right pr-3 pt-2 bg-background text-language/60 font-mono select-none overflow-y-auto h-full"
        >
          <span v-for="n in lines" :key="n" class="block h-6 leading-6">{{ n }}</span>
        </div>
        <textarea
          ref="codeArea"
          v-model="code"
          class="code-textarea flex-1 h-full resize-none text-language font-mono text-base p-2 outline-none border-none overflow-y-auto"
          spellcheck="false"
          wrap="off"
          @input="updateLines"
          @scroll="syncScroll"
          @paste="handlePaste"
          @keydown="handleTab"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
const code = ref('')
const lines = ref([1])
const codeArea = ref<HTMLTextAreaElement | null>(null)
const lineNumbers = ref<HTMLDivElement | null>(null)

function updateLines() {
  // Split on any line break: \r\n, \r, or \n
  const count = code.value.split(/\r\n|\r|\n/).length
  lines.value = Array.from({ length: count }, (_, i) => i + 1)
}

function syncScroll() {
  if (codeArea.value && lineNumbers.value) {
    lineNumbers.value.scrollTop = codeArea.value.scrollTop
  }
}

function handlePaste() {
  // Wait for paste to update textarea value, then update lines and scroll
  setTimeout(() => {
    updateLines()
    syncScroll()
  }, 0)
}

function handleTab(e: KeyboardEvent) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const textarea = codeArea.value
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    // Insert two spaces at the cursor
    code.value = code.value.substring(0, start) + '  ' + code.value.substring(end)
    // Move cursor after the inserted spaces
    nextTick(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 2
      updateLines()
    })
  }
}

// Initial update
updateLines()
</script>

<style scoped>
.file-editor-view {
  font-family: var(--font-mono);

  /* Custom VS Code-like scrollbar for Webkit browsers */
  .code-textarea::-webkit-scrollbar,
  .line-numbers::-webkit-scrollbar {
    width: 8px;
    background: var(--color-background-200);
    border-radius: 8px;
  }
  .code-textarea::-webkit-scrollbar-thumb,
  .line-numbers::-webkit-scrollbar-thumb {
    background: var(--color-background-100);
    border-radius: 8px;
    min-height: 24px;
  }
  .code-textarea::-webkit-scrollbar-thumb:hover,
  .line-numbers::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent-200);
  }
  .code-textarea::-webkit-scrollbar-corner,
  .line-numbers::-webkit-scrollbar-corner {
    background: var(--color-background-200);
  }
}

.code-textarea {
  width: 100%;
  border-radius: 0 0.375rem 0.375rem 0;
  background: var(--color-background);
  color: var(--color-language);
  font-family: var(--font-mono);
  line-height: 24px;
  box-shadow: none;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: thin;
  scrollbar-color: var(--color-background-150) var(--color-background);
  white-space: pre;
}
.line-numbers {
  min-width: 2.5rem;
  border-radius: 0.375rem 0 0 0.375rem;
  overflow-y: hidden;
  height: 100%;
  scrollbar-width: thin;
  font-family: var(--font-mono);
  line-height: 24px;
}
</style>
