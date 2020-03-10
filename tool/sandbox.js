var sodium = {
  name: 'Sodium',
  function: 'Needed for proper fluid balance, nerve transmission, and muscle contraction.',
  sources: 'Table salt, soy sauce; large amounts in processed foods; small amounts in milk, breads, vegetables, and unprocessed meats.'
}
var chloride = {
  name: 'Chloride',
  function: 'Needed for proper fluid balance, stomach acid.',
  sources: 'Table salt, soy sauce; large amounts in processed foods; small amounts in milk, meats, breads, and vegetables.'
}
var potassium = {
  name: 'Potassium',
  function: 'Needed for proper fluid balance, nerve transmission, and muscle contraction.',
  sources: 'Meats, milk, fresh fruits and vegetables, whole grains, legumes.'
}
var calcium = {
  name: 'Calcium',
  function: 'Important for healthy bones and teeth; helps muscles relax and contract; important in nerve functioning, blood clotting, blood pressure regulation, immune system health.',
  sources: 'Milk and milk products; canned fish with bones (salmon, sardines); fortified tofu and fortified soy milk; greens (broccoli, mustard greens); legumes.'
}
var phosphorus = {
  name: 'Phosphorus',
  function: 'Important for healthy bones and teeth; found in every cell; part of the system that maintains acid-base balance.',
  sources: 'Meat, fish, poultry, eggs, milk, processed foods (including soda pop).'
}
var magnesium = {
  name: 'Magnesium',
  function: 'Found in bones; needed for making protein, muscle contraction, nerve transmission, immune system health.',
  sources: 'Nuts and seeds; legumes; leafy, green vegetables; seafood; chocolate; artichokes; "hard" drinking water.'
}

var sulfur = {
  name: 'Sulfur',
  function: 'Found in protein molecules.',
  sources: 'Occurs in foods as part of protein: meats, poultry, fish, eggs, milk, legumes, nuts.'
}


var macroMinerals = [sodium, chloride, potassium, calcium, phosphorus, magnesium, sulfur];

console.table(macroMinerals);