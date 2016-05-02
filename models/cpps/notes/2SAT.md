# 2SAT

# Different kind of Clauses

We mainly use two types of operation. OR and AND. Using this two operation we can enforce different kind of clauses.

- AB both can't be false: A OR B
- AB both can't be true: !A OR !B
- Exactly one is true among AB: Apply both (A OR B) and (!A OR !B)
- Among many variables, only one can be true: For any two of the variables, both can't be true.
- A is true: !A -> A

# Confirm Values of Variables
Sometimes, due to the edges of the implicit graphs, some variables become obvious.

- If $A$ can be reached from $!A$, then $A$ must be false.
- If $A$ becomes true, then all nodes that can be reached from $A$ also becomes true.
- If $A$ is false, then all nodes from which $A$ can be reached are also false.

Using these three rules we can find out values of variables that gets forced by the conditions. All other variables can be either true or false.

**Problem**: [UVaLive 4452 The Ministers' Major Mess](http://acm.hust.edu.cn/vjudge/problem/visitOriginUrl.action?id=11950)

# Code
```cpp
/*
1. The nodes need to be split. So change convert() accordingly.
2. Using clauses, populate scc edges.
3. Call possible, to find if a valid solution is possible or not.
4. Dont forget to keep space for !A variables
*/
struct SAT2 {
    SCC scc; /// This is from SCC Class

    SAT2(): bfscc(1) {}

    void clear() {
        scc.clear();
    }

    int convert ( int n ) { ///Change here. Depends on how input is provided
        int x = ABS(n);
        x--;
        x *= 2;
        if ( n < 0 ) x ^= 1;
        return x;
    }

    void mustTrue ( int a ) { ///A is True
        scc.adj[a^1].pb ( a );
    }
    void orClause ( int a, int b ) { /// A || B clause
        //!a->b !b->a
        scc.adj[a^1].pb ( b );
        scc.adj[b^1].pb ( a );
    }
    /// Out of all possible option, only one is true
    void atMostOneClause ( int a[], int n, int flag ) {
        if ( flag == 0 ) { /// At most one can be false
            FOR(i,0,n){
                a[i] = a[i] ^ 1;
            }
        }
        FOR(i,0,n) {
            FOR(j,i+1,n) {
                orClause( a[i] ^ 1, a[j] ^ 1 ); /// !a || !b both being true not allowed
            }
        }
    }

    ///Send n, total number of nodes, after expansion
    bool possible( int n ) {
        scc.findSCC( n );

        FOR(i,0,n) {
            int a = i, b = i^1;
            ///Falls on same cycle a and !a.
            if ( scc.cycle[a] == scc.cycle[b] ) return false;
        }

        ///Valid solution exists
        return true;
    }

    ///To determine if A can be true. It cannot be true, if a path exists from A to !A.
    int vis[SAT2NODE], qqq[SAT2NODE], bfscc;
    void bfs( int s ) {
        bfscc++;
        int qs = 0, qt = 0;
        vis[s] = bfscc;
        qqq[qt++] = s;
        while ( qs < qt ) {
            s = qqq[qs++];
            FOR(i,0,SZ(scc.adj[s])-1) {
                int t = scc.adj[s][i];
                if ( vis[t] != bfscc ) {
                    vis[t] = bfscc;
                    qqq[qt++] = t;
                }
            }
        }
    }

}sat2;

```
