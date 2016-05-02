# Multinomial Theorem

In mathematics, the multinomial theorem describes how to expand a power of a sum in terms of powers of the terms in that sum. It is the generalization of the binomial theorem to polynomials.

Basically, we are expanding this: $(x_1 + x_2 + \cdots + x_m)^n$, and using Multinomial Theorem we can calculate the value of coefficient of any given term.

The coefficient of the term $x_1^{k_1}x_2^{k_2}\cdots x_m^{k_m}$, where $k_1+k_2\cdots +k_m = n$, is

$$\binom{n}{k_1,k_2,\ldots,k_m} = \frac{n!}{k_1! k_2!\cdots k_m!}$$

**Resource**: [Wiki](https://en.wikipedia.org/wiki/Multinomial_theorem)

## Relation with Binomial Coefficient

$$\binom{n}{k_1,k_2,\ldots,k_m} = \binom{n}{k_1} \cdot \binom{n-k_1}{k_2} \cdots \binom{n-k_1-k_2- \ldots - k_{m-1}}{k_m}$$
