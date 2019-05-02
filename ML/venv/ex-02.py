import tensorflow as tf

input1 = tf.constant(0.7)
input2 = tf.constant(0.2)
input3 = tf.constant(0.3)
sum = tf.add(input2, input3)
mul = tf.multiply(input1, sum)
output = tf.nn.sigmoid(mul)

with tf.Session() as sess:
    result = sess.run(output)
    print(result)