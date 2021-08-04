export class Bourbon {
  constructor(bId, title) {
    this.bId = bId;
    this.title = title;
  }
}

export const bourbonMap = new Map();
bourbonMap.set(0, new Bourbon(0, 'Four Roses'));
bourbonMap.set(1, new Bourbon(1, 'Woodford Reserve'));
bourbonMap.set(2, new Bourbon(2, 'Maker\'s Mark'));
bourbonMap.set(3, new Bourbon(3, 'Elijah Craig'));

export default function handler(req, res) {
  let bourbons = new Array();
  bourbonMap.forEach(bourbon => {
    bourbons.push(bourbon);
  })
  res.status(200).json({ bourbons: bourbons });
}
