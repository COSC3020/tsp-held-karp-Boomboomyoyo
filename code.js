function tsp_hk(distance_matrix) {
  if(distance_matrix.length < 2)
  {
    return 0
  }
  unvisited = []
  for(i = 0; i < distance_matrix.length; i++)
  {
    unvisited.push(true)
  }
  unvisited.push(distance_matrix.length)
  return heldKarp(distance_matrix, unvisited)
  
}

function heldKarp(dist, unvisited, start = 0, cache = new Map([])) {
  //console.log(unvisited.size)
  if(unvisited[dist.length] == 2)
  {
      temp = []
      for(i = 0; i < dist.length; i++)
      {
        if(unvisited[i] == true)
        {
          temp.push(i)
        }
      }
      return dist[temp[0]][temp[1]]
  } else
  {
    min = [Infinity, -1]
    for(let i = 0; i < dist.length; i++)
    {
      // Make sure there is an edge there. In this sort of distance matrix, the edges that aren't there
      // as well as edges to self are treated as 0
      if(unvisited[i] && dist[start][i] > 0)
      {
        unvisited[i] = false
        unvisited[dist.length]--
        cand = [heldKarp(dist, unvisited, i) + dist[start][i], i]
        if(min[0] > cand[0])
        {
          min = cand
        }
        unvisited[cand[1]] = true
        unvisited[dist.length]++
      }
    }
    unvisited[min[1]] = false
    unvisited[dist.length]--
    if(min[0] == Infinity)
    {
      return 0
    } else{
      return min[0]
    }
  }
}

console.log(tsp_hk([[0,2],[2,0]]))
/*console.log(heldKarp(
    [[0,1,2],
    [1,0,2],
    [2,2,0]], 1, new Set([1,0])))*/

/*
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city*/