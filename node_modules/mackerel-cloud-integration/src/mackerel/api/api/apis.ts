export * from './alertApi';
import { AlertApi } from './alertApi';
export * from './hostApi';
import { HostApi } from './hostApi';
export * from './hostMetricApi';
import { HostMetricApi } from './hostMetricApi';
export * from './serviceMetricApi';
import { ServiceMetricApi } from './serviceMetricApi';
export const APIS = [AlertApi, HostApi, HostMetricApi, ServiceMetricApi];
