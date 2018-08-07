// Infrastructure
import Settings from 'data/Settings';
import ConnectorFactory from 'infrastructure/ConnectorFactory';
import FogConnection from 'infrastructure/FogConnection';
import DeviceStore from 'infrastructure/DeviceStore';

// Domain
import UpdateDevices from 'interactors/UpdateDevices';
import DevicesService from 'services/DevicesService';

const settings = new Settings();

async function main() {
  const fogCredentials = await settings.getFogCredentials();
  const fogAddress = await settings.getFogAddress();
  const cloudSettings = await settings.getCloudSettings();

  try {
    const cloudConnector = ConnectorFactory.getConnector(cloudSettings.type);
    const fogConnection = new FogConnection(fogAddress, fogCredentials);
    
    const deviceStore = new DeviceStore([]);
    const updateDevices = new UpdateDevices(deviceStore, fogConnection, cloudConnector);
    const devicesService = new DevicesService(updateDevices);

    await cloudConnector.start();
    await fogConnection.start();

    setInterval(updateDevices.execute.bind(updateDevices), 3000);
  } catch (err) {
    console.error(err);
  }
}

main();
