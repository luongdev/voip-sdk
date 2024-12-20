<script lang="ts" setup>
import { StatusOption, StatusType } from "./data.ts";

defineProps<{ status: StatusOption; }>();

</script>

<template>
  <!-- Reasons option -->
  <template v-if="status.reasons?.length">
    <el-option-group :label="status.label" :style="{ '--el-color-info': status.color }">
      <el-option v-for="reason in status.reasons" :key="reason.value" :value="reason.value" :label="reason.label">
        <div class="status-option">
          <span class="indicator" :style="{ backgroundColor: status.color }"/>
          <span :style="{ color: status.color }">{{ reason.label }}</span>
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
</style>
