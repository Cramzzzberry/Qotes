<script setup></script>

<template>
  <div class="flex h-full flex-col">
    <div class="w-full grow overflow-y-auto">
      <header class="sticky top-0 bg-doublemint-50 pb-2 lg:px-14">
        <div class="place-self-start px-2 pb-2 pt-10">
          <AppButtonGhostIcon @click="$router.go(-1)" icon="arrow_back" />
        </div>
        <div class="flex w-full flex-col px-3">
          <p class="text-3xl font-medium leading-none">Settings</p>
          <p>Change your app preferences</p>
        </div>
      </header>
    </div>
  </div>
</template>
