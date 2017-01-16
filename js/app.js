
fetch('https://api.spotify.com/v1/search?q=michael+jackson&type=album')
.then(response =>response.json())
.then(data=> {
  const uris = data.albums.items.map(item=> {
    return item.uri
  }).slice(0,5)
  console.log(uris)

  const tasks = uris.map(uri => fetch('https://api.spotify.com/v1/albums/' +   uri.split(':')[2]))
  return Promise.all(tasks)
}).then (responses => {
  return Promise.all(responses.map(response => response.json()))
}).then(albums => {
  console.log(albums);
  return Promise.all(albums.map(album =>fetch(album.images[0].url)))
}).then(responses => {
  return Promise.all(responses.map(response => response.blob()))
}).then(blobs => {
  return blobs.map(blob => URL.createObjectURL(blob))
  console.log(blobs);
}).then(urls => {
  console.log(urls);
})



// fetch('https://api.spotify.com/v1/search?query=psytrance&offset=0&limit=20&type=artist')
// .then(response =>response.json())
// .then(data=> {
//   const uris = data.artists.items.map(item=> {
//     return item.uri
//   }).slice(0,5)
//   console.log(uris)
//
//   const tasks = uris.map(uri => fetch('https://api.spotify.com/v1/artists/' +   uri.split(':')[2]))
//   return Promise.all(tasks)
// }).then (responses => {
//   return Promise.all(responses.map(response => response.json()))
// }).then(artists => {
//   console.log(artists);
//   return Promise.all(artists.map(artist =>fetch(artist.images[0].url)))
// }).then(responses => {
//   return Promise.all(responses.map(response => response.blob()))
// }).then(blobs => {
//   return blobs.map(blob => URL.createObjectURL(blob))
//   console.log(blobs);
// }).then(urls => {
//   console.log(url);
// })
