#Diffusion Models: An Intuitive Introduction
Daniel Jacobs - Massachussetts Institute of Technology - Dec 8th, 2022

Introduction:

This introduction to Diffusion Models is a guide to a few papers, most notably Denoising Diffusion Probabilistic Models [J.Ho et al., 2020] and Cold Diffusion: Inverting Arbitrary Image Transforms Without Noise [A.Bansal et al., 2022]. It builds on many excellent guides already available while trying to fill in gaps that may make it friendlier to learn. 

At a high-level, diffusion models (inspired by the modeling of molecular systems) are functions that take a blank input (like an image of white noise) and predict what would need to be removed from it in order to make a clear output that generally belongs to an observed population (a population here refers to a group that cannot be characterized exactly so instead is approximated through samples, like a dataset).

The input can be interpreted as an unknown instance of that population, degraded by a process that has caused it to lose all its information. The typical process involves adding noise to the input, much like releasing water vapor into a sauna until it becomes hard to see through the diffused steam. A more concrete example: given an image of white noise and having been trained on images of cartoons, a diffusion model would learn how to substract pixel values from the input in order to produce an image of a cartoon.

This destructive process is refered to as forward diffusion and it is the first step in building a generative diffusion model. This is because, as you might imagine, if we can get our hands on many examples of how a group of inputs get destroyed then we might be able to train a neural network to approximate the function that does the reverse, i.e. recover an input that has been highly degraded or entirely destroyed.

Let's dive into the typical forward diffusion process. Most research surrounding diffusion models thus far is based on a random destructive process where bits of an image are replaced with Gaussian noise in T steps. As T becomes large the image becomes unrecognizable and we can imagine that as T approaches infinity the result is perfect and absolute randomness.

[Slide your cursor from left to right to forward diffuse the image.]

We can imagine then that the reverse of this function would, in theory, take perfectly random noise and return an image that hails from the same population as our training dataset. Given only a partially degraded image it would instead restore the original image. Why?

As soon as we begin to inject the image with random noise, the result becomes a function of randomness and can only be expressed as a probability distribution, defined by a central tendency (e.g. mean) and variance. 

Mathematically, stochastic forward diffusion is a Markov Chain. A Markov chain is a way of describing a sequence of events where the probablity of a given state depends on the one immediately precesing it. That is, the image at any step t during the diffusion process depends on the random result at step t-1 before it. In other words, the probability of observing one of the many possible instances of our degraded image at step T is conditional on the observation made at step T-1. The images are referred to as samples because they are an instance of the probability distribution that defines them. Even our original input can be seen as an instance from an unknown distribution, the population referenced earlier. 

We can express this in closed format like this:

q(xt|x0) = N (xt;√α¯tx0,(1 − α¯t)I)

The distribution of T|X0 is the distribution of T1|T0 * T2|T1 * ... * T|T-1.

where T|t-1 is equal to xXXXX

In practice the proprotion of noise that replaces the original input with random noise is often dictated by a variance schedule which is a series of parameters B that define how much random noise will be replaces at each time T.

[Look at tree for some intution about this.]

What happens when T is large vs small? https://arxiv.org/pdf/2206.05173.pdf

So far in order to see what our image would look like at timestep T we would need to apply it 100 times. If we want a few Xt so that a neural net can interpolate and learn the reverse process then we need 100 timesteps times the amount of samples per image you are training.

But through some clever algebra, it has been shown that to produce time a sample at time T you can do this in one step, given a prestep where you multiply your variance schedule. This is referred to as the reparamatrization trick.

So that forward diffusion process simplifies to this:




Note that up to this point the forward process involves no training, no neural networks, it is only the defining mathematically how to take an input that we assume belongs to an undefined population and taking it through a series of stochastic transformations.

So the reverse of the forward diffusion process mathematical is XT|t-1 is t-1|TX, that is given information about TX, define t-1. So T-1|TX and T-2|T-1 ...until T0|t-1. if we knew what the distribution of our input, T0, we might be done. The things is we don't know what that distrubution is, i.e we don't know how to express mathematically mammograms where you can output tumor etc.

This is why we use a neural network, to approximate a high dimensional function. Using out input output pairs which represent the diffusion process for a variety of data that represent our unknown population.

A highly compressed explanation of neural networks but it has been shown that neural networks are universal function approximators given the right architecture. You can imagine them as piece wise linear functions with a bunch of parameters that define the slopes and y interecepts of each of those sections. We use gradient descent then to minimize the error,or our loss function, similarly to how you would fit a line to data. Thus we need a function for our "error" to minimize,

The algebraic derivation of the correct function is relatively complex but lets try to think about it intuitively.

In our case we want a function that defines the "error" or the difference between a picture at an arbitrary state in the diffusion process T and the approximation produced by our neural net which is an estimate of the reverse diffusion process, if we can do that accurately for a bunch of pictures from our populuation and a bunch of timesteps then we know we have arrived at a good approximation of the precise function that does that.

So for part A, a picutre at an arbitrary state in the diffusion process T we can take a picture from our data set (which remember represents a larger unknown population) and apply the forward diffusion process to get X+T+ e. Basically it's orgignal picture + a specific proportion of gaussian error.

Ok and so for part B we have what our reverse process approximation outputs which takes t, and random noise and knowing it needs to output something in the realm of XO produces something in the realm.

Ok the result from this is a function that given random noise it can produce a sample from the approximate distrubtion based on our data set.

That is an overview of Diffusion Models.












