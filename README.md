# Latent Diffusion Models: An Intuitive Introduction in a Medical Imaging Context
Daniel Jacobs - Massachussetts Institute of Technology - Dec 8th, 2022

At first glance the potential of generative models (like DALLE-2 and Stable Diffusion) may seem solidly the domain of the arts and other content creators, after all, synthetic imaging mammogram might do for a person with a real case of potential lesion.    

But actually some generative models, including Latent Diffusion Models (LDM), learn to compress the data inputs they are working with. The implication of learning what what information to throw away and what information is important to keep is that the model is internalizing a better understanding or representation of the underlying data. If you can condition this on other variables you can control the generation of the photos. 

For some intuition on why this is useful, in mammograms, if a generative model is capable of understanding the formulation behind the apperance of dense tissue vs that of tumor, it may be able to function as a filter, producing an imagine identical to the input but with the dense tissue removed, allowing a radiologist to see a tumor better.

In this article we are going to review how what laten Diffusion Models, and how latent diff works in detail and why they are strong at what they do and then we will explore particular considerations for the medical sector.

Introduction:

To understand Latent Diffusion Models let's discuss how a more general class of generative model, diffusion models, work. This introduction of Diffusion Models borrows from a myriad of existing guides online, including this one and elaborates on certain aspects that I think can help those with a bit more gaps.

At a high-level, diffusion models take an input, like an image, and replace bits of it with Gaussian noise in iterations (T) until the original input is completely destroyed, as T approximates infinity the output of this proccess is almost nearly isotropic random noise.

This is called the forward diffusion process.

[Slide your cursor over the mammogram above to see the forward diffusion process destroy the sample.]

We could then imagine that since as T appraoched infinrity the output of this is compltely random noise, the reverse of that function will take entirely random noise and produce an output that belongs to the same "family" as the input. If you are confused why the recerse process does not recover the original image, bear with me, we will explain that a litttle later.

Having these input, output pairs, a neural net could be theoretically trained to approximate this reverse function, that is, turning random noise into samples from this population, generating data in so.


Lets focus on the forward diffusion process.

!!!!Latent Space explanation!!!


Mathematically, this takes the form of a Markov Chain. A Markov chain is the probablity situation where one event depends on the ones before them, the simplest version is that it only depends on the event that imeediately precedes. , that is, this image at any stage in this process between time step 0 and T as a probability distribution conditional on the step before it, that is the probability of image at step T given information about step T-1. Why? Because as soon as we begin to replace the image with bits of randomness, the output of that process at anypoint is a function of randomness and msut be expressed as a probability distribution defined by a mean and variance. T after 0 are called samples because they are an instance of the distribution that defines that. Even our input, X0 can be seen as an instance from an unknown high dimendioanl distribution, in the medical case where each dimension represents features like whether the image has a tumor, where the tumor is, shape of the breast etc.

We can express this in closed format like this:

The distribution of T|X0 is the distribution of T1|T0 * T2|T1 * ... * T|T-1.

where T|t-1 is equal to xXXXX

In practice the proprotion of variance that replaces the original input with random noise is dictated by a variance schedule which is a series of parameters B for each time T.

[Look at tree for some intution about this.]

What happens when T is large vs small? https://arxiv.org/pdf/2206.05173.pdf

So far in order to get Xt at timestep T we need to apply it 100 times. If we want a few Xt so that a neural net can interpolate and learn the reverse process then we need 100 timesteps times the amount of samples per image you are training. But through some clever algebra, it has been shown that to produce time a sample at time T you can do this in one step, given a prestep where you multiply your variance schedule. This is referred to as the reparamatrization trick.

So that forward diffusion process simplifies to this:

Note that up to this point the forward process involves no training, no neural networks, it is only the defining mathematically how to take an input that we assume belongs to an undefined population and taking it through a series of stochastic transformations.

So the reverse of the forward diffusion process mathematical is XT|t-1 is t-1|TX, that is given information about TX, define t-1. So T-1|TX and T-2|T-1 ...until T0|t-1. if we knew what the distribution of our input, T0, we might be done. The things is we don't know what that distrubution is, i.e we don't know how to express mathematically mammograms where you can output tumor etc.

This is why we use a neural network, to approximate a high dimensional function. Using out input output pairs which represent the diffusion process for a variety of data that represent our unknown population.

A highly compressed explanation of neural networks but it has been shown that neural networks are universal function approximators given the right architecture. You can imagine them as piece wise linear functions with a bunch of parameters that define the slopes and y interecepts of each of those sections. We use gradient descent then to minimize the error,or our loss function, similarly to how you would fit a line to data. Thus we need a function for our "error" to minimize,

The algebraic derivation of the correct function is relatively complex but lets try to think about it intuitively.

In our case we want a function that defines the "error" or the difference between a picture at an arbitrary state in the diffusion process T and the approximation produced by our neural net which is an estimate of the reverse diffusion process, if we can do that accurately for a bunch of pictures from our populuation and a bunch of timesteps then we know we have arrived at a good approximation of the precise function that does that.

So for part A, a picutre at an arbitrary state in the diffusion process T we can take a picture from our data set (which remember represents a larger unknown population) and apply the forward diffusion process to get X+T+ e. Basically it's orgignal picture + a specific proportion of gaussian error.

Ok and so for part B we have what our reverse process approximation outputs which takes t, and random noise and knowing it needs to output something in the realm of XO produces something in the realm.

I think I finally understand the Diffusion Loss function mystery...i.e why it is sufficient for the target to be random noise? The function we are trying to approximate takes random noise and maps it to an unknown distribution for an arbitrary time between 0 and T  that itself is ultimately conditional on an unknown distribution we are representing with our training data set. We also know that output mathematically is basically ANY x0 from X with a proportion of itself destroyed and replaced with random noise. After all, all our samples are formulated as probability distributions. Ok, part two: the reverse function takes the output of our forward diffusion process which itself takes x0 and Tforward, and reverses it Treverse times which for training is Tforwrd. So informationally, both the target and the approximation are identical except for the noise predicted by our neural net, in fact, since the neural net takes both x0 and the degree of destruction as inputs it doesn't need to learn those. So x0 and the beta variance schedules essentially cancel out and you're left with pure random noise on the left and predicted random noise on the right. I.e there's a distinction between producing noise at any step that is nearly random and producing noise in a sequence that allows you to end up at X. The loss function simplifies to the first because the input takes care of the second part.

Ok the result from this is a function that given random noise it can produce a sample from the approximate distrubtion based on our data set.

That is an overview of Diffusion Models. Still, in a medical context this is still somewhat limited, we can produce images that belong to our data set but without any control of its features.













