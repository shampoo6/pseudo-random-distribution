/**
 * 命中检测器
 * @param _c 伪随机分布算法的 c 值
 * @constructor
 */
function HitChecker(_c) {
    // 检测次数
    let n = 1
    let c = _c
    this.check = () => {
        let p = c * n
        let hit = Math.random() < p
        // 命中检测后，重置计数器，否则 n + 1
        n = hit ? 1 : n + 1
        return hit
    }
    this.log = () => {
        console.log('c: ', c, ' ; n: ', n, ' ; p: ', c * n)
        // console.log('c: %s; n: %s; p: %s', c, n, c * n)
    }
}

let checker = new HitChecker(0.085)
checker.log()
console.log(checker.check())
checker.log()
console.log(checker.check())
checker.log()
console.log(checker.check())
checker.log()
console.log(checker.check())
checker.log()
console.log(checker.check())
checker.log()
console.log(checker.check())
checker.log()
