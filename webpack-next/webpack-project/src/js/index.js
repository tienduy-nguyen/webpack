import '../sass/styles.scss';
import { myFunction as f1 } from './helpers/file1';
import { myFunction, anotherFunction } from './helpers/file2';
import moment from 'moment';

console.log('src/js/index.js');
console.log("I'am a line of code from src/js/index.js");
console.log('test watch webpack');
console.log('I think it works');
f1();
myFunction();
anotherFunction();

console.log('-------------------');
console.log(moment().format('MMMM Do YYYY'));
console.log(moment('20111031', 'YYYYMMDD').fromNow());
console.log(moment().subtract(10, 'days').calendar());
