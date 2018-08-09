/* eslint-disable no-console */
// Infrastructure
import Settings from 'data/Settings';
import DeviceStore from 'data/DeviceStore';
import ConnectorFactory from 'network/ConnectorFactory';
import FogConnector from 'network/FogConnector';

// Domain
import UpdateDevices from 'interactors/UpdateDevices';
import LoadDevices from 'interactors/LoadDevices';
import ListenUpdatedData from 'interactors/ListenUpdatedData';
import DevicesService from 'services/DevicesService';
import DataService from 'services/DataService';

const settings = new Settings();
const deviceStore = new DeviceStore();

async function main() {
  const fogCredentials = await settings.getFogCredentials();
  const fogAddress = await settings.getFogAddress();
  const cloudSettings = await settings.getCloudSettings();
  const cloudType = await settings.getCloudType();

  try {
    let fog;
    const cloud = ConnectorFactory.create(cloudType, cloudSettings);
    if (fogCredentials.uuid && fogCredentials.token) {
      fog = new FogConnector(
        fogAddress.host,
        fogAddress.port,
        fogCredentials.uuid,
        fogCredentials.token,
      );

      await fog.connect();
      await cloud.start();
    } else {
      throw Error('Missing uuid and token');
    }

    const updateDevices = new UpdateDevices(deviceStore, fog, cloud);
    const loadDevices = new LoadDevices(deviceStore, cloud);
    const listenUpdatedData = new ListenUpdatedData(fog, cloud);
    const devicesService = new DevicesService(updateDevices, loadDevices);
    const dataService = new DataService(listenUpdatedData);

    await devicesService.load();

    await dataService.listenUpdated();

    setInterval(devicesService.update.bind(devicesService), 5000);
  } catch (err) {
    console.error(err);
  }
}

main();
