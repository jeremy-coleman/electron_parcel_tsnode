import { observable, action, makeObservable , makeAutoObservable} from "mobx";

/* class AppStore {

  @observable hello = "Hello from React! Start editing src/app.js with hot-reloading 'npm run start'"
  @observable count = 0

  @action
  inc = () => this.count++

  @action
  resetCount = () => this.count = 0

  multiply(a: number, b: number) {
    return a * b;
  }

} */

class AppStore {

  hello =
    "Hello from React! Start editing src/app.js with hot-reloading 'npm run start'";

  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  inc = () => this.count++;

  resetCount = () => (this.count = 0);

  multiply(a: number, b: number) {
    return a * b;
  }

}

let state = new AppStore();

export { state, AppStore };
export default state;
