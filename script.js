// "Toy FHE" encryption (demo only)
const SECRET_KEY = 97;

let encryptedVotes = [];

function encrypt(value) {
    return value.charCodeAt(0) ^ SECRET_KEY;
}

function decrypt(value) {
    return String.fromCharCode(value ^ SECRET_KEY);
}

function castVote(vote) {
    let enc = encrypt(vote);
    encryptedVotes.push(enc);

    document.getElementById("encryptedVotes").textContent =
        JSON.stringify(encryptedVotes, null, 2);
}

function tallyVotes() {
    let countA = 0, countB = 0;

    encryptedVotes.forEach(enc => {
        let v = decrypt(enc);
        if (v === "A") countA++;
        else if (v === "B") countB++;
    });

    let encResult = {
        A: countA ^ SECRET_KEY,
        B: countB ^ SECRET_KEY
    };

    document.getElementById("encResult").textContent =
        JSON.stringify(encResult, null, 2);

    let finalResult = {
        A: encResult.A ^ SECRET_KEY,
        B: encResult.B ^ SECRET_KEY
    };

    document.getElementById("decResult").textContent =
        JSON.stringify(finalResult, null, 2);
}
