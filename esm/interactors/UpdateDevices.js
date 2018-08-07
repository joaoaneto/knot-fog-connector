class UpdateDevices {
  constructor(deviceStore, fogConnection, cloudConnector) {
    this.deviceStore = deviceStore;
    this.fogConnection = fogConnection;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    console.log('polling devices...');    

    await this.updateDevicesAdded();
    await this.updateDevicesRemoved();
  }

  async updateDevicesAdded() {
    const cloudDevices = await this.deviceStore.list();
    console.log(cloudDevices);
    const fogDevices = await this.fogConnection.devices();
    console.log(fogDevices);
    
    const devicesAdded = fogDevices.filter(fogDevice => {
      return !cloudDevices.some(cloudDevice => {
        return fogDevice.uuid == cloudDevice.uuid;
      });
    });

    if (devicesAdded) {
      for (let device of devicesAdded) {
        await this.deviceStore.add(device);
        await this.cloudConnector.addDevice(device);
      }
    }
  }

  async updateDevicesRemoved() {
    // devices removed
    const cloudDevices = await this.deviceStore.list();
    console.log(cloudDevices);
    const fogDevices = await this.fogConnection.devices();
    
    const devicesRemoved = cloudDevices.filter(cloudDevice => {
      return !fogDevices.some(fogDevice => {
        return cloudDevice.uuid == fogDevice.uuid;
      });
    });
    
    if (devicesRemoved) {
      for (let device of devicesRemoved) {
        await this.deviceStore.remove(device);
        await this.cloudConnector.removeDevice(device);
      }
    }
  }
}

export default UpdateDevices;
