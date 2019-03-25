class Messaging {
  constructor(dataService, devicesService, fogConnectionHandler, cloudConnectionHandler) {
    this.dataService = dataService;
    this.devicesService = devicesService;
    this.fogConnectionHandler = fogConnectionHandler;
    this.cloudConnectionHandler = cloudConnectionHandler;
  }

  async start() {
    await this.devicesService.load();
    await this.fogConnectionHandler.start();
    await this.cloudConnectionHandler.start();
    setInterval(this.devicesService.update.bind(this.devicesService), 5000);
  }
}

export default Messaging;
