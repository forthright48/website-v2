# Minimum Expression
Minimum Expression is the alphabetically first representation of a cyclic string.

# Code
This algorithm is taken from Zobayer Hasan's [Blog](https://zobayer2009.wordpress.com/code/#zhou_yuan), where it is named Zhou Yuan's Algorithm. At [Wiki](https://en.wikipedia.org/wiki/Lexicographically_minimal_string_rotation), something similar can be found which is name Booth's Algorithm.

**Explanation**: [Quora](https://www.quora.com/How-does-the-minimum-expression-algorithm-by-Zhou-Yuan-work)
```
inline int minimumExpression(char *s) {
    int i, j, k, n, len, p, q;
    len = n = strlen(s), n <<= 1, i = 0, j = 1, k = 0;
    while(i + k < n && j + k < n) {
        p = i+k >= len ? s[i+k-len] : s[i+k];
        q = j+k >= len ? s[j+k-len] : s[j+k];
        if(p == q) k++;
        else if(p > q) { i = i+k+1; if(i <= j) i = j+1; k = 0; }
        else if(p < q) { j = j+k+1; if(j <= i) j = i+1; k = 0; }
    }
    return i < j ? i : j;
}
```
Pass the function a string, and it will return the index of the position which is lexicographically smallest rotation.
