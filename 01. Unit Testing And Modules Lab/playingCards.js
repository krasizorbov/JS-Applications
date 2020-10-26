function solution(first, second){
    let faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    let suits = {S: "\u2660", H: "\u2665", D: "\u2666", C: "\u2663"};

        if (faces.includes(first) && suits.hasOwnProperty(second)) {
            let suit = String.fromCharCode('\u2660');
            console.log(first + suit);
        }
    
}
solution('A', 'S')