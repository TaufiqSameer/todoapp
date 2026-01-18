process.stdin.resume();
process.stdin.setEncoding("utf8");

var input = "";

process.stdin.on("data", function (data) {
    input += data;
});

process.stdin.on("end", function () {
    input = input.trim();
    if (input.length === 0) return;

    var arr = input.split(/\s+/);
    var n = Number(arr[0]);
    var x = Number(arr[1]);

    var count = 0;
    

    for (var i = 1; i <= n; i++) {
        if (x % i === 0) {
            var j = x / i;
            if (j <= n) {
                count++;
            }
        }
    }

    console.log(count);
});
