import Connector from 'knot-fog-connector-fiware'; 
//import Connector from 'infrastructure/Connector';

class ConnectorFactory {
  static getConnector(cloudType) {
    switch (cloudType) {
      case 'FIWARE':
        return new Connector();
      default:
        throw Error('Unknown cloud');
    }
  }
}

export default ConnectorFactory;
