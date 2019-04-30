# TensorFlow and tf.keras
import tensorflow as tf

matrix1 = tf.constant([[3., 3.]])

matrix2 = tf.constant([[2.],[2.]])

product = tf.matmul(matrix1, matrix2)

# sess = tf.Session()

# result = sess.run(product)

# print(result)

# # 任务结束 需关闭会话
# sess.close()
# 或者
with tf.Session() as sess:
    result = sess.run([product])
    print(result)