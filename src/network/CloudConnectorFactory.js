import KnotCloudConnector from '@cesarbr/knot-fog-connector-knot-cloud';
import logger from 'util/logger';

class CloudConnectorFactory {
  static create(settings) {
    switch (settings.cloudType) {
      case 'KNOT_CLOUD':
        logger.info('KNoT Cloud Connector selected');
        return new KnotCloudConnector(settings.cloud);
      default:
        throw Error('Unknown cloud');
    }
  }
}

export default CloudConnectorFactory;
