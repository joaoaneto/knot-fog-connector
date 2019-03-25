import logger from 'util/logger';
import SettingsFactory from 'data/SettingsFactory';

import FogConnectorFactory from 'network/FogConnectorFactory';
import FogConnectionHandler from 'network/FogConnectionHandler';
import CloudConnectorFactory from 'network/CloudConnectorFactory';
import CloudConnectionHandler from 'network/CloudConnectionHandler';
import DevicesPolling from 'network/DevicesPolling';

import DeviceStore from 'data/DeviceStore';

import UpdateDevices from 'interactors/UpdateDevices';
import LoadDevices from 'interactors/LoadDevices';
import UpdateChanges from 'interactors/UpdateChanges';
import RegisterDevice from 'interactors/RegisterDevice';
import UnregisterDevice from 'interactors/UnregisterDevice';
import UpdateSchema from 'interactors/UpdateSchema';
import DevicesService from 'services/DevicesService';
import UpdateData from 'interactors/UpdateData';
import RequestData from 'interactors/RequestData';
import PublishData from 'interactors/PublishData';

import DataService from 'services/DataService';

const settings = new SettingsFactory().create();
const deviceStore = new DeviceStore();

const fog = new FogConnectorFactory(settings.fog).create();
const cloud = CloudConnectorFactory.create(settings);

const updateDevices = new UpdateDevices(deviceStore, fog, cloud);
const loadDevices = new LoadDevices(deviceStore, cloud, fog);
const updateChanges = new UpdateChanges(deviceStore, cloud);
const registerDevice = new RegisterDevice(deviceStore, fog, cloud);
const unregisterDevice = new UnregisterDevice(deviceStore, cloud);
const updateSchema = new UpdateSchema(deviceStore, cloud);

const updateData = new UpdateData(fog);
const requestData = new RequestData(fog);
const publishData = new PublishData(deviceStore, cloud);

const devicesService = new DevicesService(
  updateDevices,
  loadDevices,
  updateChanges,
  registerDevice,
  unregisterDevice,
  updateSchema,
);
const dataService = new DataService(
  updateData,
  requestData,
  publishData,
);

const fogConnectionHandler = new FogConnectionHandler(fog, devicesService, dataService);
const cloudConnectionHandler = new CloudConnectionHandler(cloud, dataService);
const devicesPolling = new DevicesPolling(fog, cloud, devicesService);

async function main() {
  logger.info('KNoT Fog Connnector started');

  try {
    await fog.connect();
    await cloud.start();

    await fogConnectionHandler.start();
    await cloudConnectionHandler.start();

    await devicesService.load();
    await devicesPolling.start();

    if (process.env.NODE_ENV === 'production') {
      process.setgid(settings.runAs.group);
      process.setuid(settings.runAs.user);
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
}

main();
