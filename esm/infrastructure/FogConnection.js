import Client from 'knot';

class FogConnection {
  constructor(address, credentials) {
    if (credentials.uuid && credentials.token) {
      this.client = new Client(address.host, address.port, credentials.uuid, credentials.token);
    } else {
      throw Error('Missing uuid and token')
    }
  }

  start() {
    return this.client.connect();
  }

  close() {
    return this.client.close();
  }

  devices() {
    return this.client.getDevices();
  }
}

export default FogConnection;
