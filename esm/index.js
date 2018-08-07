import Settings from 'data/Settings';
import ConnectorFactory from 'infrastructure/ConnectorFactory';

const settings = new Settings();

async function main() {
  const fogCredentials = await settings.getFogCredentials();
  const fogAddress = await settings.getFogAddress();
  const cloudSettings = await settings.getCloudSettings();

  try {
    const conn = ConnectorFactory.getConnector(cloudSettings.type);
    console.log(`conn: ${conn.type}`);
  } catch (err) {
    console.error(err);
  }
}

main();
