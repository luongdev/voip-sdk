<script setup lang="ts">
import Status from './components/status/Status.vue'
import {StatusType} from "./components/status/data.ts";

const { change } = defineProps<{ change: (...args: any[]) => void; }>();

const handleStatusChange = (status: StatusType, reason?: string) => {
  change(status, reason)
};

</script>

<template>
  <Status @change="handleStatusChange"/>
</template>
