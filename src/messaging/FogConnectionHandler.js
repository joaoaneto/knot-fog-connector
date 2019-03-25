class FogConnectionHandler {
  constructor(logger, fog, devicesService, dataService) {
    this.logger = logger;
    this.fog = fog;
    this.devicesService = devicesService;
    this.dataService = dataService;
  }

  async start() {
    this.fog.on('config', this.onConfigReceived);
    this.fog.on('message', this.onMessageReceived);
  }

  async onConfigReceived(device) {
    try {
      this.logger.debug('Receive fog changes');
      this.logger.debug(`Device ${device.id} has changed`);
      await this.devicesService.updateChanges(device);
    } catch (err) {
      this.logger.error(err);
    }
  }

  async onMessageReceived(msg) {
    try {
      this.logger.debug(`Receive fog message from ${msg.fromId}`);
      this.logger.debug(`Payload message: ${msg.payload}`);
      await this.dataService.publish(msg.fromId, msg.payload);
    } catch (err) {
      this.logger.error(err);
    }
  }
}

export default FogConnectionHandler;
