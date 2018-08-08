/* eslint-disable no-console */
// Infrastructure
import Settings from 'data/Settings';
import ConnectorFactory from 'network/ConnectorFactory';
import FogConnector from 'network/FogConnector';
import DeviceStore from 'data/DeviceStore';

// Domain
import UpdateDevices from 'interactors/UpdateDevices';
import DevicesService from 'services/DevicesService';

const settings = new Settings();

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

    const deviceStore = new DeviceStore(cloud.listDevices());
    const updateDevices = new UpdateDevices(deviceStore, fog, cloud);
    const devicesService = new DevicesService(updateDevices);

    setInterval(devicesService.update.bind(devicesService), 5000);
  } catch (err) {
    console.error(err);
  }
}

main();
