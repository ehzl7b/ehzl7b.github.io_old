---
layout: "post"
title: "이진 탐색(Binary Search)"
description: "오름차순으로 정렬된 자료구조 안에서 특정 요소를 빠르게 찾아내는 알고리즘"
updated: "2024-10-24"
---

## 이진 탐색(Binary Search)

어떤 알고리즘인지는 [나무위키](https://namu.wiki/w/%EC%9D%B4%EC%A7%84%20%ED%83%90%EC%83%89)를 보면 된다.

범위를 설정하고, 범위중간값과 찾는값을 비교하여, 계속 범위를 좁혀가는 방식이다.

알고리즘을 적용하는 자료구조가 반드시 오름차순으로 정렬이 되어있어야 한다. 이유는 생각해보면 쉽게 알 수 있다.

## 의사 코드

오름차순으로 정렬된 `X = [x1, x2, x3, ... , xn-1, xn]`가 있다고 할 때, 아래의 규칙대로 적용하면 된다.

- pseudo
```pseudo
1: i 이상 j 미만의 범위(인덱스)를 설정, 인덱스의 초기값은 i = 0, j = len(X)
2: i < j 일때 아래를 계속 반복
    2.1: 범위중간인덱스 m = i + (j - i) / 2 계산, (계산 결과 소수점 이하는 버림)
    2.2: 범위중간값 X[m] 과 찾는값 t 비교
        2.3: X[m] < t 라면, m 이하 인덱스에 해당하는 요소들은 모두 버려도 되므로, i = m + 1
        2.4: 아니라면, m 이상 인덱스에 해당하는 요소들은 모두 버려도 되므로, j = m
    2.3: 계속 반복하면 반드시 i == j 되는 순간이 발생
3: i 또는 j 는 찾는값(찾는값이 자료구조 없었다면, 그 찾는값이 위치했어야 하는) 인덱스를 가리킴
```

## LeetCode: 35. Search Insert Position

- python
- javascript
- rust
```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        i, j = 0, len(nums)

        while i < j:
            m = i + (j - i) // 2
            match True:
                case _ if nums[m] < target:
                    i = m + 1
                case _:
                    j = m

        return i
```
```javascript
var searchInsert = function(nums, target) {
    let [i, j] = [0, nums.length];

    while (i < j) {
        let m = i + (j - i) / 2 | 0;
        switch (true) {
            case nums[m] < target:
                i = m + 1;
                break;
            default:
                j = m;
        }
    }

    return i;
}
```
```rust
impl Solution {
    pub fn search_insert(nums: Vec<i32>, target: i32) -> i32 {
        let (mut i, mut j): (usize, usize) = (0, nums.len());

        while i < j {
            let m = i + (j - i) / 2;
            match true {
                _ if nums[m] < target => { i = m + 1; },
                _ => { j = m; },
            }
        } 

        i as i32
    }
}
```
