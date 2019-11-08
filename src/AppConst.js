class Constants {
  constructor() {
    this.SERVER_URL = 'http://192.168.1.24:8000';

    let n = 0;
    this.NO_POPUP = n++;
    this.OK_POPUP = n++;
    this.ERROR_POPUP = n++;
    this.OK_CANCEL_POPUP = n++;
    this.CHANGE_PASS_POPUP = n++;
    this.CHANGE_INFO_POPUP = n++;
  }
}

const Instance = new Constants();
export default Instance;
