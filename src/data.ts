import { User } from './models/user';
import { Role } from './models/role';
import { ReimbursementStatus } from './models/reimbursement-status';
import { ReimbursementType } from './models/reimbursement-type';

const status = {
  pending: new ReimbursementStatus(0, "pending"),
  approved: new ReimbursementStatus(1, "approved"),
  denied: new ReimbursementStatus(2, "denied")
};

const type = {
  lodging: new ReimbursementType(0, 'lodging'),
  travel: new ReimbursementType(1, 'travel'),
  food: new ReimbursementType(2, 'food'),
  other: new ReimbursementType(3, 'other'),
};

const role = {
  admin: new Role(0, 'admin'),
  financeManager: new Role(1, 'finance manager'),
  employee: new Role(2, 'employee')
};

// const admin = new User(0, 'Admin', )
const larry = new User(3, 'Larry', 'larry@gmail.com', 'pw', 'Larry', 'Fine', role.employee);
const curly = new User(4, 'Curly', 'curly@gmail.com', 'pw', 'Curly', 'Howard', role.employee);
const moe = new User(5, 'Moe', 'moe@gmail.com', 'pw', 'Moe', 'Howard', role.employee);

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