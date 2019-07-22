# 数据结构

## 哈希表

哈希表(hash table)是一种根据关键字直接访问内存存储位置的数据结构。数据元素的存放位置和数据元素的关键字之间建立了对应关系，建立这种对应关系的函数称为哈希函数。

- 哈希冲突

通过调整填装因子，选取适当的哈希函数来避免冲突

有很多哈希函数，目前公布的最有效的哈希函数是 DJB 算法：

```java
public long DJBHash(String str)
   {
      long hash = 5381;
      for(int i = 0; i < str.length(); i++)
      {
         hash = ((hash << 5) + hash) + str.charAt(i);
      }
      return hash;
   }
```
