function solution(array, a, b) {
    if (!Array.isArray(array) || !array.every(x => typeof (x) === "number")) {
        return NaN;
    }
    if (a < 0) {
        a = 0;
    }
    if (b > array.length) {
        b = array.length;
    }

    return array.slice(a, b + 1).reduce((a, b) => a + b, 0);
}
solution([10, 'twenty', 30, 40], 0, 2)