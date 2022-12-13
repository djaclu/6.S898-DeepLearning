#Diffusion Models: An Intuitive Introduction
Daniel Jacobs - Massachussetts Institute of Technology - Dec 8th, 2022

Introduction:

This introduction to Diffusion Models is a guide to a few papers, most notably Denoising Diffusion Probabilistic Models [J.Ho et al., 2020] and Cold Diffusion: Inverting Arbitrary Image Transforms Without Noise [A.Bansal et al., 2022]. It builds on many excellent guides already available while trying to fill in gaps that may make it friendlier to learn. The examples here are based on the MNIST Fashion database.

At a high-level, diffusion models (inspired by the modeling of molecular systems) are functions that take a blank input (like an image of white noise) and predict what would need to be removed from it in order to make a clear output that generally belongs to an observed population (a population here refers to a group that cannot be characterized exactly so instead is approximated through samples, like a dataset).

The input can be interpreted as an unknown instance of that population, degraded by a process that has caused it to lose all its information. The typical process involves adding noise to the input, much like releasing water vapor into a sauna until it becomes hard to see through the diffused steam. A more concrete example: given an image of white noise and having been trained on images of cartoons, a diffusion model would learn how to substract pixel values from the input in order to produce an image of a cartoon.

This destructive process is refered to as forward diffusion and it is the first step in building a generative diffusion model. This is because, as you might imagine, if we can get our hands on many examples of how a group of inputs get destroyed then we might be able to train a neural network to approximate the function that does the reverse, i.e. recover an input that has been highly degraded or entirely destroyed.

Let's dive into the typical forward diffusion process. Most research surrounding diffusion models thus far is based on a random destructive process where bits of an image are replaced with Gaussian noise in T steps. As T becomes large the image becomes unrecognizable and we can imagine that as T approaches infinity the result is perfect and absolute randomness.

[Slide your cursor from left to right to forward diffuse the image.]

We can imagine then that the reverse of this function would, in theory, take perfectly random noise and return an image that hails from the same population as our training dataset. Given only a partially degraded image it would instead restore the original image. Why?

As soon as we begin to inject the image with random noise, the result becomes a function of randomness and can only be expressed as a probability distribution, defined by a central tendency (e.g. mean) and variance. 

Mathematically, stochastic forward diffusion is a Markov Chain. A Markov chain is a way of describing a sequence of events where the probablity of a given state depends on the one immediately precesing it. That is, the image at any step t during the diffusion process depends on the random result at step t-1 before it. In other words, the probability of observing one of the many possible instances of our degraded image at step T is conditional on the observation made at step T-1. The images are referred to as samples because they are an instance of the probability distribution that defines them. Even our original input can be seen as an instance from an unknown distribution, the population referenced earlier.

[Look at tree for some intution about this.]

We can express this in closed format as:

The distribution of T|X0 is the distribution of T1|T0 * T2|T1 * ... * T|T-1.

where T|t-1 is equal to xXXXX

In practice the proportion of the image that is swapped with noise can be set to change (i.e. it is not necessarily constant) during each timestep according to a variance schedule that cointains a sequence of ratios B. So far in order to see what our image would look like at timestep T we would need calculate T conditional probabilities. You can imagine that this would quickly become impractical for a large T. Instead, through some clever algebra, [J.Ho et al., 2020] showed it is possible to calculate this in a single step with a small amount of precalculations. This is referred to as the reparametization trick. 

So that forward diffusion ultimately simplifies to this:

q(xt|x0) = N (xt;√α¯tx0,(1 − α¯t)I)

Note that the forward process involves no training or neural networks, it is a closed-form formula for taking an input and finding the result of applying a specific amount of random degradations. If forward diffusion is q(xt|x0) then reverse diffusion would be q(x0|xt) where q(xt-1|xt) x q(xt-2|xt-1) x q(x0-2|x1). The issue is we actually don't know x0, i.e. the distribution of our population, we only have an approximation and therefore deriving reverse diffusion analytically is not possible. Instead we approximate this reverse function with a neural network. This implies we will need to design a loss function (i.e. loss function).

The algebraic derivation of our loss function is relatively complex but lets try to think about it intuitively.

In our case we want a loss function that defines the "error" or difference between a picture at an arbitrary timestep T in the diffusion process and the prediction from our neural net. So the first part, our target is basically an image from the dataset plus a specific amount of degradation. For the second part, our prediction is the output

Ok and so for part B we have what our reverse process approximation outputs which takes t, and random noise and knowing it needs to output something in the realm of XO produces something in the realm.

Ok the result from this is a function that given random noise it can produce a sample from the approximate distrubtion based on our data set.







