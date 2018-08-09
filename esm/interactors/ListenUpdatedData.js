class ListenUpdatedData {
  constructor(fogConnector, cloudConnector) {
    this.fogConnector = fogConnector;
    this.cloudConnector = cloudConnector;
  }

  async execute() {
    await this.cloudConnector.onDataUpdated(async (id, sensorId, data) => {
      await this.fogConnector.setData(id, sensorId, data);
    });
  }
}

export default ListenUpdatedData;
