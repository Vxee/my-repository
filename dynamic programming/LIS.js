/*
【题目描述】

给定N个数，求这N个数的最长上升子序列的长度。
【样例输入】

7

2 5 3 4 1 7 6

【样例输出】

4
*/

/*
    最长上升子序列 （LIS）
*/

let arr = [2,5,3,4,1,7,6],
    len = arr.length,
    ans = 0,    // 结果
    a = Array(len),
    arrObjt = {}, // 保存每一个最长子序列
    maxIndex = 0;
a[0] = 0;
for(let i = 0; i < len; i++){
    max = 0;
    arrObjt[i] = [];
    for(let j = i - 1; j >= 0; j--){
        if(arr[i] > arr[j] && max < a[j]){
            max = a[j];
            maxIndex = j;
        }
    }
    a[i] = max + 1;
    arrObjt[i] = arrObjt[maxIndex].concat(arr[i]);
    if(ans < a[i]){
        ans = a[i];
    }
}
console.log(ans);