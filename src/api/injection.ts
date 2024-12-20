import {App} from "vue";
import {statusService, StatusService} from '../components/status/status.service.ts';

export const inject = (app: App) => {
    app.provide(statusService, new StatusService())
}
