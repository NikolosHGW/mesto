export default class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }
  getUserInfo() {
    return { name: this._name.value, job: this._job.value };
  }

  setUserInfo(name, job) {
    this._name.value = name;
    this._job.value = job;
  }
}
