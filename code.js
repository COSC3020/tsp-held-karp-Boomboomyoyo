function tsp_hk(distance_matrix) {
  if(distance_matrix.length < 2)
  {
    return 0
  }
  //Helper function which passes necessary information to recursive solution
  allCities = new Set([])
  for(i = 0; i < distance_matrix.length; i++)
  {
    allCities.add(i)
  }
  minimum = Infinity
  cache = []
  for(i = 0; i < distance_matrix.length; i++)
  {
    temp = heldKarp(distance_matrix, i, allCities, cache)
    if(minimum > temp)
    {
      minimum = temp
    }
  }
  cache = []
  return minimum
}

function heldKarp(dist, start = 0, unvisited, cache) {
  var key = JSON.stringify(Array.from(unvisited).sort())
  if(cache[key] === undefined)
  {
    cache[key] = [];
  }
  if(cache[key][start] !== undefined)
  {
    return cache[key][start];
  }
  // First section. If only two unvisited cities remain, return the distance between them.
  if(unvisited.size == 2)
  {
    let temp = Array.from(unvisited)
    return dist[temp[0]][temp[1]]
  }
  // Else, find minimum of subsets where 1 city has been removed
  let min = Infinity
  for(let city of unvisited)
  {
    if(city != start)
    {
      // Create copy of unvisited cities that I can remove one element from each iteration of the loop
      let nextCities = new Set(unvisited)
      nextCities.delete(start)
      //unvisited.delete(start)
      let temp = heldKarp(dist, city, nextCities, cache) + dist[start][city]
      if(min > temp)
      {
        min = temp
      }
      //unvisited.add(city)
    }
  }
  cache[key][start] = min
  return min
}
