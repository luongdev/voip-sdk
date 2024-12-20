<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface StatusOption {
    value: string;
    label: string;
    color: string;
    allowedTransitions: string[];
    reasons?: StatusReason[];
}

interface StatusReason {
    id: string;
    label: string;
}

const props = defineProps<{
    initialStatus?: string;
}>();

const emit = defineEmits<{
    (e: 'statusChange', status: string, reason?: string): void;
}>();

const currentStatus = ref(props.initialStatus || 'ready');
const isReserving = ref(false);
const timer = ref('00:00');
const selectedNotReadyReason = ref('');

const statusOptions: StatusOption[] = [
    {
        value: 'ready',
        label: 'Ready',
        color: '#4CAF50',
        allowedTransitions: ['not-ready'],
    },
    {
        value: 'not-ready',
        label: 'Not Ready',
        color: '#f44336',
        allowedTransitions: ['ready'],
        reasons: [
            { id: 'lunch1', label: 'Lunch' },
            { id: 'break1', label: 'Break' },
            { id: 'meeting1', label: 'Meeting' },
        ],
    },
    {
        value: 'in-call',
        label: 'In Call',
        color: '#000080',
        allowedTransitions: [],
    },
    {
        value: 'disconnect',
        label: 'Disconnect',
        color: '#9E9E9E',
        allowedTransitions: ['ready', 'not-ready'],
        reasons: [
            { id: 'lunch', label: 'Lunch' },
            { id: 'break', label: 'Break' },
            { id: 'meeting', label: 'Meeting' },
        ],
    },
];

const currentStatusOption = computed(() => {
    return statusOptions.find((option) => option.value === currentStatus.value);
});

const availableOptions = computed(() => {
    if (isReserving.value || currentStatus.value === 'in-call') return [];

    const transitions = statusOptions.filter((option) =>
        currentStatusOption.value?.allowedTransitions.includes(option.value)
    );

    return transitions.map((option) => {
        if (option.reasons?.length) {
            return {
                ...option,
                children: option.reasons.map((reason) => ({
                    value: `${option.value}:${reason.id}`,
                    label: reason.label,
                    color: option.color,
                })),
            };
        }
        return option;
    });
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

const handleStatusChange = (value: string) => {
    if (isReserving.value || currentStatus.value === 'in-call') return;

    if (value.includes(':')) {
        const [status, reason] = value.split(':');
        currentStatus.value = status;
        selectedNotReadyReason.value = reason;
        emit('statusChange', status, reason);
    } else {
        currentStatus.value = value;
        selectedNotReadyReason.value = '';
        emit('statusChange', value);
    }

    startTimer();
};

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    clearInterval(timerInterval);
});
</script>

<template>
    <!-- :teleported="false" -->
    <div class="custom-select">
        <el-select
            v-model="currentStatus"
            :disabled="isReserving || currentStatus === 'in-call'"
            style="width: auto; min-width: 200px; border-radius: 4px"
            :style="{ border: '1px solid ' + currentStatusOption?.color }"
            @change="handleStatusChange"
        >
            <template #prefix>
                <div
                    class="status-indicator"
                    :style="{ backgroundColor: currentStatusOption?.color }"
                ></div>
            </template>

            <template #label>
                <div
                    style="display: flex; justify-content: space-between"
                    :style="{ color: currentStatusOption?.color }"
                >
                    <span>{{ currentStatusOption.label }}</span>
                    <span>{{ timer }}</span>
                </div>
            </template>

            <template v-for="option in availableOptions" :key="option.value">
                <!-- Not Ready group with reasons -->
                <template v-if="option.children && option.children.length > 0">
                    <el-option-group :label="option.label" :style="{'--el-color-info': option.color}">
                        <el-option
                            v-for="child in option.children"
                            :key="child.value"
                            :value="child.value"
                            :label="child.label"
                        >
                            <div class="status-option">
                                <div
                                    class="status-indicator"
                                    :style="{ backgroundColor: child.color }"
                                ></div>
                                <span>{{ child.label }}</span>
                            </div>
                        </el-option>
                    </el-option-group>
                </template>
                <!-- Regular options -->
                <template v-else>
                    <el-option :value="option.value" :label="option.label">
                        <div class="status-option">
                            <div
                                class="status-indicator"
                                :style="{ backgroundColor: option.color }"
                            ></div>
                            <span>{{ option.label }}</span>
                        </div>
                    </el-option>
                </template>
            </template>
        </el-select>
    </div>
</template>

<style scoped>
:deep(.el-select-group) {
    padding-left: 24px;
}

.red {
  color: red !important;
}


/* :deep(.el-select-group__title) {
    font-size: 14px;
    font-weight: 500;
    color: #f44336;
} */

.custom-select {
    display: inline-block;
}

.status-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 0;
}

.status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
}
</style>
