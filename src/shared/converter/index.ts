export function convertSingers(singer: []) {
  const names: string[] = [];
  singer.forEach(( s : any ) => {
    names.push(s.singer_name); 
  })
  return names.join(', ');
}

export function formatNumberToTime(number: number): string {
  const date = new Date(0);
  date.setSeconds(number); // specify value for SECONDS here

  let timeString;
  if (number >= 3600) {
    timeString = date.toISOString().substr(11, 8);
  } else {
    timeString = date.toISOString().substr(14, 5);
  }
  return timeString;
}