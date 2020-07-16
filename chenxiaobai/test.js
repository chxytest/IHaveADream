nums = [2, 7, 11, 15]
target = 9
let i = nums.length;
while (i > 1) {
    let last = nums.pop();
    if (nums.indexOf(target - last) > -1) {
        return [nums.indexOf(target - last), nums.length]
    }
    i--
}

