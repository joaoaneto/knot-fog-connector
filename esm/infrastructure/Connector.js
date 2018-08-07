class Connector {
  constructor(type) {
    this.type = type;
  }

  async start() { // eslint-disable-line no-empty-function
    console.log('Start test');
  }
  
  async addDevice(device) { // eslint-disable-line no-empty-function,no-unused-vars
    console.log('AddDevice test');
  }

  async removeDevice(id) { // eslint-disable-line no-empty-function,no-unused-vars
    console.log('RemoveDevice test');
  }
}

export default Connector;
