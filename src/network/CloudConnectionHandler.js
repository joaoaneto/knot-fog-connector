import logger from 'util/logger';

class CloudConnectionHandler {
  constructor(cloud, dataService) {
    this.cloud = cloud;
    this.dataService = dataService;
  }

  async start() {
    console.log('Cloud Connection Handler start...');
    this.cloud.onDataUpdated(this.onDataUpdated);
    this.cloud.onDataRequested(this.onDataRequested);
  }

  async onDataUpdated(id, data) {
    data.forEach(({ sensorId, value }) => {
      logger.debug(`Update data from ${sensorId} of thing ${id}: ${value}`);
    });
    await this.dataService.update(id, data);
  }

  async onDataRequested(id, sensorIds) {
    logger.debug(`Data requested from ${sensorIds} of thing ${id}`);
    await this.dataService.request(id, sensorIds);
  }
}

export default CloudConnectionHandler;
