class DataService {
  constructor(listenUpdatedDataInteractor) {
    this.listenUpdatedDataInteractor = listenUpdatedDataInteractor;
  }

  async listenUpdated() {
    await this.listenUpdatedDataInteractor.execute();
  }
}

export default DataService;
