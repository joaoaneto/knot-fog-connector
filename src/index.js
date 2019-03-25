import FogConnectorFactory from 'network/FogConnectorFactory';
import CloudConnectorFactory from 'network/CloudConnectorFactory';

import MessagingFactory from 'messaging/MessagingFactory';

import logger from 'util/logger';

import SettingsFactory from 'data/SettingsFactory';

const settings = new SettingsFactory().create();
const fog = new FogConnectorFactory(settings).create();
const cloud = CloudConnectorFactory.create(settings);
const messaging = new MessagingFactory(fog, cloud).create();

async function main() {
  logger.info('KNoT Fog Connnector started');

  try {
    await fog.start();
    await cloud.start();
    await messaging.start();

    if (process.env.NODE_ENV === 'production') {
      process.setgid(settings.runAs.group);
      process.setuid(settings.runAs.user);
    }
  } catch (err) {
    logger.error(err);
  }
}

main();
