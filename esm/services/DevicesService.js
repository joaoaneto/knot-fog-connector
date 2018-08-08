class DevicesService {
  constructor(updateDevicesInteractor) {
    this.updateDevicesInteractor = updateDevicesInteractor;
  }

  async update() {
    await this.updateDevicesInteractor.execute();
  }
}

export default DevicesService;
