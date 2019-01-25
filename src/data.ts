import { User } from './models/user';
import { Role } from './models/role';
import { ReimbursementStatus } from './models/reimbursement-status';
import { ReimbursementType } from './models/reimbursement-type';
import { Reimbursement } from './models/reimbursement';

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
    new User(0, 'Ben', 'ben@gmail.com', 'pw', 'Ben', 'Snow', role.admin),
    new User(1, 'John', 'john@gmail.com', 'pw', 'John', 'Doe', role.financeManager),
    new User(2, 'Larry', 'larry@gmail.com', 'pw', 'Larry', 'Fine', role.employee),
    new User(3, 'Curly', 'curly@gmail.com', 'pw', 'Curly', 'Howard', role.employee),
    new User(4, 'Moe', 'moe@gmail.com', 'pw', 'Moe', 'Howard', role.employee)
  ];

  //new Date('2019-01-01')

  let reimbursements = [
    new Reimbursement(0, 2, 1000, 
      new Date('2019-01-01').getTime(), 
      new Date('2019-01-02').getTime(), 
      'For flip flops', 1, 
      status.denied.statusId, 
      type.food.typeId
    ),
    new Reimbursement(1, 3, 200,
      new Date('2019-01-01').getTime(),
      new Date('2019-01-02').getTime(),
      'Gas reimbursement', 1,
      status.approved.statusId,
      type.travel.typeId
    ),
    new Reimbursement(2, 4, 75,
      new Date('2019-01-01').getTime(),
      new Date('2019-01-02').getTime(),
      'Hotel stay', 1,
      status.pending.statusId,
      type.lodging.typeId
    )
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
  DB.selectUserById = function(res, id: number) {
    if(users[id]) {
      return users[id];
    }
    res.sendStatus(404).send("404 User Not Found!");
  };

  DB.selectAllReimbursements = function() {
    return reimbursements;
  };
  DB.selectReimbursentByStatus = function(id: number) {
    return reimbursements.filter(item => { return item.status === id; });
  };
  DB.selectReimbursentByUser = function(id: number) {
    
  };

  return DB;
})();

// console.log(DB.selectReimbursentByStatus(0));

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