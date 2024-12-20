<script lang="ts" setup>
import {StatusOption, StatusReason} from "./data.ts";

const {status, reasons} = defineProps<{ status: StatusOption; reasons?: StatusReason[] }>();

console.log(status, reasons);

</script>

<template>
  <!-- Reasons option -->
  <template v-if="status.reasons?.length">
    <el-option-group :label="status.label" :style="{ '--el-color-info': status.color }">
      <el-option
          v-for="reason in reasons"
          :key="reason.value"
          :label="reason.label"
          :value="[status.value, reason.value]"
      >
        <div class="status-option">
          <span class="indicator" :style="{ backgroundColor: status.color }"/>
          <span :style="{ color: status.color }" class="status-reason">{{ reason.label }}</span>
        </div>
      </el-option>
    </el-option-group>
  </template>
  <!-- /.Reasons option -->

  <!-- Regular options -->
  <template v-else>
    <el-option :value="status.value" :label="status.label">
      <div class="status-option">
        <span class="indicator" :style="{ backgroundColor: status.color }"/>
        <span :style="{ color: status.color }">{{ status.label }}</span>
      </div>
    </el-option>
  </template>
  <!-- /.Regular options -->
</template>

<style scoped>
.status-option {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-reason {
  font-size: 14px;
  font-weight: lighter;
}

:deep(.el-select-group__title) {
  font-size: 1.2em;
}

:deep(.el-select-group) {
  padding-left: 2rem;
}
</style>
