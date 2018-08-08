class DeviceStore {
  constructor(loadDevices) {
    this.loadDevices = loadDevices;
  }

  async add(device) {
    this.loadDevices.push(device);
  }

  async remove(device) {
    const index = this.loadDevices.indexOf(device);
    if (index > -1) {
      this.loadDevices.splice(index, 1);
    }
  }

  async list() {
    return this.loadDevices;
  }
}

export default DeviceStore;
