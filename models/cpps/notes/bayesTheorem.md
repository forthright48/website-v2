# Bayes' Theorem

This theorem is used in Artificial Intelligence ( at least I encountered it there extensively ). It is a simple statement that describes a method to swap position of variable in conditional probability.

$$P(A|B) = \frac{P(A)P(B|A)}{P(B)}$$

# Intuitive Explanation

Suppose we know the probability of getting cancer, $P(C)$, probability of getting positive result in cancer test $P(T)$ and probability that a person gets positive test result if he has cancer as $P(T|C)$. Find the probability that a person has cancer if his test result comes out positive, i.e, find $P(C|T)$.

Now, let us rephrase the question. How many ways are there for a person to get a positive result? A person can get positive result when he has cancer or when he doesn't ( false positive ). Let the sum of all possibilities be $P(T)$, the total probability.

Now, out of those possibilities, some positive results were from people who really had cancer, and some were false positive. And what is that probability? $P(C) \times P(T|C)$ - meaning, a person will get cancer **and then** also get positive test result.

Only this fraction, $\frac{P(T|C)P(C)}{P(T)}$ is the probability that if a person gets positive test result, he really does have cancer, meaning, this is $P(C|T)$. Hence, $P(C|T) = \frac{P(T|C)P(C)}{P(T)}$, which complies with Bayes' Theorem.
