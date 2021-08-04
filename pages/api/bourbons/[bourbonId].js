import {bourbonMap} from "./index";

export default function handler(req, res) {
  const { bourbonId } = req.query;
  console.log('Bourbon map: ' + JSON.stringify(bourbonMap));
  if (bourbonMap.has(bourbonId)) {
    res.status(200).json({ bourbon: bourbonMap.get(bourbonId) });
  } else {
    res.status(404).json({ error: `Bourbon with  id=${bourbonId} not found` });
  }
}
