import { User } from './models/user';
import { Role } from './models/role';
import { Reimbursement } from './models/reimbursement';



const larry = new User(0, 'Larry', 'larry@gmail.com', 'pw', 'Larry', 'Fine', void 0);
const curly = new User(0, 'Curly', 'curly@gmail.com', 'pw', 'Curly', 'Howard', void 0);
const moe = new User(0, 'Moe', 'moe@gmail.com', 'pw', 'Moe', 'Howard', void 0);

/* 
const slash = new PokemonMove(1, 'slash', 'normal', 25, 10);
const hyperBeam = new PokemonMove(2, 'hyper beam', 'normal', 10, 100);
const blastBurn = new PokemonMove(3, 'blast burn', 'fire', 10, 30);
const surf = new PokemonMove(4, 'surf', 'water', 20, 75);

export let pokemon: Pokemon[] = [
  new Pokemon(4, 'charmander', 5, ['fire'], [slash, blastBurn], peter),
  new Pokemon(7, 'squirtle', 5, ['water'], [hyperBeam, surf], kyle)
];
*/