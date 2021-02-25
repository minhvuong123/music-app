export function convertSingers(singer: []) {
  const names: string[] = [];
  singer.forEach(( s : any ) => {
    names.push(s.singer_name); 
  })
  return names.join(', ');
}