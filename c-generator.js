const {config} = require('./config')

console.log(config)

/**
 * 做多次实验取平均数
 * @param expect 期望概率
 * @param _avg 实验次数
 * @returns {number}
 */
function getC(expect, _avg) {
    let avg = _avg ? _avg : config.avgCount
    avg = Math.abs(Math.round(avg))
    avg = avg <= 0 ? 1 : avg
    let sum = 0
    for (let i = 0; i < avg; i++) {
        let c = generatorC(expect)
        sum += c
        console.log(i)
        console.log("c: " + c)
    }
    return toFix(sum / avg, 8)
}

/**
 * 产生一组实验结果
 * @param expect 期望值
 * @param _c 当前 c 值
 * @returns {number}
 */
function generatorC(expect, _c) {
    let deadZone = Math.abs(config.deadZone)
    // 基于公式计算概率：p = c * n
    let c = _c ? _c : (expect - config.initCorrection <= 0 ? 0.01 : expect - config.initCorrection)
    let n = 1
    // 实验命中的次数
    let hitCount = 0
    let testCount = config.testCount
    for (let i = 0; i < testCount; i++) {
        // 获取当前概率
        let p = toFix(c * n, 8)
        // 随机数是否命中
        let hit = Math.random() < p
        if (hit) {
            hitCount++
            n = 1
        } else {
            n++
        }
    }
    // 判断当前与期望概率的大小关系
    // 当前概率
    let f = toFix(hitCount / testCount, 8)
    // log.log('f: ' + f)
    return Math.abs(f - expect) <= deadZone ? ((expect, _c, f) => {
        let c = f - expect > 0 ? _c - config.step : _c + config.step
        // log.log('return value: ' + toFix((c + _c) / 2, 8))
        return toFix((c + _c) / 2, 8)
    })(expect, c, f) : (() => {
        c = f - expect > 0 ? c - config.step : c + config.step
        return generatorC(expect, c)
    })()
}

/**
 * 保留小数位数
 * @param num
 * @param bit
 * @returns {number}
 */
function toFix(num, bit) {
    num = num + ''
    if (num.indexOf('.') === -1) return Number(num)
    let nums = num.split('.')
    if (nums[1].length <= bit) {
        return Number(nums[0] + '.' + nums[1])
    }
    return Number(nums[0] + '.' + nums[1].substring(0, bit))
}

let options = process.argv;
console.log(options)
let e
if (options.length > 2) {
    let eStr = options[2]
    e = Number(eStr.split('=')[1])
}


console.log(getC(e ? e : 0.25))
