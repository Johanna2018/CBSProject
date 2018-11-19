function remove(array, element) {
    return array.filter(e => e !== element);
}

const vowelsAndX = ["a", "e", "i", "o", "u", "x"];
const vowels = remove(vowelsAndX, "x");

for 