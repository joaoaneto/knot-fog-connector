import Messaging from 'messaging/Messaging';
// Domain

import DeviceStore from 'data/DeviceStore';

import UpdateDevices from 'interactors/UpdateDevices';
import LoadDevices from 'interactors/LoadDevices';
import UpdateChanges from 'interactors/UpdateChanges';
import DevicesService from 'services/DevicesService';
import UpdateData from 'interactors/UpdateData';
import RequestData from 'interactors/RequestData';
import DataService from 'services/DataService';
import PublishData from 'interactors/PublishData';

import FogConnectionHandler from 'messaging/FogConnectionHandler';
import CloudConnectionHandler from 'messaging/CloudConnectionHandler';

class MessagingFactory {
  constructor(fog, cloud) {
    this.fog = fog;
    this.cloud = cloud;
  }

  create() {
    const deviceStore = new DeviceStore();
    const updateDevices = new UpdateDevices(deviceStore, this.fog, this.cloud);
    const loadDevices = new LoadDevices(deviceStore, this.cloud, this.fog);
    const updateChanges = new UpdateChanges(deviceStore, this.cloud);
    const devicesService = new DevicesService(updateDevices, loadDevices, updateChanges);
    const updateData = new UpdateData(this.fog);
    const requestData = new RequestData(this.fog);
    const publishData = new PublishData(deviceStore, this.cloud);
    const dataService = new DataService(
      updateData,
      requestData,
      publishData,
    );

    const fogConnectionHandler = new FogConnectionHandler(
      this.logger,
      this.fog,
      devicesService,
      dataService,
    );
    const cloudConnectionHandler = new CloudConnectionHandler(
      this.logger,
      this.fog,
      devicesService,
      dataService,
    );

    return new Messaging(dataService, devicesService, fogConnectionHandler, cloudConnectionHandler);
  }
}

export default MessagingFactory;
