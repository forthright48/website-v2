# Articulation Point

Articulation Point in an undirected graph is a node, removing which disconnects the graph into two components.

A leaf is never an Articulation Point.

Articulation Points can be found using Tarjan Algorithm.

# How to Find Articulation Point

Articulation Points can be found using Tarjan's Algorithm in $O(N+E)$ complexity. We just need to modify it a bit.

Tarjan's Algorithm is just a dfs. Suppose we have a graph with a single component. If there are multiple components, we need to run the algorithm on each of them.

We start from any arbitrary node. This will be root of the graph. For each node, the moment dfs enters it for the first time ( discovered for the first time ), we will record the discovery time.

## disc and low
We will keep track of two things: discovery time and discovery time of earliest node reachable. We store discovery time in `disc[]` array and  discovery time of earliest node reachable in `low[]` array. For newly discovered nodes, the earliest node it can reach is itself. So initially `low[s] = disc[s]`.

Now, for each child `t` of `s`, two things can happen.

### 1. Newly Discovered
`t` can be newly discovered. So this is a tree edge. In this case we simply continue our dfs through `t`.

After running the dfs through `t`, when we backtrack to `s` again, we do some update. Since `t` is child of `s`, if it can reach some early node `x`, then `s` can reach `x` too.

So we update `low[s] = min ( low[s], low[t])`.

### 2. Back Edge
`t` can be a node that has already been discovered. Therefore, this is a back-edge.

Back edge is the sole reason for change in `low[]` value of `s`. This is the edge that allows `s` to connect to eariler nodes.

So we update: `low[s] = min ( low[s], disc[t] )`.

**Note**: We updated using `disc[t]` and not `low[t]`.

## Articulation Point Detection
Now for each child `t` of `s`, we have to check if `s` is articulation point for `t`. That is, does removing `s` disconnects the subgraph rooted at `t`?

We check this by checking `low[t] >= disc[s]`. This means, if there is no back-edge from `t` that goes above `s` ( all nodes above `s` had lower discovery time than `s` ). So `s` is articulation point for `t`. We mark a flag that `s` is articulation point.

This however does not work for root. For root, it must have more than 1 child which has been newly discovered from the root. Only then it is articulation point.

# Code

```cpp
#define ARTNODE 10010

class ArticulationPoint {
    int disc[ARTNODE]; ///Discovery time of nodes
    int low[ARTNODE]; ///Lowest back edge extension
    int col[ARTNODE]; ///Color for marking node

    int cnt; ///Timer
    int cc; ///Color
    int root; ///Root of tree

    void tarjan ( int s, int p ) {
        disc[s] = low[s] = cnt++;
        col[s] = cc + 1;

        int child = 0; ///Needed for root only
        int art = 0;

        for ( int i = 0; i < adj[s].size(); ++i ) {

            int t = adj[s][i];
            if ( t == p ) continue; ///Don't go to parent

            if ( col[t] <= cc ) { ///New node. Discovery.
                child++;

                tarjan ( t, s );
                low[s]=min(low[s],low[t]); ///Update back edge extension for S

                if ( low[t] >= disc[s] ) { ///Back edge of T did not go above S
                    art++; ///S is articulation point for T
                }
            }
            else if ( col[t] == cc + 1 ) { ///Back Edge
                low[s]=min(low[s],disc[t]);
            }
        }

        if ( ( s == root && child > 1 ) || ( s != root && art ) ) {
            ///Edit in this block
            printf ( "This is a articulation point: %d\n", s );
        }
    }

public:

    vector<int> adj[ARTNODE];

    void clear ( int n ) {
        cc += 3; ///cc is now 0. cc+1 is 1
        for (int i = 0; i <= n; i++ ) {
            adj[i].clear();
        }
    }

    void findArt( int n, int start = 0 ) {
        for ( int i = start; i <= n; i++ ) {
            if ( col[i] <= cc ) {
                root = i;
                tarjan ( i, -1 );
            }
        }
    }
}art;

```

## Documentation

### Methods

- Public: `clear()`

 It clears previous states of the algorithm by removing edges from `adj[]` and shifting color.

- Public: `findArt ( int n, int start = 0 )`

 This is responsible for calling tarjan from every component of the graph. It sets the `root` variable before calling `tarjan()`.

 The parameter `start` is optional. Sending this parameter forces the loop to start from `start`.

- Private: `tarjan( int s, int p )`

 This a dfs that use Tarjan's Algorithm, hence the name.

 The last block of the function is what we seek. There we print the articulation points of the graph. If we don't want to print them and do something else, then we have to change there.

### How to use it?

1. Take `N` as input.
2. Call `clear(N)` to clear previous states.
3. Take input of edges in `adj[]`.
4. Call `findArt( N )`. The second parameter is optional. Use it if you want to force 1 based indexing of nodes.

Make sure to change the `printf()` call inside `tarjan()`. Modify it to suit your needs.

**Problem**: [SPOJ SUBMERGE](http://www.spoj.com/problems/SUBMERGE/)

# Number of Components after Node Removal
How many components remain when a node $X$ is removed (excluding the node)?

Suppose we are removing node $X$ and we want to find out value of $compo$, which is number of components remaining when $X$ is removed.

We have to calculate $compo$ separately for root and internal nodes.

- **X is Root and Articulation point**: $compo = child$, where child is number of newly discovered child connected to root. It refers to `child` variable in code.
- **X is not Root and Articulation point**: $compo = art+1$, where `art` refers to variable from code.
- **X is not Articulation Point**: If $X$ is singleton, then $compo = 0$, else $compo = 1$.

So, we can simply add the following logic before the end of `tarjan()` to calculate $compo$ for $s$.

```cpp
int compo = 0;
if ( ( s == root && child > 1 ) || ( s != root && art ) ) {
    if ( s == root ) compo = child;
    else compo = art + 1;
}
else { ///s is not articulation point
    if ( p != -1 || adj[s].size() ) compo = 1; ///It is not singleton
}
```
**Problem**: [POJ 2117 Electricity](http://poj.org/problem?id=2117)
