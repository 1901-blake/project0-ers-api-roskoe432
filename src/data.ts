import { User } from './models/user';
import { Role } from './models/role';
import { ReimbursementStatus } from './models/reimbursement-status';
import { ReimbursementType } from './models/reimbursement-type';

export let DB = (function(){
  function DB(){}

  let status = {
    pending: new ReimbursementStatus(0, "pending"),
    approved: new ReimbursementStatus(1, "approved"),
    denied: new ReimbursementStatus(2, "denied")
  };

  let type = {
    lodging: new ReimbursementType(0, 'lodging'),
    travel: new ReimbursementType(1, 'travel'),
    food: new ReimbursementType(2, 'food'),
    other: new ReimbursementType(3, 'other'),
  };

  let role = {
    admin: new Role(0, 'admin'),
    financeManager: new Role(1, 'finance manager'),
    employee: new Role(2, 'employee')
  };

  let users = [
    new User(0, 'Larry', 'larry@gmail.com', 'pw', 'Larry', 'Fine', role.employee),
    new User(1, 'Curly', 'curly@gmail.com', 'pw', 'Curly', 'Howard', role.employee),
    new User(2, 'Moe', 'moe@gmail.com', 'pw', 'Moe', 'Howard', role.employee)
  ];

  //------------------------------------------------------------------
  
  DB.selectAllUsers = function() {
    return users;
  };
  DB.selectUsersByRole = function(role) {
    return users.filter(user => {
      return user.role === role;
    });
  };
  DB.selectUserById = function(id: number, func: any) {
    let user = users.find(user => {
      return (user.userId === id);
    });
    if(user) { func(user); }
  };

  return DB;
})();

DB.selectUserById(0, user => {
  console.log(user.getFullName);
});

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