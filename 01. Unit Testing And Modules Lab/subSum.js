function solution(arr, start, end){
    for(let i = 0; i < arr.length; i++){
        if (typeof arr[i] !== "number") {
            return NaN;
        }
    }
    let result = [];
    for(let i = 0; i < arr.length; i++){
        if (typeof arr[i] == "number") {
            result.push(Number(arr[i]));
        }
    }
    if (start < 0) {
        start = 0;
    }
    if (end < 0 || end > arr.length -1) {
        end = arr.length - 1;
    }
    let sum = 0;
    for(let i = start; i <= end; i++){
        sum += result[i];
    }
    return sum;
}
solution([10, 'twenty', 30, 40], 0, 2)