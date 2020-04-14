const singers = [
  { name: 'Steven Tyler', band: 'Aerosmith', born: 1948 },
  { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 },
  { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 },
  { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 },
];

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

console.log(singers.sort(compare));
