<script lang="ts" setup>
import {computed, inject, onMounted, onUnmounted, ref} from 'vue';
import {StatusOption, StatusType,StatusReason} from "./data.ts";
import Option from "./Option.vue";
import {statusService as statusServiceKey, StatusService} from "./status.service.ts";

const props = defineProps<{ initialStatus?: StatusType; }>();
const emit = defineEmits<{ (e: 'change', status: StatusType, reason?: string): void; }>();

const statusService = inject<StatusService>(statusServiceKey);

const {statuses, reasons} = statusService?.getStatusOptions() ?? {};


console.log(statuses, reasons)

const currentStatus = ref<StatusType>(props.initialStatus || 'ready');
const timer = ref('00:00');
const selectedNotReadyReason = ref('');

const currentOption = computed(() => statuses?.get(currentStatus.value));
const statusReasons = computed(() => {
  const statusReasons: StatusReason[] = [];
  reasons?.forEach(v => statusReasons.push(v));

  return statusReasons;
});

const availableOptions = computed(() => {
  const options: StatusOption[] = [];
  statuses?.forEach(v => {
    if (!v.transitions?.length || v.value === currentStatus.value) {
      return;
    }
    options.push(v);
  });

  console.log(options);

  return options;
});

let timerInterval: number | undefined;

const startTimer = () => {
  let seconds = 0;
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timer.value = `${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`;
  }, 1000);
};

const handleStatusChange = (value: string | string[]) => {
  if (Array.isArray(value)) {
    const [status, reason] = value;
    const finalStatus = status as StatusType;

    currentStatus.value = finalStatus;
    selectedNotReadyReason.value = reason;

    emit('change', finalStatus, reason);
  } else {
    const finalStatus = value as StatusType;
    currentStatus.value = finalStatus;
    selectedNotReadyReason.value = '';

    emit('change', finalStatus);
  }

  startTimer();
};

onMounted(() => startTimer());

onUnmounted(() => clearInterval(timerInterval));
</script>

<template>
  <!-- :teleported="false" -->
  <div class="custom-select">
    <el-select
        v-model="currentStatus"
        style="width: auto; min-width: 200px; border-radius: 4px"
        :style="{ border: '1px solid ' + currentOption?.color }"
        @change="handleStatusChange"
    >
      <template #prefix>
        <span class="indicator" :style="{ backgroundColor: currentOption?.color }" />
      </template>

      <template #label>
        <div style="display: flex; justify-content: space-between" :style="{ color: currentOption?.color }">
          <span>{{ currentOption?.label }}</span>
          <span>{{ timer }}</span>
        </div>
      </template>

      <template v-for="status in availableOptions" :key="status.value">
        <Option :status="status" :reasons="statusReasons" />
      </template>
    </el-select>
  </div>
</template>

<style scoped>
</style>
