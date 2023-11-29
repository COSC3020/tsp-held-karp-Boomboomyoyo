[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12774862&assignment_repo_type=AssignmentRepo)
# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.


# Response
Got this working now. I could change the unvisited cities to be tracked by an array instead of a set, but I spent about half an hour on it fruitlessly, and would rather move on to other exercises. It would improve the runtime of my implementation significantly though. I have implemented memoization through a cache

## Runtime Analysis
My implementation follows these steps:
1. Populate a set with all of the cities
2. For each starting city, find the shortest tour via steps 3 through 5. Keep the minimum.
3. For each subset of cities, find the shortest tour via recursion.
4. To recurse, pass the subset of cities minus one, essentially back to step 3 until there are 2 cities left that have been unvisited. Then, return the distance between them.
5. Keep the minimum distance of this subset and return it to step 2.

With my set implementation, it will copy the set an additional time to pass each subset, which is complexity $|V|$. This will run $|V|+2^{|V|}$ times for a starting city in the worst case, as it has to check for each node the case where it is present or not. Then, multiply that by $|V|$ for each starting city, and the total runtime of my algorithm is $|V^3|+2^{|V|}$, not counting memoization. This could be dropped to $|V^2|+2^{|V|}$ if I switched to an array implementation instead of set for keeping track of unvisited cities.

## References
On how to copy a set without the reference also being copied
https://bobbyhadz.com/blog/javascript-deep-copy-map#create-a-shallow-copy-of-a-set-in-javascript

On set operations
https://www.w3schools.com/js/js_object_sets.asp

On map operations
https://www.w3schools.com/js/js_object_maps.asp

Learned about the array method splice from Cade and Clayton, and it would be how to use an array effefctively to track unvisited cities.