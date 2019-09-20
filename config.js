const config = {
    testCount: 10000, // 确定一次c值的实验次数
    deadZone: 0.002, // 当概率值趋近正负deadZone的误差时，结束实验，并返回c值，不能为负数
    initCorrection: 0.05, // 初始c值是期望值减去该补正值
    step: 0.0005, // 每次命中概率后的补正值
    avgCount: 10 // 取c值实验的平均次数，必须是正整数
}

module.exports = {
    config
}
