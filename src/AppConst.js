class Constants {
  constructor() {
    this.SERVER_URL = 'http://171.244.142.172:8000';

    let n = 0;
    this.NO_POPUP = n++;
    this.OK_POPUP = n++;
    this.ERROR_POPUP = n++;
    this.OK_CANCEL_POPUP = n++;
    this.CHANGE_PASS_POPUP = n++;
    this.CHANGE_INFO_POPUP = n++;
    this.NO_PERMISSION_POPUP = n++;
    this.NO_INTERNET_POPUP = n++;
    this.NO_ACTIVE_POPUP = n++;
  }
}

const Instance = new Constants();
export default Instance;
