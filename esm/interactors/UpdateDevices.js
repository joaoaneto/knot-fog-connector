/* eslint-disable no-await-in-loop */
class UpdateDevices {
  constructor(deviceStore, fogConnector, cloudConnector) {
    this.deviceStore = deviceStore;
    this.fogConnector = fogConnector;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    await this.updateDevicesAdded();
    await this.updateDevicesRemoved();
  }

  async updateDevicesAdded() {
    const cloudDevices = await this.deviceStore.list();
    const fogDevices = await this.fogConnector.getMyDevices();

    fogDevices.filter(fogDevice => !cloudDevices.some(
      cloudDevice => fogDevice.id === cloudDevice.id,
    )).map(async (device) => {
      await this.deviceStore.add(device);
      await this.cloudConnector.addDevice({
        id: device.id,
        name: device.name,
      });
    });
  }

  async updateDevicesRemoved() {
    const cloudDevices = await this.deviceStore.list();
    const fogDevices = await this.fogConnector.getMyDevices();

    cloudDevices.filter(cloudDevice => !fogDevices.some(
      fogDevice => cloudDevice.id === fogDevice.id,
    )).map(async (device) => {
      await this.deviceStore.remove(device);
      await this.cloudConnector.removeDevice(device.id);
    });
  }
}

export default UpdateDevices;
