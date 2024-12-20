<script setup lang="ts">
import Status from './components/status/Status.vue'
import {StatusType} from "./components/status/data.ts";

const { changeFn } = defineProps<{ changeFn?: (...args: any[]) => void; }>();

const handleStatusChange = (status: StatusType, reason?: string) => {
  changeFn?.(status, reason)
};

</script>

<template>
  <Status @change="handleStatusChange"/>
</template>
