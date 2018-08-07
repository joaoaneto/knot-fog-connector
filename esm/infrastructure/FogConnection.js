import MeshbluSocketIO from 'meshblu';

class FogConnection {
  constructor(hostname, port, uuid, token) {
    this.connection = new MeshbluSocketIO({
      resolveSrv: false,
      protocol: 'ws',
      hostname,
      port,
      uuid,
      token,
    });
  }

  start() {
    this.connection.connect();

    return new Promise((resolve, reject) => {
      this.connection.on('ready', () => resolve());
      this.connection.on('notReady', () => reject());
    });
  }

  close() {
    return new Promise((resolve) => {
      this.connection.close(() => resolve());
    });
  }

  devices(query) {
    return new Promise((resolve, reject) => {
      this.connection.devices(query, (result) => {
        if (!result.devices) {
          return reject(result.error);
        }

        return resolve(result.devices);
      });
    });
  }
}

export default FogConnection;
