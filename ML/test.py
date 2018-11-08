import numpy as np
from scipy import sparse 

# numpy核心功能是ndarray类，即多维数组。数组的所有元素须为同一类型
x = np.array([[1, 2, 3],[4, 5, 6]])
print("x:\n{}".format(x))

# 创建一个二维NumPy数组，对角线为1，其余都为0
eye = np.eye(4)
print("Numpy Array:\n{}".format(eye))