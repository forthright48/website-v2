# Shortest Path Graph
Shortest Path Graph (SPG) is a graph where every edge is member of a shortest path from a given source $S$ and destination $T$.

# Build of Shortest Path Graph
Given a normal graph and we need to form SPG. How do we determine which edges to keep?

Let $U-V$ be the edge in question. If the shortest distance from $S\rightarrow U + U \rightarrow V + V \rightarrow T$ or $S\rightarrow V + V \rightarrow U + U \rightarrow T$ is equal to $S \rightarrow T$, then $U-V$ is a part of shortest path from $S$ to $T$.

In order to calculate the above shortest distance, simply run SSSP algorithm from $S$ and $T$.

So we can form SPG in $O(N+E)$.

# Application

## Destroy Shortest Path
Given a graph, what is the minimum number of edge we need to remove so that it is not possible to reach from $S$ to $T$ using any of current shortest path?

Build the SPG from the normal graph. As long as $S$ and $T$ is connected by any path in SPG, there exists a shortest path. So we have to disconnect them.

This is a Min Cut problem. Simply assign capacity of $1$ to each edge in SPG and run maximum flow algorithm for answer.

**Problem**: [HDU 5294 Tricks Device](http://acm.hdu.edu.cn/showproblem.php?pid=5294)
