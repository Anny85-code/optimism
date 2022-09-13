// const obj = {};
// const arr = [
//   { a: 10, b: 15, c: 5 },
//   { a: 2, b: 18, c: 8 },
// ];

// arr.map((ob) => {
//   const ay = Object.keys(ob);
//   // const xy = Object.values(ob);
//   ay.map((k) => {
//     if (k) {
//       obj[k] += k;
//     }
//   });
// });

// const ui = { a: 10, b: 5 };

// // console.log(Object.keys(ui));
// console.log(obj);

const arr = [
  {
    car: 'audi',
    value: 5,
  },
  {
    car: 'audi',
    value: 7,
  },
  {
    car: 'fiat',
    value: 2,
  },
  {
    car: 'fiat',
    value: 8,
  },
];

const result = Object.entries(
  arr.reduce((acc, { car, value }) => {
    if (acc[car]) {
      return {
        ...acc,
        [car]: [...acc[car], value],
      };
    }

    return { ...acc, [car]: [value] };
  }, []),
).map(([car, values]) => ({ car, values }));

console.log(result);
