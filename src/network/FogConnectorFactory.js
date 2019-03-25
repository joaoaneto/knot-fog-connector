import FogConnector from 'network/FogConnector';

class FogConnectorFactory {
  constructor(settings) {
    this.settings = settings;
  }

  create() {
    return new FogConnector(
      this.settings.host,
      this.settings.port,
      this.settings.uuid,
      this.settings.token,
    );
  }
}

export default FogConnectorFactory;
