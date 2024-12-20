import {StatusColor, StatusOption, StatusReason, type  StatusType} from "./data.ts";

export const statusService = Symbol('statusService');

export class StatusService {

    private statusOptions = new Map<StatusType, StatusOption>([
        ['ready', {
            label: 'Ready',
            value: 'ready',
            color: StatusColor.Ready,
            transitions: ['not_ready', 'on_call']
        }],
        ['not_ready', {
            label: 'Not Ready',
            value: 'not_ready',
            color: StatusColor.NotReady,
            transitions: ['ready']
        }],
        ['on_call', {
            label: 'On Call',
            value: 'on_call',
            color: StatusColor.OnCall,
            transitions: ['wrap_up']
        }],
        ['wrap_up', {
            label: 'Wrap Up',
            value: 'wrap_up',
            color: StatusColor.WrapUp,
            transitions: ['ready']
        }]
    ])

    private statusReasons = new Map<string, StatusReason>([
        ['lunch', {
            value: 'lunch',
            label: 'Lunch'
        }],
        ['break', {
            value: 'break',
            label: 'Break'
        }],
        ['meeting', {
            value: 'meeting',
            label: 'Meeting'
        }]
    ]);


    getStatusOptions(): { statuses: Map<StatusType, StatusOption>; reasons: Map<string, StatusReason>; } {
        return {
            statuses: this.statusOptions,
            reasons: this.statusReasons
        }
    }
}
