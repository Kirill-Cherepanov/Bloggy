export const random = Object.freeze({
  int: (max_: number, min_: number = 0) => {
    const max = Math.floor(max_ > min_ ? max_ : min_);
    const min = Math.floor(min_ < max_ ? min_ : max_);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  array: (maxLength: number, contents: unknown) => {
    const result = Array(random.int(maxLength));
    if (typeof contents !== 'function') return result.fill(contents);
    return result.fill(0).map(() => contents());
  },

  string: (length: number) => {
    let result = '';
    const CHARACTERS =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += CHARACTERS.charAt(random.int(CHARACTERS.length));
    }
    return result;
  },

  text: (length: number) => {
    let result = '';
    while (result.length < length - 10) {
      result += random.string(random.int(9, 1)) + ' ';
    }
    result += random.string(length - result.length);
    return result;
  },

  email: () =>
    `${random.string(random.int(10, 1))}@${random.string(
      random.int(10, 1)
    )}.com`,

  boolean: () => Math.random() > 0.5,

  date: (min: number | Date, max: number | Date = Date.now()) => {
    const start = typeof min === 'object' ? min.getTime() : min;
    const end = typeof max === 'object' ? max.getTime() : max;
    return new Date(start + Math.random() * (end - start));
  },
});
