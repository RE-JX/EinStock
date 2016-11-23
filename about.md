## Machine Learning Algorithms We Use

### K Nearest Neighbors (KNN)

The KNN algorithm is a non-parametric method for classification and regression. The algorithm takes a large quantity of training data, which include vectors of multi-dimentional features/predictors and class labels (the correct outcome). To classify an new, unlabeled vector, the algorithm finds the k datapoints in the training sample that are cloest to the unlabeled vector, and assign the most common label among the k cloest "neighbors" as the classification for the unlabeled datapoint.

### Logistic Regression (LR)

Logistic regression is one of the most popular machine learning method for binary classification. LR uses training data to estimate the odds of being a case. The odds are defined as the probability that a particular outcome is a case divided by the probability that it is a noncase. Like other regression methods, LR uses an linear equation as the model representation. the model coeffiicents are then estimated using maximum-likelihood method.

### Naive Bayes (NB)

Naive Bayes classifiers are a family of simple probabilistic classifiers based on applying Bayes' theorem with strong (naive) independence assumptions between the features.

### Neural Networks (NN)

Neural networks are a machine learning approach that is based on a large collection of "neural units" loosely modeling the way the brain solves problems with large clusters of biological neurons connected by axons. Each neural unit is connected with many others, and links can be enforcing or inhibitory in their effect on the activation state of connected neural units. An NN is typically defined by three types of parameters:
1. The interconnection pattern between the different layers of neurons
2. The learning process for updating the weights of the interconnections
3. The activation function that converts a neuron's weighted input to its output activation.
The network then try to find the optimal solution that matches the features of the datapoint under examination by processing a large quantity of training data to detect patterns.

### Random Forests (RF)

Random forests is an ensemble learning method for classification and regression. It operates by creating a multitude of decision trees at the training phase. The classification prediction the algorithm outputs is a composition of the predictions by individual trees.


### Support Vector Machine (SVM)

The SVM model algorithm maps the training data into points in space, so that datapoints from separate categories are divided by a clear gap that is as wide as possible. New datapoints are then mapped into that same space and predicted to belong to a category based on which side of the gap they fall on. In addition to performing linear classification, SVMs can efficiently perform a non-linear classification using the kernel method, implicitly mapping their inputs into high-dimensional feature spaces.












