function solution(face, suit){
    let faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    let suits = {S: "\u2660", H: "\u2665", D: "\u2666", C: "\u2663"};

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }
        get face() {
            if (!faces.includes(this._face)) {
                throw Error("Error");
            }
            return this._face;
        }
        set face(face) {
            this._face = face;
        }
        get suit() {
            if (!Object.keys(suits).includes(this._suit)) {
                throw Error("Error");
            }
            return this._suit;
        }
        set suit(suit) {
            this._suit = suit;
        }
        toString() {
            return `${this.face}${suits[this.suit]}`;
        }
    }
    let card = new Card(face, suit);
    return card.toString();
}
solution('A', 'S')