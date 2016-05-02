# Prufer Code

Prufer code is a sequence of numbers that represents a unique tree. A tree with $N$ vertex will have a Prufer code of length $N-2$.

## How it Works

Watch these two videos:

1. [Graph Theory: 40. Cayley's Formula and Prufer Seqences part 1/2](https://www.youtube.com/watch?v=Ve447EOW8ww)
1. [Graph Theory: 41. Cayley's Formula and Prufer Seqences part 2/2](https://www.youtube.com/watch?v=utfW-xsDp3Y)

## Prufer Code to Tree

The second video above describes how to build the tree from prufer code.

1. Build a list containing nodes from $1$ to $N$.
2. Find the smallest node from the list which is absent in prufer code, and connect it to the first element of the code.
3. Remove the smallest node from the list and remove the first element of prufer code.
4. Repeat until prufer code is empty.
5. There will be two nodes left in the list. Connect them.

The following applies the pseducode above:

``` cpp

vector<int> prufer;

void pruferCodeToTree() {

    /*Stores number count of nodes in the prufer code*/
    map<int,int> mp;

    /* Set of integer absent in prufer code*/
    set<int> st;

    int len = prufer.size();
    int n = len + 2;

    /*Count frequency of nodes*/
    for ( int i = 0; i < len; i++ ) {
        int t = prufer[i];
        mp[t]++;
    }

    /*Find the absent nodes*/
    for ( int i = 1; i <= n; i++ ) {
        if ( mp.find ( i ) == mp.end() ) st.insert ( i );
    }

    /*Connect Edges*/
    for ( int i = 0; i < len; i++ ){
        int a = prufer[i]; // First node

        /*Find the smallest number which is not present in prufer code now*/
        int b = *st.begin(); // Second node

        printf ( "%d %d\n", a, b ); // Edge of the tree

        st.erase ( b ); // Remove absent list
        mp[a]--; // Remove from prufer code
        if ( mp[a] == 0 ) st.insert ( a ); // If a becomes absent
    }

    /*The final edge*/
    printf ( "%d %d\n", *st.begin(), *st.rbegin() );
}

```
This code has a time complexity of $O(NlogN)$.

**Problem**: [Timus 1069 - Prufer Code](http://acm.timus.ru/problem.aspx?num=1069)

## Application

### Tree With Given Degree

Given an array `D[]`, where `D[i]` is the degree of $i_{th}$ node, find number of labeled tree possible.

**Lemma**: A node with degree $d$ will occur $d-1$ times in the Prufer Code.

Therefore, number of possible tree with given degree array is:

$$ \binom{n-2}{d_1-1,d_2-1,...,d_n-1} $$

### Creation of Random Tree

Prufer code is often used to build random trees. Build a random prufer code of length $N-2$ with integers between $[1,N]$ and then use that code to build the tree.
