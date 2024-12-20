export type StatusType = 'ready' | 'not_ready' | 'on_call' | 'wrap_up';

export enum StatusColor {
    Ready = '#61e066',
    NotReady = '#FF5722',
    OnCall = '#2196F3',
    WrapUp = '#FFC107',
}

export interface StatusReason {
    value: string;
    label: string;
}

export interface StatusOption {
    label: string;
    value: StatusType;
    color: StatusColor;
    reasons?: string[];
    transitions?: StatusType[];
}
