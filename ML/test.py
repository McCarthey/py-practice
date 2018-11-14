import numpy as np
from scipy import sparse 
import matplotlib.pyplot as plt

# numpy核心功能是ndarray类，即多维数组。数组的所有元素须为同一类型
x = np.array([[1, 2, 3],[4, 5, 6]])
print("x:\n{}".format(x))

# 创建一个二维NumPy数组，对角线为1，其余都为0，也是稀疏矩阵
eye = np.eye(4)
print("Numpy Array:\n{}".format(eye))

# sparse是scipy中最重要的方法，可以给出稀疏矩阵
# 将Numpy数组转换为CSR格式的SciPy稀疏矩阵
# 只保存非零元素
sparse_matrix = sparse.csr_matrix(eye)
print("\nSciPy sparce CSR matrix:\n{}".format(sparse_matrix))

# 创建稀疏数据的稠密表示太浪费内存，要直接创建其稀疏表示
data = np.ones(4)
row_indices = np.arange(4)
col_indices = np.arange(4)
eye_coo = sparse.coo_matrix((data, (row_indices, col_indices)))
print("COO representation:\n{}".format(eye_coo))

# 在-10和10之间生成一个数列，共1000个数
x = np.linspace(-10, 10, 100)
y = np.sin(x)
plt.plot(x, y, marker="x")