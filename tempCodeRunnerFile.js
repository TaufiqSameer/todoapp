let input = "";

process.stdin.on("data", (data) => {
    input += data;
});

process.stdin.on("end", () => {
    // converting our input stream into array
    input = input.split("\n");
    let testCases = Number(input[0]);
    for(let i=1; i<=testCases ; i++){
        let number = input[i].split(" ")
        console.log(Number(number[0]) + Number(number[1]));
    }
});
