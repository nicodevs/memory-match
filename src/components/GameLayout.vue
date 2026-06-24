<script setup lang="ts"></script>

<template>
  <div class="flex h-dvh flex-col bg-slate-900 text-white">
    <header class="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
      <slot name="header" />
    </header>

    <main class="flex flex-1 items-center justify-center overflow-auto p-4">
      <slot />
    </main>

    <footer
      class="flex h-14 shrink-0 items-center justify-between border-t border-white/10 px-4 text-sm text-white/70"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>
