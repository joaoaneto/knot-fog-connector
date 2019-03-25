import config from 'config';
import Settings from 'data/Settings';

class SettingsFactory {
  create() {
    const fog = this.loadFogSettings();
    const cloudType = this.loadCloudTypeSettings();
    const cloud = this.loadCloudSettings();
    const runAs = this.loadRunAsSettings();
    return new Settings(fog, cloudType, cloud, runAs);
  }

  loadFogSettings() {
    return config.get('fog');
  }

  loadCloudTypeSettings() {
    return config.get('cloudType');
  }

  loadCloudSettings() {
    return config.get('cloud');
  }

  loadRunAsSettings() {
    return config.get('runAs');
  }
}

export default SettingsFactory;
