#Diffusion Models: An Intuitive Introduction
Daniel Jacobs - Massachussetts Institute of Technology - Dec 8th, 2022

Introduction:

This introduction of Diffusion Models borrows from many excellent guides, including this one by AI Summer and additionally elaborates on certain aspects that round out understanding with can help those with a gaps bit more gaps.

At a high-level, diffusion models are functions that have learned to take a "degraded" input (typically Gaussian noise) and determine what would need to be subtracted from it in order to produce an output that generally belongs to a group it has previusly seen. A common example: given an image of white noise and having been trained on images of cats, a diffusion model would learn how to substract pixel values from that image of white noise in order to produce an image of a cat.

Diffusion models are inspired by the modeling of molecular systems, one way to think of the diffusion process is as if you were releasing a gas (noise) into a chamber (image) until.

In order for the neural network to approximate this function it first needs input-output pairs.

To generation of this input-output pairs is called forward diffusion and it consists of taking an input, like an image and replacing bits of it with Gaussian npise in iterations (T) until the original input is completely destroyed. As T approaches infinity you can imagine the output of this function is perfect and absolute random noise.

[Slide your cursor from left to right to forward diffuse the image.]

We can imagine then that the reverse of this function could take entirely random noise and produce an output that belongs to the same "family" as the input.

Having these input, output pairs, a neural net could be theoretically trained to approximate this reverse function, that is, turning random noise into samples from this population, generating data in so.


Lets focus on the forward diffusion process.

Mathematically, the forward diffusion process takes the form of a Markov Chain. A Markov chain is when the probability of a given state depends on the ones before them, the simplest version being when it only depends on the event that immediately precedes.

That is, the image at any stage (timestep 0 through T) in this forward diffusion process can be defined as probability distribution conditional on the step before it. In other words, the probability of image at step T given information about step T-1.

Why? Because as soon as we begin to replace the image with bits of randomness, the output of that process at anypoint is a function of randomness and must be expressed as a probability distribution defined by a mean and variance.

The images are called samples because they are an instance of the probability distribution that defines them. Even our input, X0 can be seen as an instance from an unknown high dimendioanl distribution,  where each dimension represents features like whether the the cat is big , fluffy or organge.

We can express this in closed format like this:

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












