// import { observable } from 'mobx';
// // import { serialize, createSimpleSchema } from 'serializr';

// interface SerializedWindow {
//   frame: Partial<Rectangle>;
//   focused: boolean;
// }

// interface HistoryItem {
//   hash: number;
//   diff: Partial<SerializedWindow>;
// }

// export type History = HistoryItem[];

// declare global {
//   interface WindowObject {
//     history: History;
//   }

//   var Window: WindowObject;
// }

// const serializableProperties = [
//   'processIdentifier',
//   'bundleIdentifier',
//   'name',
//   'icon',
//   'isActive',
//   'isHidden',
//   'isTerminated',
// ];

// const custom = {
//   serializer: (value: any, prop: any, parent: any) => {
//     if (typeof value === 'function') {
//       return value();
//     }
//   },
// };

// // const serializableProperties = [
// //   'processIdentifier',
// //   'bundleIdentifier',
// //   'name',
// //   'icon',
// //   'isActive',
// //   'isHidden',
// //   'isTerminated',
// // ];

// // const WindowFactory = <Window>({ json: { hash } }: Context) => Window.all().find(window => window.hash() === hash);

// // const WindowSchema = createSimpleSchema({
// //   'processIdentifier': custom,
// //   'bundleIdentifier': custom,
// //   'name': custom,
// //   'icon': custom,
// //   'isActive': custom,
// //   'isHidden': custom,
// //   'isTerminated': custom,
// // });

// const serialize = <T, S extends keyof T>(instance: T) => {
//   const serialized: { [P in S]?: boolean | string | number } = {};
//   for (const prop of serializableProperties) {
//     if (prop in instance) {
//       const value: any = instance[prop];
//       serialized[prop]: any = custom.serializer(value, prop, instance);
//     }
//   }

//   return serialized;
// };

// export class HistoryStore {
//   readonly history = observable<any>([]);

//   constructor() {
//     this.hydrate();
//     // autorun(this.history, () => console.log(this.history));
//   }

//   hydrate = () => {
//     // const apps = App.all();
//     // const history = apps.map(dumpApp);
//   }

//   add = (window: Window, app: App) => {
//     const item = {
//       hash: window.hash(),
//       // diff: 
//     };
//     this.history.push(item);
//   }

//   onAppDidActivate = (app: App) => {
//     const window = Window.focused();
//     console.log(serialize<Window, {}>(window));
//     // this.add(window, app);
//   }
// }

// const history = new HistoryStore();

// // Event.on('appDidActivate', history.onAppDidActivate);

console.log();
