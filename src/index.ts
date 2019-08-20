import { all } from './notify';

export default {
  hi: true,
};

console.log(all().map(w => [ w.title(), w.app().name() ]));
