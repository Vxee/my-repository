# 基于jquery实现的无缝滚动动画  
#### 实现方法：通过定时器每次让列表的最前面两个的marginTop设为一定的负值，即实现向上滚动的效果，然后再将最前面的两个元素$.append()到列表的最后。